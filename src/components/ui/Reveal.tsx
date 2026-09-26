"use client";

import { type HTMLMotionProps } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Fades and lifts content into view once. Motion is reduced automatically for users who prefer it. */
export function Reveal({ children, delay = 0, y = 28, as = "div", className, ...rest }: RevealProps) {
  const Cmp = m[as] as typeof m.div;
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Cmp>
  );
}
