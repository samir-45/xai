export type HeroStatItem = {
  id: string;
  value: string;
  label: string;
};

export const heroStats: HeroStatItem[] = [
  {
    id: "signals",
    value: "48.2M",
    label: "Signals processed daily",
  },
  {
    id: "accuracy",
    value: "94.1%",
    label: "Decision accuracy",
  },
  {
    id: "latency",
    value: "<250ms",
    label: "Graph traversal latency",
  },
];
