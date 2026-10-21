import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { CaseStudy, caseStudyTitleId } from "@/components/CaseStudy";
import { Modal } from "@/components/Modal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Intercepts /projects/[slug] when navigated to from "/", showing the case study as the E4 bottom sheet. */
export default async function ProjectModal({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <Modal titleId={caseStudyTitleId(project)}>
      <CaseStudy project={project} />
    </Modal>
  );
}
