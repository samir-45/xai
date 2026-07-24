"use client";

import { motion } from "framer-motion";
import { ParticleField } from "./ParticleField";

const HeroSection = () => {
  return (
    <section className="relative hairline-b bg-surface">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="relative mx-auto grid max-w-[1240px] gap-8 sm:gap-12 px-4 sm:px-6 py-12 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
        <div className="flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-3 sm:mt-5 text-3xl sm:text-5xl font-medium leading-[1.05] tracking-[-0.02em] text-ink lg:text-[64px]"
          >
            Turn signal into
            <br />
            <span className="relative">
              structured decisions.
              <svg
                className="absolute -bottom-2 left-0 h-2 w-full text-signal"
                viewBox="0 0 400 8"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M0 4 Q100 0 200 4 T400 4" stroke="currentColor" strokeWidth="1.25" fill="none" opacity="0.7" />
              </svg>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-4 sm:mt-6 max-w-xl text-base sm:text-[17px] leading-[1.55] text-ink-muted"
          >
            Xai reads across your systems, reasons over the whole graph, and hands
            your team the next decision — with the evidence attached.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <button style={{ color: "#ffffff" }} className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-medium transition-colors cursor-pointer hover:bg-ink/90 sm:justify-start">
              Request access
              <span aria-hidden>→</span>
            </button>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-4 text-sm font-medium text-ink cursor-pointer transition-colors hover:bg-surface-muted sm:justify-start">
              Read the model paper
            </button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 sm:mt-14 grid max-w-lg grid-cols-3 gap-3 sm:gap-6 pt-6"
          >
            {[
              ["48.2M", "signals / day"],
              ["94.1%", "insight confidence"],
              ["8.4k", "actions / week"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="mono-num text-lg sm:text-2xl text-ink">{v}</div>
                <div className="mt-1 text-[9px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-ink-subtle">{l}</div>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative"
        >
          <ParticleField />
          <div className="mono-num mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-subtle sm:text-[11px] sm:tracking-[0.18em]">
            <span>fig.01 · signal manifold, live</span>
            <span>scroll to structure ↓</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
