import { site } from "@/content/site";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>{site.footer.copyright}</span>
        <a className="en" href={site.footer.github.href} target="_blank" rel="noopener">
          {site.footer.github.label}
        </a>
      </div>
    </footer>
  );
}
