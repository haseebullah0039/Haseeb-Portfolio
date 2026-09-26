"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("@/lib/motionFeatures").then((mod) => mod.default);

/**
 * Global motion settings.
 * - LazyMotion + `m` components keep the animation engine out of the initial JS bundle.
 * - `strict` flags any accidental use of the heavier `motion.*` components.
 * - Honours the user's reduced-motion preference everywhere.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
