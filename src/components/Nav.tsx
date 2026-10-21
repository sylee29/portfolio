"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { MenuIcon, ThemeIcon } from "./Icons";

/* The theme lives on <html data-theme>; the <head> pre-script sets it before paint and this
   store mirrors it so the toggle label is right after hydration without a flash. */
function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const isLightNow = () => document.documentElement.dataset.theme === "light";
const isLightOnServer = () => false;

export function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const light = useSyncExternalStore(subscribeTheme, isLightNow, isLightOnServer);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("intro");
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  /* header background after 40px */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const isLight = root.dataset.theme === "light";
    if (isLight) delete root.dataset.theme;
    else root.dataset.theme = "light";
    try {
      localStorage.setItem("theme", isLight ? "dark" : "light");
    } catch {}
  }

  /* active nav via IntersectionObserver (the hero intersects on observe, so "intro" is set first) */
  useEffect(() => {
    if (!home || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-nav]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [home]);

  /* mobile menu: close on outside click / Esc */
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest("nav")) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header id="top" className={scrolled ? "scrolled" : undefined}>
      <div className="wrap">
        <nav aria-label={site.navAria}>
          <a className="logo" href={href("intro")}>
            {site.logo.text}
            <i>{site.logo.dot}</i>
          </a>
          <ul className={menuOpen ? "nav-links open" : "nav-links"} id="navLinks" onClick={(e) => { if ((e.target as Element).closest("a")) setMenuOpen(false); }}>
            {site.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={href(item.id)}
                  data-sec={item.id}
                  className={home && active === item.id ? "active" : undefined}
                  aria-current={home && active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-tools">
            <button className="icon-btn" type="button" id="themeBtn" aria-label={light ? site.theme.toDark : site.theme.toLight} onClick={toggleTheme}>
              <ThemeIcon />
            </button>
            <button
              ref={menuBtnRef}
              className="icon-btn menu-btn"
              type="button"
              id="menuBtn"
              aria-label={menuOpen ? site.menu.close : site.menu.open}
              aria-expanded={menuOpen}
              aria-controls="navLinks"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
