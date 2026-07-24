"use client";

import type { HeroStatItem } from "@/data/HeroData";
import { useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";

interface HeroStatsProps {
  stats?: HeroStatItem[];
}

function parseStatValue(value: string) {
  const match = value.match(/^(.*?)(\d[\d,]*)(.*)$/);

  if (!match) {
    return {
      prefix: "",
      target: 0,
      suffix: value,
    };
  }

  return {
    prefix: match[1],
    target: Number(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}

export default function HeroStats({ stats }: HeroStatsProps) {
  const reduxStats = useAppSelector((state: RootState) => state.hero.stats);
  const safeStats: HeroStatItem[] = useMemo(() => stats || reduxStats || [], [stats, reduxStats]);
  const parsedStats = useMemo(
    () => safeStats.map((stat: HeroStatItem) => ({ ...stat, parsed: parseStatValue(stat.value) })),
    [safeStats],
  );
  const [counts, setCounts] = useState<number[]>(() => parsedStats.map(() => 0));

  useEffect(() => {
    setCounts(parsedStats.map(() => 0));
    let animationFrame = 0;
    const duration = 1400;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCounts(
        parsedStats.map(({ parsed }) =>
          Math.round(parsed.target * easedProgress),
        ),
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [parsedStats]);

  return (
    <section className="bg-[#eeeeee]">
      <div className="container grid grid-cols-1 items-center gap-5 py-5 text-center md:h-[128px] md:grid-cols-3 md:gap-6 md:py-0">
        {parsedStats.map((stat, index) => (
          <div key={stat.id}>
            <p className="mt-4 text-[30px] font-extrabold leading-none tracking-[-0.02em] text-[#44484e] md:text-[34px]">
              {stat.parsed.prefix}
              {(counts[index] ?? 0).toLocaleString()}
              {stat.parsed.suffix}
            </p>
            <p className="text-[13px] font-medium uppercase leading-snug tracking-[0.01em] text-[#626870] md:text-[15px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
