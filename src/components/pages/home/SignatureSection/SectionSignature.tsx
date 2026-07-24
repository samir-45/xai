"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SignatureCanvas = dynamic(
  () => import("./SignatureCanvas").then((m) => m.SignatureCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[500px] w-full animate-pulse rounded-xl border border-hairline bg-panel md:h-[620px]" />
    ),
  }
);

export function SectionSignature() {
  return (
    <section id="signature" className="relative border-t border-hairline bg-surface py-28 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="mono-num text-[11px] uppercase tracking-[0.24em] text-ink-subtle">
            05 / Core Engine
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-0.02em] text-ink md:text-5xl">
            The Model, Visible.
          </h2>
          <p className="mt-4 text-base text-ink-muted md:text-lg">
            A living wireframe icosphere that distorts, pulses, and accelerates its spin as you scroll through your data layer.
          </p>
        </motion.div>

        <SignatureCanvas />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              num: "01",
              title: "Substrate Layer",
              desc: "Continuous ingestion from live webhooks, event buses, and vector embeddings synthesized into a unified memory graph.",
            },
            {
              num: "02",
              title: "Reasoning Core",
              desc: "Multi-agent consensus loops evaluate change-points and rank anomalies with mathematically sound confidence metrics.",
            },
            {
              num: "03",
              title: "Action Pipeline",
              desc: "Automated triggers execute deterministic workflows, notifying teams or triggering webhooks the millisecond thresholds cross.",
            },
          ].map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-hairline bg-surface-muted p-6"
            >
              <span className="mono-num text-xs text-signal font-semibold">{card.num}</span>
              <h3 className="mt-2 text-lg font-medium text-ink">{card.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
