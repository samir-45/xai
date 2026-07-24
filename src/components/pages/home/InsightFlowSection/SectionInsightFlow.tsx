"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stages } from "@/data/flow";
import { useReducedMotion } from "@/lib/useReducedMotion";

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
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        if (total <= 0) return;

        // Calculate progress from 0 to 1 as container scrolls past top of viewport
        const current = -rect.top;
        const rawProgress = Math.max(0, Math.min(1, current / total));
        setProgress(rawProgress);

        // Determine step index (0, 1, 2)
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
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh;
    const targetScrollY = window.scrollY + rect.top + total * ((index + 0.5) / stages.length);
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <section id="flow" ref={containerRef} className="relative hairline-b bg-surface" style={{ height: `${stages.length * 100}vh` }}>
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-4 sm:py-6 lg:py-0">
        <div className="mx-auto grid h-full w-full max-w-[1240px] grid-cols-1 gap-6 sm:gap-8 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* Left rail / Top bar on mobile */}
          <div className="flex flex-col justify-center py-2 sm:py-4 lg:py-16">
            <p className="mono-num text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-ink-subtle">
              02 / How Xai works
            </p>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-ink sm:mt-4 sm:text-3xl lg:text-4xl">
              From raw signal to
              <br className="hidden sm:inline" /> executed action.
            </h2>

            <ol className="mt-4 flex flex-row overflow-x-auto gap-2 pb-2 custom-scrollbar lg:mt-10 lg:flex-col lg:space-y-5 lg:gap-0 lg:overflow-visible lg:pb-0">
              {stages.map((s, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <li key={s.id} className="flex shrink-0 items-center gap-2 rounded-lg border border-hairline p-1.5 lg:border-none lg:p-0 lg:items-start lg:gap-3">
                    <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                      <span
                        className={`absolute inset-0 rounded-full border transition-colors ${
                          isActive || isPast ? "border-signal bg-signal" : "border-hairline-strong bg-surface"
                        }`}
                      />
                      <span
                        className={`relative mono-num text-[9px] ${
                          isActive || isPast ? "text-surface" : "text-ink-subtle"
                        }`}
                      >
                        {s.index}
                      </span>
                    </div>
                    <button
                      onClick={() => scrollToStage(i)}
                      className={`text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                        isActive ? "text-ink font-semibold" : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      <div className="font-medium whitespace-nowrap lg:whitespace-normal">{s.title}</div>
                      <div className="hidden text-xs text-ink-subtle lg:block">{s.subtitle}</div>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Progress line */}
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-hairline sm:mt-6 lg:mt-10 lg:w-40">
              <div
                className="h-full bg-signal transition-all duration-150 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Right stage panel */}
          <div className="relative flex h-full items-center">
            <div className="relative min-h-[360px] sm:min-h-[420px] lg:aspect-[5/4] w-full overflow-hidden rounded-lg border border-hairline bg-surface-muted">
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={stages[active].id}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                  className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-12 overflow-y-auto custom-scrollbar"
                >
                  <StageDiagram id={stages[active].id} />
                  <div className="mt-4">
                    <div className="mono-num text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-signal">
                      Stage {stages[active].index}
                    </div>
                    <h3 className="mt-1 text-lg font-medium tracking-tight text-ink sm:text-2xl lg:text-3xl">
                      {stages[active].title} — {stages[active].subtitle}
                    </h3>
                    <p className="mt-2 max-w-xl text-xs text-ink-muted sm:text-sm lg:text-[15px]">
                      {stages[active].body}
                    </p>
                    <div className="mt-4 inline-flex items-baseline gap-3 border-t border-hairline pt-3 sm:mt-6 sm:pt-4">
                      <span className="mono-num text-xl sm:text-2xl text-ink">{stages[active].metric.value}</span>
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                        {stages[active].metric.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageDiagram({ id }: { id: string }) {
  if (id === "ingest") return <IngestDiagram />;
  if (id === "analyze") return <AnalyzeDiagram />;
  return <GenerateDiagram />;
}

function IngestDiagram() {
  const rows = ["stripe.events", "orders.stream", "otel.traces", "support.tickets", "product.events"];
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
      <div className="space-y-2">
        {rows.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            className="mono-num flex items-center gap-2 rounded border border-hairline bg-surface px-3 py-1.5 text-[11px] text-ink-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal/70" />
            {r}
          </motion.div>
        ))}
      </div>
      <svg width="80" height="140" viewBox="0 0 80 140" className="text-ink-subtle">
        {rows.map((_, i) => (
          <motion.path
            key={i}
            d={`M0 ${20 + i * 24} C40 ${20 + i * 24}, 40 70, 80 70`}
            stroke="currentColor"
            strokeOpacity="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.15 + i * 0.06, duration: 0.6 }}
          />
        ))}
      </svg>
      <div className="rounded border border-signal/40 bg-signal-soft/40 p-4">
        <div className="mono-num text-[10px] uppercase tracking-[0.18em] text-signal">unified graph</div>
        <div className="mt-2 grid grid-cols-6 gap-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.02 }}
              className="h-2 rounded-sm bg-signal/60"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyzeDiagram() {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-md text-signal">
      {Array.from({ length: 24 }).map((_, i) => {
        const cx = 30 + (i % 8) * 35;
        const cy = 30 + Math.floor(i / 8) * 55;
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: i * 0.02 }}
          />
        );
      })}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = i;
        const b = (i * 7 + 3) % 24;
        const ax = 30 + (a % 8) * 35;
        const ay = 30 + Math.floor(a / 8) * 55;
        const bx = 30 + (b % 8) * 35;
        const by = 30 + Math.floor(b / 8) * 55;
        return (
          <motion.line
            key={i}
            x1={ax}
            y1={ay}
            x2={bx}
            y2={by}
            stroke="currentColor"
            strokeOpacity="0.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3 + i * 0.04, duration: 0.5 }}
          />
        );
      })}
    </svg>
  );
}

function GenerateDiagram() {
  return (
    <div className="grid gap-3">
      {[
        { title: "Retry storm suppressed", meta: "confidence 0.97 · auto" },
        { title: "Shard failover scheduled", meta: "confidence 0.92 · approved" },
        { title: "Cohort surfaced to Growth", meta: "confidence 0.81 · queued" },
      ].map((r, i) => (
        <motion.div
          key={r.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="flex items-center justify-between rounded border border-hairline bg-surface px-4 py-3"
        >
          <div>
            <div className="text-sm font-medium text-ink">{r.title}</div>
            <div className="mono-num mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-subtle">
              {r.meta}
            </div>
          </div>
          <div className="h-6 w-6 rounded-full border border-signal/40 bg-signal/10 flex items-center justify-center text-signal text-xs">
            ✓
          </div>
        </motion.div>
      ))}
    </div>
  );
}
