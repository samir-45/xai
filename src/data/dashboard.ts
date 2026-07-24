export type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
};

export const kpis: Kpi[] = [
  { label: "Signals ingested", value: "48.2M", delta: "+12.4%", trend: "up" },
  { label: "Insight confidence", value: "94.1%", delta: "+2.1pp", trend: "up" },
  { label: "Automations firing", value: "1,284", delta: "+184", trend: "up" },
  { label: "Latency p95", value: "212ms", delta: "-38ms", trend: "down" },
];

export const ranges = ["24h", "7d", "28d", "90d"] as const;
export type RangeId = (typeof ranges)[number];

// Deterministic trend series per range
export const trendByRange: Record<RangeId, number[]> = {
  "24h": [42, 45, 41, 48, 52, 49, 55, 58, 61, 57, 63, 68, 65, 71, 74, 70, 76, 79, 82, 78, 85, 88, 84, 91],
  "7d": [30, 34, 33, 38, 41, 44, 47, 49, 52, 55, 58, 61, 63, 68, 71, 74, 78, 82, 80, 86, 89, 91],
  "28d": [
    32, 30, 34, 33, 36, 38, 37, 41, 44, 42, 47, 49, 46, 52, 55, 58, 61, 59, 63, 68,
    71, 69, 74, 78, 82, 80, 86, 91,
  ],
  "90d": [
    18, 22, 20, 25, 27, 24, 30, 33, 31, 36, 40, 38, 42, 45, 43, 48, 51, 49, 54, 58,
    56, 61, 65, 63, 68, 71, 69, 74, 77, 75, 80, 83, 81, 86, 89, 87, 92, 95,
  ],
};

export type InsightStatus = "resolved" | "investigating" | "queued" | "automated";

export type InsightRow = {
  id: string;
  signal: string;
  source: string;
  confidence: number;
  status: InsightStatus;
  time: string;
  detail: string;
};

export const insights: InsightRow[] = [
  { id: "IX-4821", signal: "Payment retry loop on EU-central shard", source: "stripe.events", confidence: 0.97, status: "automated", time: "2m", detail: "412 retries within 90s — circuit breaker engaged on shard eu-c-04." },
  { id: "IX-4820", signal: "Anomalous drop in checkout conversion (SG)", source: "orders.stream", confidence: 0.89, status: "investigating", time: "7m", detail: "Conversion −18% vs. 7d baseline for SG traffic on mobile Safari." },
  { id: "IX-4819", signal: "Latency regression on inference-gateway-v3", source: "otel.traces", confidence: 0.93, status: "resolved", time: "18m", detail: "p95 spike traced to cold-start pool; warmers scaled from 4→10." },
  { id: "IX-4818", signal: "Suspicious cohort of refund requests", source: "support.tickets", confidence: 0.81, status: "queued", time: "34m", detail: "27 tickets share the same UA fingerprint and BIN range." },
  { id: "IX-4817", signal: "Feature usage spike — Cohort Builder", source: "product.events", confidence: 0.76, status: "resolved", time: "1h", detail: "Daily actives +64%, correlated with weekly digest email send." },
  { id: "IX-4816", signal: "Model drift — churn-propensity-v7", source: "ml.monitor", confidence: 0.88, status: "investigating", time: "2h", detail: "PSI = 0.18 on feature `days_since_last_session` — retraining queued." },
  { id: "IX-4815", signal: "Webhook delivery lag on partner.acme", source: "webhooks.out", confidence: 0.72, status: "queued", time: "3h", detail: "p99 delivery 6.2s (target < 2s). Endpoint returning 502 intermittently." },
  { id: "IX-4814", signal: "Cost anomaly — vector store egress", source: "billing.meter", confidence: 0.84, status: "investigating", time: "5h", detail: "Egress +$1,240 vs. 7d avg. — traced to unbounded similarity scan." },
];

export const tabs = [
  { id: "overview", label: "Overview" },
  { id: "signals", label: "Signals" },
  { id: "automations", label: "Automations" },
] as const;

export type TabId = (typeof tabs)[number]["id"];

export type AutomationRule = {
  id: string;
  name: string;
  scope: string;
  runs: string;
  state: "active" | "paused";
};

export const initialRules: AutomationRule[] = [
  { id: "r1", name: "Suppress retry storms", scope: "stripe.events", runs: "312 / wk", state: "active" },
  { id: "r2", name: "Escalate model drift > 0.15", scope: "ml.monitor", runs: "24 / wk", state: "active" },
  { id: "r3", name: "Route refund clusters to Trust", scope: "support.tickets", runs: "88 / wk", state: "paused" },
];

export type SavedView = {
  id: string;
  label: string;
  filter: { status?: InsightStatus; source?: string };
};

export const savedViews: SavedView[] = [
  { id: "v1", label: "EU checkout", filter: { source: "stripe.events" } },
  { id: "v2", label: "Model drift · v7", filter: { source: "ml.monitor" } },
  { id: "v3", label: "Refund anomalies", filter: { status: "queued" } },
];
