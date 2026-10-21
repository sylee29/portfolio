import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { CaseStudy, caseStudyTitleId } from "@/components/CaseStudy";
import { CloseIcon } from "@/components/Icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title}${project.titleEn ? ` ${project.titleEn}` : ""} — ${site.title}`;
  return { title, description: project.description, openGraph: { title, description: project.description } };
}

/** Full case-study page: the same content as the modal, reached by a direct link or a refresh. */
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <main className="page-main">
      <div className="wrap">
        <article className="dialog page" aria-labelledby={caseStudyTitleId(project)}>
          <Link className="close" href="/" aria-label={site.modal.close}>
            <CloseIcon />
          </Link>
          <CaseStudy project={project} titleTag="h1" />
        </article>
      </div>
    </main>
  );
}
