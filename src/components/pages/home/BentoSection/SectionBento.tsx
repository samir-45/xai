"use client";

import { motion } from "framer-motion";
import { BentoCard, type Feature } from "./BentoCard";
import { StreamsVisual } from "./visuals/StreamsVisual";
import { TraceVisual } from "./visuals/TraceVisual";
import { SparkVisual } from "./visuals/SparkVisual";
import { BriefVisual } from "./visuals/BriefVisual";
import { AutomateVisual } from "./visuals/AutomateVisual";

const features: Feature[] = [
  {
    eyebrow: "Ingest",
    title: "Every source, one shape",
    description:
      "Warehouses, docs, product events and third-party APIs land as a single typed stream.",
    span: "md:col-span-2 md:row-span-2",
    visual: <StreamsVisual />,
  },
  {
    eyebrow: "Analyze",
    title: "Reasoning that shows its work",
    description: "Traceable chains link every claim back to the underlying rows.",
    span: "md:col-span-2",
    visual: <TraceVisual />,
  },
  {
    eyebrow: "Signal",
    title: "Anomalies, ranked",
    description: "Change-point detection with confidence, not just alerts.",
    span: "md:col-span-2",
    visual: <SparkVisual />,
  },
  {
    eyebrow: "Generate",
    title: "Briefs, on demand",
    description: "One prompt turns a week of dashboards into a stakeholder-ready memo.",
    span: "md:col-span-3",
    visual: <BriefVisual />,
  },
  {
    eyebrow: "Automate",
    title: "Loops, not tickets",
    description: "Trigger workflows the moment a metric crosses your threshold.",
    span: "md:col-span-3",
    visual: <AutomateVisual />,
  },
];

export function SectionBento() {
  return (
    <section id="bento" className="relative border-t border-hairline bg-surface py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-8 sm:mb-14 max-w-2xl"
        >
          <p className="mono-num text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-ink-subtle">
            04 / Capabilities
          </p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-ink sm:mt-3 sm:text-3xl lg:text-5xl">
            A workspace, not a wall of dashboards.
          </h2>
          <p className="mt-3 text-sm text-ink-muted sm:mt-4 sm:text-base lg:text-lg">
            Five primitives that turn scattered signal into decisions your team can defend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-6 md:auto-rows-[19.5rem]">
          {features.map((f, i) => (
            <BentoCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
