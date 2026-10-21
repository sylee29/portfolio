/** The E4 HTML/CSS terminal mock. `text` is the verbatim transcript (already read from content/cli-demos). */
export function Terminal({ title, text, className, ariaLabel }: { title: string; text: string; className?: string; ariaLabel?: string }) {
  return (
    <div className={className ? `term ${className}` : "term"} aria-label={ariaLabel}>
      <div className="term-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>{title}</em>
      </div>
      <pre>{text}</pre>
    </div>
  );
}
