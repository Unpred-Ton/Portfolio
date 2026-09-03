export type Era = "vba" | "apps-script" | "full-stack";

/** Employer work is described, never linked or screenshotted. */
export type Confidentiality = "described-only" | "public-repo";

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

export type RecreationId = "dashboard" | "audit-undo" | "tracker-builder" | "export-walker";

export interface CaseStudy {
  id: string;
  title: string;
  era: Era;
  kind: "legacy" | "project" | "flagship";
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
