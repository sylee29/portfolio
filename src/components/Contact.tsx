import { site } from "@/content/site";

export function Contact() {
  const c = site.sections.contact;
  return (
    <section className="block contact" id="contact" data-nav data-tint="contact">
      <div className="wrap reveal">
        <span className="sec-num">{c.num}</span>
        <h2>{c.title}</h2>
        <div className="row">
          <a className="btn btn-accent" href={c.email.href}>
            {c.email.label}
          </a>
          <a className="btn btn-line" href={c.linkedin.href} target="_blank" rel="noopener">
            {c.linkedin.label}
          </a>
          <a className="btn btn-line" href={c.github.href} target="_blank" rel="noopener">
            {c.github.label}
          </a>
        </div>
      </div>
    </section>
  );
}
