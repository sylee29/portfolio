import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { about } from "@/content/about";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export function About() {
  const s = site.sections.about;
  return (
    <section className="block" id="about" data-nav data-tint="about">
      <div className="wrap">
        <div className="sec-title reveal">
          <div>
            <span className="sec-num">{s.num}</span>
            <h2 className="shimmer">
              {s.title}
              <span className="dot">.</span>
            </h2>
          </div>
        </div>
        <div className="about">
          <blockquote className="reveal shimmer">
            {about.quote.pre}
            <em>{about.quote.em}</em>
            {about.quote.post}
          </blockquote>
          <div className="about-body reveal" style={stagger(1)}>
            {about.paragraphs.map((p) => (
              <p key={p.text} className={p.muted ? "muted" : undefined}>
                {p.text}
              </p>
            ))}
          </div>
        </div>

        <div className="ways reveal" style={stagger(2)}>
          <h3 className="ways-title">
            <b>#</b> {about.ways.title}
          </h3>
          <div className="way-grid">
            {about.ways.cards.map((card) => (
              <div className="way" key={card.title}>
                <b>{card.title}</b>
                {card.blocks.map((b, i) =>
                  b.type === "quote" ? (
                    <blockquote className="quote" key={i}>
                      {b.text}
                      {b.src && <span className="src">{b.src}</span>}
                    </blockquote>
                  ) : (
                    <p key={i}>
                      {b.text}
                      {b.src && <span className="src">{b.src}</span>}
                    </p>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <ul className="timeline reveal" style={stagger(3)}>
          {about.timeline.map((t) => (
            <li key={t.when}>
              <span className="when">{t.when}</span>
              <div className="what">
                {t.what}
                <small>{t.small}</small>
                {"decisions" in t && t.decisions && (
                  <div className="decisions">
                    <span className="d-label">{t.decisions.label}</span>
                    {t.decisions.cards.map((d) => (
                      <div className="decision" key={d.title}>
                        <b>{d.title}</b>
                        <p>
                          {d.text}
                          <span className="src">{d.src}</span>
                        </p>
                        {"href" in d && d.href && (
                          <a className="d-link" href={d.href} target="_blank" rel="noopener">
                            {d.hrefLabel} ↗
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
