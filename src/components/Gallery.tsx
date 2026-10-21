"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Image, { type StaticImageData } from "next/image";
import { site } from "@/content/site";
import { Terminal } from "./Terminal";
import { CloseIcon, NextIcon, PrevIcon } from "./Icons";

export type GalleryImage = { kind: "image"; image: StaticImageData; alt: string; cap: string; wide?: boolean; unoptimized?: boolean };
export type GalleryTerminal = { kind: "terminal"; title: string; cap: string; thumb: string; text: string };
export type ResolvedGalleryItem = GalleryImage | GalleryTerminal;

function focusables(scope: HTMLElement) {
  return Array.from(scope.querySelectorAll<HTMLElement>('button,[href],[tabindex]:not([tabindex="-1"])')).filter(
    (el) => !(el as HTMLButtonElement).disabled && !el.hidden && el.getClientRects().length > 0,
  );
}

/** E4 gallery: main stage + thumbs, prev/next arrows, ← → keys, counter, and a full-screen lightbox. */
export function Gallery({ items, note }: { items: ResolvedGalleryItem[]; note?: string }) {
  const [idx, setIdx] = useState(0);
  const [lbOpen, setLbOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const lbRef = useRef<HTMLDivElement>(null);
  const lbCloseRef = useRef<HTMLButtonElement>(null);
  const n = items.length;
  const cur = items[Math.min(idx, n - 1)];
  const single = n < 2;

  const closeLightbox = useCallback(() => {
    setLbOpen(false);
    document.querySelector(".modal.show")?.setAttribute("aria-hidden", "false");
    const z = mainRef.current?.querySelector<HTMLElement>(".g-zoom");
    z?.focus({ preventScroll: true });
  }, []);

  const step = useCallback(
    (d: number) => {
      if (n < 2) return;
      const next = (idx + d + n) % n;
      setIdx(next);
      /* terminal slides have no lightbox */
      if (lbOpen && items[next].kind === "terminal") closeLightbox();
    },
    [idx, n, lbOpen, items, closeLightbox],
  );

  function openLightbox() {
    if (cur.kind === "terminal") return;
    setLbOpen(true);
    document.querySelector(".modal.show")?.setAttribute("aria-hidden", "true");
  }

  useEffect(() => {
    if (lbOpen) lbCloseRef.current?.focus({ preventScroll: true });
  }, [lbOpen]);

  /* ← → step; Esc closes the lightbox; Tab is trapped inside the lightbox while it is open */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
        return;
      }
      if (!lbOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === "Tab" && lbRef.current) {
        const f = focusables(lbRef.current);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        const inside = lbRef.current.contains(document.activeElement);
        if (e.shiftKey && (document.activeElement === first || !inside)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lbOpen, step, closeLightbox]);

  /* Activity may hide this subtree with the lightbox open; make sure the portal does not linger */
  useEffect(() => () => setLbOpen(false), []);

  const counter = `${idx + 1} / ${n}`;

  return (
    <div className="gallery">
      <div className="g-main" aria-roledescription={site.modal.galleryRole} aria-label={site.modal.galleryAria}>
        <div ref={mainRef}>
          {cur.kind === "terminal" ? (
            <div className="stage gfx">
              <Terminal className="term-g" title={cur.title} text={cur.text} />
            </div>
          ) : (
            <div className="stage" style={{ "--bd": `url('${cur.image.src}')` } as CSSProperties}>
              <button type="button" className="g-zoom" aria-label={`크게 보기: ${cur.cap}`} onClick={openLightbox}>
                <Image className={cur.wide ? "fit wide" : "fit"} src={cur.image} alt={cur.alt} sizes="(max-width: 1000px) 100vw, 952px" unoptimized={cur.unoptimized} />
              </button>
            </div>
          )}
        </div>
        <span className="g-count" aria-live="polite">
          {counter}
        </span>
        <button type="button" className="g-arrow g-prev" aria-label="이전 이미지" hidden={single} onClick={() => step(-1)}>
          <PrevIcon />
        </button>
        <button type="button" className="g-arrow g-next" aria-label="다음 이미지" hidden={single} onClick={() => step(1)}>
          <NextIcon />
        </button>
      </div>
      <p className="g-cap">
        <b>{cur.cap}</b>
        <span className="en">{counter}</span>
      </p>
      <div className="g-thumbs">
        {items.map((it, i) =>
          it.kind === "terminal" ? (
            <button type="button" className="g-thumb is-term" key={i} aria-current={i === idx ? "true" : "false"} onClick={() => setIdx(i)}>
              <span className="term-thumb">
                <i>$</i> {it.thumb}
              </span>
            </button>
          ) : (
            <button type="button" className="g-thumb" key={i} aria-current={i === idx ? "true" : "false"} onClick={() => setIdx(i)}>
              <Image src={it.image} alt={`썸네일 ${i + 1}: ${it.cap}`} sizes="200px" loading="lazy" unoptimized={it.unoptimized} />
            </button>
          ),
        )}
      </div>
      {note && <p className="g-note">{note}</p>}

      {lbOpen &&
        cur.kind === "image" &&
        createPortal(
          <div
            className="lb open"
            ref={lbRef}
            role="dialog"
            aria-modal="true"
            aria-label="이미지 크게 보기"
            onClick={(e) => {
              const t = e.target as HTMLElement;
              if (t === lbRef.current || t.tagName === "IMG") closeLightbox();
            }}
          >
            <button className="close" type="button" ref={lbCloseRef} aria-label="크게 보기 닫기" onClick={closeLightbox}>
              <CloseIcon />
            </button>
            <button type="button" className="g-arrow g-prev" aria-label="이전 이미지" hidden={single} onClick={() => step(-1)}>
              <PrevIcon />
            </button>
            <figure className="lb-fig">
              <Image src={cur.image} alt={cur.alt} sizes="100vw" unoptimized={cur.unoptimized} />
              <figcaption>
                {cur.cap}
                <span className="en">{counter}</span>
              </figcaption>
            </figure>
            <button type="button" className="g-arrow g-next" aria-label="다음 이미지" hidden={single} onClick={() => step(1)}>
              <NextIcon />
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
