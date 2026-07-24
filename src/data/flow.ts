export type Stage = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  body: string;
  metric: { label: string; value: string };
};

export const stages: Stage[] = [
  {
    id: "ingest",
    index: "01",
    title: "Ingest",
    subtitle: "Every source, one shape.",
    body:
      "Streams, warehouses, product events, and support tickets land in a single typed graph. No schemas to babysit. No pipelines to break.",
    metric: { label: "Sources unified", value: "412" },
  },
  {
    id: "analyze",
    index: "02",
    title: "Analyze",
    subtitle: "Reasoning across the graph.",
    body:
      "Xai runs statistical, causal, and language models against the same substrate — so a metric anomaly is explained by the deploy that shipped it.",
    metric: { label: "Models in orchestration", value: "37" },
  },
  {
    id: "generate",
    index: "03",
    title: "Generate",
    subtitle: "Insight, then action.",
    body:
      "Every insight arrives with confidence, evidence, and a suggested automation. Approve once, or let policy do it.",
    metric: { label: "Actions per week", value: "8.4k" },
  },
];
