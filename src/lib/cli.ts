import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Reads a CLI transcript from content/cli-demos at build time (server components only).
 * Every route that uses this is statically generated, so nothing is read at request time.
 */
export function readCliDemo(file: string, command?: string): string {
  const body = readFileSync(path.join(process.cwd(), "content", "cli-demos", file), "utf8").trimEnd();
  return command ? `${command}\n${body}` : body;
}
