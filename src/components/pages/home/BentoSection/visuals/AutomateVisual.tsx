"use client";

export function AutomateVisual() {
  const nodes = [
    { x: 30, y: 40, l: "trigger" },
    { x: 130, y: 40, l: "enrich" },
    { x: 230, y: 40, l: "notify" },
    { x: 330, y: 40, l: "create task" },
  ];
  return (
    <svg viewBox="0 0 380 80" className="h-full w-full max-h-[85px]">
      {nodes.slice(0, -1).map((n, i) => (
        <line
          key={i}
          x1={n.x + 34}
          y1={n.y}
          x2={nodes[i + 1].x - 34}
          y2={nodes[i + 1].y}
          stroke="var(--color-hairline-strong)"
          strokeDasharray="3 3"
        />
      ))}
      {/* Moving dot rendered behind node tab cards */}
      <circle r="3" fill="var(--color-signal)">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M30 40 L330 40" />
      </circle>
      {nodes.map((n, i) => (
        <g key={n.l} transform={`translate(${n.x} ${n.y})`}>
          <rect
            x="-34"
            y="-16"
            width="68"
            height="32"
            rx="6"
            fill="var(--color-surface)"
            stroke={i === 0 ? "var(--color-signal)" : "var(--color-hairline-strong)"}
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            className="fill-ink mono-num text-[10px] font-medium"
          >
            {n.l}
          </text>
        </g>
      ))}
    </svg>
  );
}
