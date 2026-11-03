export type Era = "vba" | "apps-script" | "full-stack";

/**
 * Employer work is described, never linked or screenshotted.
 * A personal project with a private repository is described and offered "on request".
 */
export type Confidentiality = "described-only" | "private-repo" | "public-repo";

export interface Metric {
  value: string;
  label: string;
  note?: string;
}

export interface Link {
  label: string;
  href: string;
  kind: "github" | "external" | "pdf" | "mail" | "linkedin";
}

export interface TimelineEntry {
  id: string;
  era: Era;
  org: string;
  role: string;
  location: string;
  /** ISO yyyy-mm. `end` undefined means present. */
  start: string;
  end?: string;
  summary: string;
  caseStudyIds: string[];
}

export type RecreationId = "dashboard" | "audit-undo" | "tracker-builder" | "export-walker" | "reply-assistant";

export interface CaseStudy {
  id: string;
  title: string;
  /** Optional qualifier shown after the title (e.g. to distinguish same-named work). */
  subtitle?: string;
  era: Era;
  /** `flagship` and `showcase` get their own sections; `project` and `legacy` are Projects cards. */
  kind: "legacy" | "project" | "flagship" | "showcase";
  org: string;
  period: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  metrics?: Metric[];
  links?: Link[];
  confidentiality: Confidentiality;
  recreation?: RecreationId;
}

export type ToolGroup = "setup" | "maintenance" | "inventory" | "reporting" | "builder";

export interface FlagshipTool {
  id: string;
  name: string;
  group: ToolGroup;
  /** The manual job it replaces. */
  replaces: string;
  /** How it works, one sentence. */
  mechanism: string;
  /** The safety rail that makes it trustworthy. */
  guardrail: string;
}

export interface Integration {
  id: string;
  name: string;
  access: "read" | "write" | "read-write";
  note: string;
}

export interface SecurityLayer {
  id: string;
  title: string;
  detail: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sub?: string;
  /** ids of nodes this one talks to */
  edges: string[];
}

/** A Gemini-powered feature on the flagship platform. */
export interface AiFeature {
  id: string;
  name: string;
  /** Where it lives in the product. */
  where: string;
  /** The manual job it takes over. */
  replaces: string;
  /** How it works, two or three sentences. */
  mechanism: string;
  /** The rail that keeps it honest. */
  guardrail: string;
  /** The headline feature gets the deep-dive treatment. */
  headline?: boolean;
}

/** One step in the "how a ticket flows" strip. */
export interface PipelineStep {
  id: string;
  label: string;
  detail: string;
}

/** A real image shown in a gallery or lightbox. */
export interface Shot {
  src: string;
  title: string;
  caption: string;
  alt: string;
}

/** A product capability, one line each. */
export interface ProductFeature {
  id: string;
  name: string;
  detail: string;
}

export type SkillLevel = "expert" | "proficient" | "working";

export interface SkillGroup {
  id: string;
  label: string;
  skills: { name: string; level: SkillLevel; since?: number }[];
}

export interface Principle {
  id: string;
  title: string;
  body: string;
}

export interface Site {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  linkedin: string;
  github: string;
  cvPath: string;
  location: string;
}
