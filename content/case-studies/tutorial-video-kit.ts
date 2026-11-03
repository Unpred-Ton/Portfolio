import type { CaseStudy } from "../types";

export const tutorialVideoKit = {
  id: "tutorial-video-kit",
  title: "Franchise tutorial video kit",
  subtitle: "screenshots + YAML to narrated MP4",
  era: "full-stack",
  kind: "project",
  org: "Poolwerx",
  period: "Sep - Oct 2026",
  problem:
    "Franchise partners needed consistent, branded video tutorials for the platform's tools. Recording them by hand does not scale, cannot be re-rendered when a screen changes, and sounds different every time.",
  approach:
    "A renderer that turns a folder of screenshots and a YAML storyboard into a narrated 1080p MP4 with a subtitle track, built on free tooling: FFmpeg for the camera glides, zooms and compositing, headless Chromium for every graphic (callout bubbles, chapter cards, do/don't cards, decision-flow diagrams, all drawn from HTML), and Google Cloud Text-to-Speech for an Australian English voice. A content-hash cache means a re-render only rebuilds the beats that changed and never pays for a voice line twice; outputs are versioned, and a contact sheet of one frame per beat makes QA a two-minute job. A cloud runner on Cloud Run Jobs watches a shared Drive folder and renders changed storyboards on a schedule, and a Claude Project kit lets any teammate turn screenshots into a storyboard with no code.",
  outcome:
    "Two tutorials published to the team's shared drive and Confluence knowledge base: a 14-minute product-health guide (101 narrated beats) and a 36-minute month-end COGS guide (254 beats), the first in four versions over three days. About 680 lines of Node.",
  stack: ["Node.js", "FFmpeg", "Playwright (headless Chromium)", "Google Cloud Text-to-Speech", "YAML storyboards", "Cloud Run Jobs", "Cloud Scheduler", "Google Drive API", "Claude Projects"],
  metrics: [
    { value: "2", label: "tutorials published" },
    { value: "355", label: "narrated beats" },
    { value: "50 min", label: "of finished video" },
  ],
  confidentiality: "described-only",
} satisfies CaseStudy;
