import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { skills } from "@/content/skills";

export function Skills() {
  const s = site.sections.skills;
  return (
    <section className="block" id="skills" data-nav data-tint="skills">
      <div className="wrap">
        <div className="sec-title reveal">
          <div>
            <span className="sec-num">{s.num}</span>
            <h2 className="shimmer">
              {s.title}
              <span className="dot">.</span>
            </h2>
          </div>
          <p>{s.lead}</p>
        </div>
        <div className="stack-groups">
          {skills.map((group, gi) => (
            <div className="stack-group reveal" key={group.title} style={gi ? ({ "--i": gi } as CSSProperties) : undefined}>
              <h3>
                <b>#</b> {group.title}
              </h3>
              <div className="tiles">
                {group.tiles.map((t) => (
                  <div className="tile static" key={t.name}>
                    <span className={`mono-mark ${t.markClass}`} aria-hidden="true">
                      {t.mark}
                    </span>
                    <span>
                      <span className="tile-name">{t.name}</span>
                      <span className="tile-sub">{t.sub}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
