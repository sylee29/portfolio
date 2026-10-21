import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  const s = site.sections.projects;
  return (
    <section className="block" id="projects" data-nav data-tint="projects">
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
        <div className="projects" id="projectGrid">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
