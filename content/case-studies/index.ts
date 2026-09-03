import type { CaseStudy } from "../types";
import { pwxToolTrackers } from "./pwx-tool-trackers";
import { evoPlatformToolkit } from "./evo-platform-toolkit";
import { evoToolingStandards } from "./evo-tooling-standards";
import { cogsAppsScript } from "./cogs-apps-script";
import { poolwerxMigrationTools } from "./poolwerx-migration-tools";
import { krelosesCsharpMigration } from "./kreloses-csharp-migration";
import { iqviaVbaTools } from "./iqvia-vba-tools";

/** Newest first. */
export const caseStudies: CaseStudy[] = [
  pwxToolTrackers,
  evoPlatformToolkit,
  evoToolingStandards,
  cogsAppsScript,
  poolwerxMigrationTools,
  krelosesCsharpMigration,
  iqviaVbaTools,
];

export const caseStudyById = (id: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.id === id);
