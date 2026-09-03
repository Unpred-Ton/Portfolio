/** Camera and scene targets per section id. The scene damps toward the phase of the section most in view. */
export interface Phase {
  camera: [number, number, number];
  target: [number, number, number];
}

export const PHASES: Record<string, Phase> = {
  hero: { camera: [0, 0, 8], target: [0, 0, 0] },
  arc: { camera: [2, 1, 7], target: [0, -0.5, 0] },
  flagship: { camera: [-2, 1.5, 6], target: [0, 0, 0] },
  projects: { camera: [0, 2, 7], target: [0, 0, 0] },
  contact: { camera: [0, 0, 9], target: [0, 0, 0] },
};

export const SECTION_ORDER = ["hero", "arc", "flagship", "projects", "skills", "how", "contact"] as const;
export type SectionId = (typeof SECTION_ORDER)[number];
