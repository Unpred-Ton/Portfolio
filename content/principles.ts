import type { Principle } from "./types";

export const principles = [
  {
    id: "verify",
    title: "Verification first",
    body: "An automated report is not done until it matches the manual one cell for cell. Export engines ship with a diff against the real thing, and a zero is the only acceptable number.",
  },
  {
    id: "probe",
    title: "Probe before you write",
    body: "Every write shape against an external API is proven on a live test account before it reaches a real store. Dry run is the default; the push is the exception you earn.",
  },
  {
    id: "spec",
    title: "Spec-driven, AI-assisted",
    body: "I use Claude Code to deliver production software solo at team pace. The AI does not lower the bar: every change is specified, reviewed and verified like any other engineering work.",
  },
  {
    id: "isolate",
    title: "A live tool never breaks for a neighbour",
    body: "Shared code between tools is copied with a note, not cross-imported. Deliberately anti-DRY where the alternative is a validated tool breaking because a different one needed something similar.",
  },
  {
    id: "audit",
    title: "Leave a trail",
    body: "Every write logs who, what and the before/after. Undo is a feature, not a database restore.",
  },
] satisfies Principle[];
