import type { ReactNode } from "react";

/** Renders content text. Only `backtick` spans are interpreted (→ <span class="code">). */
export function inline(text: string): ReactNode {
  if (!text.includes("`")) return text;
  return text.split("`").map((part, i) => (i % 2 ? <span key={i} className="code">{part}</span> : part));
}

/** Muted `file:line` source note, as in E4. */
export function Src({ src }: { src?: string }) {
  return src ? <span className="src">{src}</span> : null;
}
