import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { ChevronDownIcon } from "./Icons";

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

export function Hero() {
  const h = site.hero;
  return (
    <section className="hero" id="intro" data-nav data-tint="hero">
      <div className="wrap">
        <div className="hero-kicker hero-in" style={delay(".15s")}>
          {h.kicker.name}
          <span />
          {h.kicker.year}
        </div>
        <h1 className="hero-title">
          <span className="line">{h.title.line1}</span>
          <span className="line">
            {h.title.line2}
            <span className="dot">{h.title.dot}</span>
          </span>
        </h1>
        <div className="hero-sub hero-in" style={delay(".95s")}>
          {h.sub}
        </div>
        <p className="hero-ko hero-in" style={delay("1.1s")}>
          {h.ko}
        </p>
        <p className="hero-lead hero-in" style={delay("1.25s")}>
          {h.lead.before}
          <b>{h.lead.strong}</b>
          {h.lead.after}
          <span className="src">{h.lead.src}</span>
        </p>
        <div className="hero-cta hero-in" style={delay("1.4s")}>
          {h.cta.map((c) => (
            <a key={c.label} className={c.style === "accent" ? "btn btn-accent" : "btn btn-line"} href={c.href}>
              {c.label}
            </a>
          ))}
        </div>
      </div>
      <a className="scroll-down" href={h.scrollDown.href} aria-label={h.scrollDown.aria}>
        {h.scrollDown.label}
        <span className="chev" aria-hidden="true">
          <ChevronDownIcon />
          <ChevronDownIcon />
        </span>
      </a>
    </section>
  );
}
