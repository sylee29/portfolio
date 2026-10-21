import type { Block, Project } from "@/content/types";
import { readCliDemo } from "@/lib/cli";
import { inline, Src } from "./inline";
import { Terminal } from "./Terminal";
import { Gallery, type ResolvedGalleryItem } from "./Gallery";
import { Badge, PLink } from "./ProjectCard";

const PARAGRAPH_CLASS = { intro: "m-intro", role: "role", todo: "todo", asof: "asof" } as const;

function Items({ items }: { items: { text: string; src?: string }[] }) {
  return (
    <ul className="list">
      {items.map((it, i) => (
        <li key={i}>
          {inline(it.text)}
          <Src src={it.src} />
        </li>
      ))}
    </ul>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={block.variant ? PARAGRAPH_CLASS[block.variant] : undefined}>
          {inline(block.text)}
          <Src src={block.src} />
        </p>
      );
    case "quote":
      return (
        <blockquote className="quote">
          {inline(block.text)}
          <Src src={block.src} />
        </blockquote>
      );
    case "bullets":
      return <Items items={block.items} />;
    case "table":
      return (
        <table className="crit">
          {block.widths && (
            <colgroup>
              {block.widths.map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>
          )}
          <thead>
            <tr>
              {block.head.map((h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "chips":
      return (
        <div className="chips">
          {block.items.map((c) => (
            <span className="chip" key={c.text}>
              {c.text}
              {c.sub && (
                <>
                  {" "}
                  <small>{c.sub}</small>
                </>
              )}
            </span>
          ))}
        </div>
      );
    case "timeline":
      return (
        <div className="kvs">
          {block.rows.map((row) => (
            <div className="kv" key={row.label}>
              <b>
                {row.label}
                {row.sub && <small>{row.sub}</small>}
              </b>
              <span>
                {inline(row.text)}
                <Src src={row.src} />
                {row.quote && (
                  <blockquote className="quote">
                    {inline(row.quote.text)}
                    <Src src={row.quote.src} />
                  </blockquote>
                )}
              </span>
            </div>
          ))}
        </div>
      );
    case "terminal":
      return <Terminal className="term-block" title={block.title} text={readCliDemo(block.file, block.command)} />;
    case "numbers":
      return (
        <div className="nums">
          {block.items.map((n) => (
            <div className="num" key={n.value + n.label}>
              <b>{n.value}</b>
              <small>{n.label}</small>
              <Src src={n.src} />
            </div>
          ))}
        </div>
      );
    case "features":
      return (
        <ul className="features">
          {block.items.map((f, i) => (
            <li key={i}>
              <span className="n en">{String(i + 1).padStart(2, "0")}</span>
              <span>
                {inline(f.text)}
                <Src src={f.src} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "issues":
      return (
        <div className="issues">
          <div className="issue">
            <div className="q">
              <small>만든 것</small>
              <Items items={block.made.items} />
              <Src src={block.made.src} />
            </div>
            <div className="a">
              <small>안 만든 것</small>
              <Items items={block.notMade.items} />
              <Src src={block.notMade.src} />
            </div>
          </div>
        </div>
      );
    case "subLabel":
      return (
        <span className="sub-label">
          {block.text}
          <Src src={block.src} />
        </span>
      );
  }
}

/** Per-project title id: a hidden (Activity-preserved) modal may still be in the DOM, so ids must not collide. */
export const caseStudyTitleId = (project: Project) => `case-title-${project.slug}`;

/** The E4 case study: header, gallery, and the eight sections. Used by the page and by the modal. */
export function CaseStudy({ project, titleTag: Title = "h2" }: { project: Project; titleTag?: "h1" | "h2" }) {
  const items: ResolvedGalleryItem[] = project.media.gallery.map((g) =>
    g.kind === "terminal" ? { kind: "terminal", title: g.title, cap: g.cap, thumb: g.thumb, text: readCliDemo(g.file, g.command) } : g,
  );
  return (
    <>
      <div className="m-top">
        <div className="m-head">
          {project.badges.map((b) => (
            <Badge key={b.text} badge={b} />
          ))}
          <span className="pmeta">
            <span className="en">{project.period}</span>
            <span className="sep" />
            <span>{project.kind}</span>
          </span>
        </div>
        <Title id={caseStudyTitleId(project)}>
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
        </Title>
        <div className="plinks m-links">
          {project.links.map((l) => (
            <PLink key={l.label} link={l} />
          ))}
        </div>
      </div>
      <Gallery items={items} note={project.media.note} />
      <div className="m-body">
        {project.sections.map((sec) => (
          <div className="m-sec" key={sec.label}>
            <span className="m-label">{sec.label}</span>
            {sec.blocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
