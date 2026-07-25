"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SignatureCanvas = dynamic(
  () => import("./SignatureCanvas").then((m) => m.SignatureCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[320px] sm:h-[440px] md:h-[580px] lg:h-[620px] w-full animate-pulse rounded-xl border border-hairline bg-panel" />
    ),
  }
);

export function SectionSignature() {
  return (
    <section id="signature" className="relative border-t border-hairline bg-surface py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-8 sm:mb-12 max-w-2xl"
        >
          <p className="mono-num text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-ink-subtle">
            05 / Core Engine
          </p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-ink sm:mt-3 sm:text-3xl lg:text-5xl">
            The Model, Visible.
          </h2>
          <p className="mt-3 text-sm text-ink-muted sm:mt-4 sm:text-base lg:text-lg">
            A living wireframe icosphere that distorts, pulses, and accelerates its spin as you scroll through your data layer.
          </p>
        </motion.div>

        <SignatureCanvas />

        <div className="mt-12 sm:mt-16 border-t border-hairline pt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {[
            {
              tag: "SUBSTRATE",
              desc: "One typed graph across every source in your stack.",
            },
            {
              tag: "REASONING",
              desc: "Statistical, causal, and language models over the same substrate.",
            },
            {
              tag: "ACTION",
              desc: "Every insight arrives with confidence, evidence, and an automation.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col justify-start"
            >
              <span className="mono-num text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3b82f6]">
                {item.tag}
              </span>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
