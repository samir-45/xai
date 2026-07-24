"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { stages } from "@/data/flow";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FlowStageList } from "./FlowStageList";
import { FlowStagePanel } from "./FlowStagePanel";

export function SectionInsightFlow() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!window.matchMedia("(min-width: 1024px)").matches) return;
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        if (total <= 0) return;

        const current = -rect.top;
        const rawProgress = Math.max(0, Math.min(1, current / total));
        setProgress(rawProgress);

        const step = Math.min(stages.length - 1, Math.floor(rawProgress * stages.length * 0.999));
        setActive(step);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToStage = (index: number) => {
    setActive(index);
    setProgress(stages.length <= 1 ? 1 : index / (stages.length - 1));

    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh;
    const targetScrollY = window.scrollY + rect.top + total * ((index + 0.5) / stages.length);
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <section
      id="flow"
      ref={containerRef}
      className="relative hairline-b bg-surface py-16 sm:py-20 lg:h-[var(--flow-height)] lg:py-0"
      style={{ "--flow-height": `${stages.length * 100}vh` } as CSSProperties}
    >
      <div className="flex items-center overflow-visible lg:sticky lg:top-0 lg:min-h-screen lg:overflow-hidden lg:py-0">
        <div className="mx-auto grid h-full w-full max-w-[1240px] grid-cols-1 gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:gap-10">
          <FlowStageList active={active} progress={progress} onSelectStage={scrollToStage} />
          <FlowStagePanel active={active} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
