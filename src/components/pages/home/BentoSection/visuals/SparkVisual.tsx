"use client";

export function SparkVisual() {
  const pts = [8, 14, 11, 18, 22, 17, 28, 24, 40, 32, 55, 38];
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * 20} ${60 - p}`)
    .join(" ");
  return (
    <svg viewBox="0 0 240 80" className="h-full w-full max-h-[85px] pt-1">
      <path d={path} fill="none" stroke="var(--color-ink-subtle)" strokeWidth="1.5" />
      <circle cx={220} cy={22} r="4" fill="var(--color-signal)">
        <animate attributeName="r" values="4;7;4" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <text x="205" y="24" textAnchor="end" className="fill-signal mono-num text-[11px] font-semibold">
        +38σ
      </text>
    </svg>
  );
}
