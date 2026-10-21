import type { StaticImageData } from "next/image";

/** The eight case-study sections, in E4 order. Every project must have exactly these, in this order. */
export const SECTION_LABELS = [
  "한 줄 요약",
  "문제와 근거",
  "가설과 수정",
  "반증 신호와 대응",
  "결정 — 만든 것 / 안 만든 것",
  "성공 지표와 측정 설계",
  "직접 구현",
  "현재 상태와 다음",
] as const;

export type SectionLabel = (typeof SECTION_LABELS)[number];

/** Inline text. A `backtick span` renders as <span class="code">; nothing else is interpreted. */
export type Text = string;

export type Sourced = { text: Text; src?: string };

export type Block =
  | { type: "paragraph"; text: Text; src?: string; variant?: "intro" | "role" | "todo" | "asof" }
  | { type: "quote"; text: Text; src?: string }
  | { type: "bullets"; items: Sourced[] }
  | { type: "table"; head: string[]; rows: string[][]; widths?: string[] }
  | { type: "chips"; items: { text: string; sub?: string }[] }
  | {
      /** E4 `.kvs` rows — the hypothesis timeline. */
      type: "timeline";
      rows: { label: string; sub?: string; text: Text; src?: string; quote?: Sourced }[];
    }
  | { type: "terminal"; file: string; title: string; command?: string }
  | { type: "numbers"; items: { value: string; label: string; src?: string }[] }
  | { type: "features"; items: Sourced[] }
  | { type: "issues"; made: { items: Sourced[]; src?: string }; notMade: { items: Sourced[]; src?: string } }
  | { type: "subLabel"; text: string; src?: string };

export type CaseSection<L extends SectionLabel = SectionLabel> = { label: L; blocks: Block[] };

/** Tuple of exactly eight sections whose labels must match SECTION_LABELS position by position. */
type SectionsOf<T extends readonly SectionLabel[]> = { readonly [K in keyof T]: CaseSection<Extract<T[K], SectionLabel>> };
export type CaseSections = SectionsOf<typeof SECTION_LABELS>;

export type Badge = { text: string; tone: "accent" | "wine"; pulse?: boolean };

export type ProjectLink =
  | { kind: "external"; label: string; href: string }
  | { kind: "off"; label: string; href: string }
  | { kind: "note"; label: string };

export type Shot = { image: StaticImageData; alt: string };

export type CardMedia =
  | { kind: "trio"; shots: [Shot, Shot, Shot]; backdrop: StaticImageData; tag: string }
  | { kind: "image"; image: StaticImageData; alt: string; wide?: boolean; unoptimized?: boolean; tag: string }
  | { kind: "terminal"; ariaLabel: string; title: string; command: string; file: string; tag: string };

export type GalleryItem =
  | { kind: "image"; image: StaticImageData; alt: string; cap: string; wide?: boolean; unoptimized?: boolean }
  | { kind: "terminal"; title: string; cap: string; thumb: string; file: string; command: string };

export type Project = {
  slug: string;
  /** E4 data-project key */
  key: string;
  mono: string;
  title: string;
  titleEn?: string;
  titleSub?: string;
  period: string;
  kind: string;
  badges: Badge[];
  /** Card badges when they differ from the case-study header badges. */
  cardBadges?: Badge[];
  description: Text;
  descriptionSrc?: string;
  links: ProjectLink[];
  chips: string[];
  featured?: boolean;
  /** E4 `--i` reveal stagger on the card */
  revealIndex?: number;
  media: { card: CardMedia; gallery: GalleryItem[]; note?: string };
  sections: CaseSections;
};
