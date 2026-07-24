"use client";

export function StreamsVisual() {
  const lines = [18, 42, 66, 90, 114, 138, 162, 186];
  return (
    <svg viewBox="0 0 320 205" className="h-full w-full max-h-[220px]">
      <defs>
        <linearGradient id="sg" x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-signal)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--color-signal)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--color-signal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {lines.map((y, i) => (
        <g key={y}>
          <line x1="0" x2="320" y1={y} y2={y} stroke="var(--color-hairline)" strokeWidth="1" />
          <rect x={(i * 35 + 15) % 240} y={y - 3} width="24" height="6" rx="2" fill="url(#sg)">
            <animate
              attributeName="x"
              from="-30"
              to="320"
              dur={`${3.5 + (i % 5) * 0.7}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}
      <g transform="translate(240 102)">
        <rect x="-50" y="-30" width="100" height="60" rx="8" fill="var(--color-surface)" stroke="var(--color-hairline-strong)" />
        <text x="0" y="-8" textAnchor="middle" className="fill-ink-muted mono-num text-[10px]">
          typed_stream
        </text>
        <text x="0" y="12" textAnchor="middle" className="fill-ink text-sm font-semibold">
          142k / s
        </text>
      </g>
    </svg>
  );
}
