"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/content/site";
import { CloseIcon } from "./Icons";

function focusables(scope: HTMLElement) {
  return Array.from(scope.querySelectorAll<HTMLElement>('button,[href],[tabindex]:not([tabindex="-1"])')).filter(
    (el) => !(el as HTMLButtonElement).disabled && !el.hidden && el.getClientRects().length > 0,
  );
}

/**
 * E4 bottom-sheet modal, rendered by the intercepting route `@modal/(.)projects/[slug]`.
 * Opening = navigating to /projects/[slug] from "/"; closing = router.back() after the slide-down.
 */
export function Modal({ children, titleId }: { children: ReactNode; titleId: string }) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closing = useRef(false);
  const [show, setShow] = useState(false);

  /* open: lock the page, commit the start state, then slide up; return focus to the trigger on close */
  useEffect(() => {
    const modal = modalRef.current;
    closing.current = false;
    lastFocus.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("locked");
    if (modal) modal.scrollTop = 0;
    const raf = requestAnimationFrame(() => setShow(true));
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("locked");
      setShow(false);
      lastFocus.current?.focus?.({ preventScroll: true });
    };
  }, []);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShow(false);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => router.back(), reduce ? 0 : 310);
  }, [router]);

  /* Esc closes (the lightbox handles its own Esc first); Tab is trapped inside the dialog */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector(".lb.open")) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const f = focusables(dialogRef.current);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        const inside = dialogRef.current.contains(document.activeElement);
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
  }, [close]);

  return (
    <div
      className={show ? "modal open show" : "modal open"}
      ref={modalRef}
      aria-hidden={false}
      onClick={(e) => {
        if (e.target === modalRef.current) close();
      }}
    >
      <div className="dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <button className="close" type="button" ref={closeRef} aria-label={site.modal.close} onClick={close}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}
