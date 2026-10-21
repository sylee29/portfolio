import { SECTION_LABELS, type Project } from "../types";
import { ollabom } from "./ollabom";
import { replyGate } from "./reply-gate";
import { guardLedger } from "./guard-ledger";

/** Card order on the home page (E4 §4). */
export const projects: readonly Project[] = [ollabom, replyGate, guardLedger];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/* Build-time assertion: the tuple type already enforces the eight labels; this makes a mismatch
   fail the build loudly even if someone casts around the type. Runs when the module is first
   evaluated during `next build` prerendering. */
for (const p of projects) {
  if (p.sections.length !== SECTION_LABELS.length) {
    throw new Error(`[content] ${p.slug}: expected ${SECTION_LABELS.length} sections, got ${p.sections.length}`);
  }
  SECTION_LABELS.forEach((label, i) => {
    if (p.sections[i].label !== label) {
      throw new Error(`[content] ${p.slug}: section ${i + 1} must be "${label}", got "${p.sections[i].label}"`);
    }
  });
}
