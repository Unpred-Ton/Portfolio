import { create } from "zustand";

export type RenderTier = "full" | "lite" | "poster";

interface PortfolioState {
  /** 0..1 scroll progress per section id, written by ScrollTrigger, read by the 3D scene. */
  progress: Record<string, number>;
  reducedMotion: boolean;
  tier: RenderTier;
  /** Fiber's invalidate(), registered by the Scene once mounted. No-op until then. */
  invalidate: () => void;
  setProgress: (id: string, value: number) => void;
  setReducedMotion: (value: boolean) => void;
  setTier: (tier: RenderTier) => void;
  registerInvalidate: (fn: () => void) => void;
}

export const useStore = create<PortfolioState>((set) => ({
  progress: {},
  reducedMotion: false,
  tier: "full",
  invalidate: () => {},
  setProgress: (id, value) =>
    set((s) => (s.progress[id] === value ? s : { progress: { ...s.progress, [id]: value } })),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setTier: (tier) => set({ tier }),
  registerInvalidate: (invalidate) => set({ invalidate }),
}));
