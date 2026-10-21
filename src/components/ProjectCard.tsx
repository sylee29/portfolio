import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Badge as BadgeT, Project, ProjectLink } from "@/content/types";
import { site } from "@/content/site";
import { readCliDemo } from "@/lib/cli";
import { inline, Src } from "./inline";
import { Terminal } from "./Terminal";
import { ArrowRightIcon, ExternalIcon } from "./Icons";

export function Badge({ badge }: { badge: BadgeT }) {
  return (
    <span className={badge.tone === "wine" ? "badge wine" : "badge"}>
      {badge.pulse && <span className="pulse" />}
      {badge.text}
    </span>
  );
}

export function PLink({ link }: { link: ProjectLink }) {
  if (link.kind === "note") return <span className="plink note">{link.label}</span>;
  return (
    <a className={link.kind === "off" ? "plink off" : "plink"} href={link.href} target="_blank" rel="noopener">
      {link.label} <ExternalIcon />
    </a>
  );
}

function Media({ project }: { project: Project }) {
  const m = project.media.card;
  if (m.kind === "trio") {
    return (
      <div className="media">
        <div className="bd" aria-hidden="true" style={{ "--bd": `url('${m.backdrop.src}')` } as CSSProperties} />
        <div className="trio">
          {m.shots.map((shot, i) => (
            <div className="shot" key={i}>
              <Image src={shot.image} alt={shot.alt} sizes="(max-width: 720px) 70vw, 360px" priority={i === 0} />
            </div>
          ))}
        </div>
        <span className="shot-tag">{m.tag}</span>
      </div>
    );
  }
  if (m.kind === "image") {
    return (
      <div className="media">
        <div className="stage" style={{ "--bd": `url('${m.image.src}')` } as CSSProperties}>
          <Image className={m.wide ? "fit wide" : "fit"} src={m.image} alt={m.alt} sizes="(max-width: 820px) 100vw, 560px" loading="lazy" unoptimized={m.unoptimized} />
        </div>
        <span className="shot-tag">{m.tag}</span>
      </div>
    );
  }
  return (
    <div className="media">
      <div className="stage gfx" />
      <div className="term-card">
        <Terminal ariaLabel={m.ariaLabel} title={m.title} text={readCliDemo(m.file, m.command)} />
      </div>
      <span className="shot-tag">{m.tag}</span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;
  const badges = project.cardBadges ?? project.badges;
  const classes = ["pcard", project.featured ? "featured" : "", "reveal"].filter(Boolean).join(" ");
  return (
    <article className={classes} data-project={project.key} style={project.revealIndex ? ({ "--i": project.revealIndex } as CSSProperties) : undefined}>
      <Media project={project} />
      <div className="pbody">
        <div className="trow">
          <h3>
            <Link className="title-btn" href={href} scroll={false} aria-haspopup="dialog">
              <span className="mono" aria-hidden="true">
                {project.mono}
              </span>
              {project.title}
              {project.titleEn && (
                <>
                  {" "}
                  <span className="en">{project.titleEn}</span>
                </>
              )}
              {project.titleSub && (
                <>
                  {" "}
                  <span className="sub">{project.titleSub}</span>
                </>
              )}
            </Link>
          </h3>
          <Link className="more" href={href} scroll={false} aria-haspopup="dialog">
            {site.modal.more}
            <ArrowRightIcon />
          </Link>
        </div>
        <div className="pmeta">
          <span className="en">{project.period}</span>
          <span className="sep" />
          <span>{project.kind}</span>
          {badges.map((b) => (
            <Fragment key={b.text}>
              <span className="sep" />
              <Badge badge={b} />
            </Fragment>
          ))}
        </div>
        <p className="desc">
          {inline(project.description)}
          <Src src={project.descriptionSrc} />
        </p>
        <div className="plinks">
          {project.links.map((l) => (
            <PLink key={l.label} link={l} />
          ))}
        </div>
        <div className="pchips" aria-label="역할과 기술">
          {project.chips.map((c) => (
            <span className="pchip" key={c}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
