"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  kpis,
  trendByRange,
  ranges,
  insights as seedInsights,
  tabs,
  initialRules,
  savedViews,
  type TabId,
  type RangeId,
  type InsightStatus,
  type InsightRow,
  type AutomationRule,
} from "@/data/dashboard";

type SidebarKey = "home" | "signals" | "insights" | "automations" | "cohorts" | "sources" | "models";

const sidebarToTab: Record<SidebarKey, TabId> = {
  home: "overview",
  signals: "signals",
  insights: "overview",
  automations: "automations",
  cohorts: "overview",
  sources: "signals",
  models: "overview",
};

export function SectionDashboard() {
  const [tab, setTab] = useState<TabId>("overview");
  const [sidebar, setSidebar] = useState<SidebarKey>("home");
  const [range, setRange] = useState<RangeId>("28d");
  const [rows, setRows] = useState<InsightRow[]>(seedInsights);
  const [statusFilter, setStatusFilter] = useState<InsightStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [refreshedAt, setRefreshedAt] = useState<number>(Date.now());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [rules, setRules] = useState<AutomationRule[]>(initialRules);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");

  // ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSidebar = (key: SidebarKey) => {
    setSidebar(key);
    setTab(sidebarToTab[key]);
    if (key === "automations") return;
    setStatusFilter("all");
    setSourceFilter(null);
  };

  const applyView = (id: string) => {
    const v = savedViews.find((s) => s.id === id);
    if (!v) return;
    setTab("overview");
    setSidebar("insights");
    setStatusFilter(v.filter.status ?? "all");
    setSourceFilter(v.filter.source ?? null);
  };

  const refresh = () => {
    setRows((prev) => {
      const bumped = prev.map((r) => ({ ...r }));
      const first = bumped[0];
      first.id = `IX-${(parseInt(first.id.split("-")[1], 10) + 1).toString()}`;
      first.time = "just now";
      return bumped;
    });
    setRefreshedAt(Date.now());
  };

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (r) =>
          (statusFilter === "all" || r.status === statusFilter) &&
          (!sourceFilter || r.source === sourceFilter),
      ),
    [rows, statusFilter, sourceFilter],
  );

  const paletteResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows.slice(0, 6);
    return rows.filter(
      (r) =>
        r.signal.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q),
    );
  }, [query, rows]);

  const toggleRule = (id: string) =>
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, state: r.state === "active" ? "paused" : "active" } : r)),
    );

  const addRule = () => {
    const id = `r${rules.length + 1}`;
    setRules((prev) => [
      ...prev,
      { id, name: "New rule (untitled)", scope: "custom.events", runs: "0 / wk", state: "paused" },
    ]);
  };

  const deleteRule = (id: string) => setRules((prev) => prev.filter((r) => r.id !== id));

  const secondsAgo = Math.max(1, Math.floor((Date.now() - refreshedAt) / 1000));

  return (
    <section id="dashboard" className="hairline-b bg-surface-muted/40">
      <div className="mx-auto max-w-[1240px] px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mono-num text-[11px] uppercase tracking-[0.24em] text-ink-subtle">
              03 / Workspace
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.02em] text-ink md:text-4xl">
              A room for decisions,
              <br className="hidden md:block" /> not a wall of dashboards.
            </h2>
          </div>
          <p className="max-w-md text-sm text-ink-muted">
            The workspace is a live surface — insights arrive with evidence, and
            every action is one keystroke away. Try ⌘K.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(20,30,60,0.15)]">
          <div className="grid grid-cols-[220px_1fr]">
            <Sidebar active={sidebar} onSelect={handleSidebar} onView={applyView} />
            <div className="min-w-0">
              <TopBar tab={tab} onChange={setTab} onCommand={() => setPaletteOpen(true)} />
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    {tab === "overview" && (
                      <OverviewPanel
                        range={range}
                        onRange={setRange}
                        rows={filteredRows}
                        statusFilter={statusFilter}
                        onStatusFilter={setStatusFilter}
                        sourceFilter={sourceFilter}
                        onClearSource={() => setSourceFilter(null)}
                        expanded={expanded}
                        onExpand={(id) => setExpanded((cur) => (cur === id ? null : id))}
                        onRefresh={refresh}
                        secondsAgo={secondsAgo}
                      />
                    )}
                    {tab === "signals" && <SignalsPanel rows={rows} />}
                    {tab === "automations" && (
                      <AutomationsPanel
                        rules={rules}
                        onToggle={toggleRule}
                        onAdd={addRule}
                        onDelete={deleteRule}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        query={query}
        onQuery={setQuery}
        results={paletteResults}
        onPick={(row) => {
          setPaletteOpen(false);
          setTab("overview");
          setExpanded(row.id);
          setSourceFilter(row.source);
        }}
      />
    </section>
  );
}

function Sidebar({
  active,
  onSelect,
  onView,
}: {
  active: SidebarKey;
  onSelect: (k: SidebarKey) => void;
  onView: (id: string) => void;
}) {
  const nav: { key: SidebarKey; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "signals", label: "Signals" },
    { key: "insights", label: "Insights" },
    { key: "automations", label: "Automations" },
    { key: "cohorts", label: "Cohorts" },
    { key: "sources", label: "Sources" },
    { key: "models", label: "Models" },
  ];
  return (
    <aside className="hairline-b border-r border-hairline bg-surface-muted/60 p-4">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md border border-hairline-strong bg-surface flex items-center justify-center text-[10px] font-semibold text-ink">
            X
          </div>
          <span className="text-sm font-medium text-ink">Xai · Acme</span>
        </div>
        <span className="mono-num text-[10px] text-ink-subtle">prod</span>
      </div>
      <div className="mt-4">
        <p className="px-2 mono-num text-[10px] uppercase tracking-[0.2em] text-ink-subtle">Workspace</p>
        <nav className="mt-1 space-y-0.5">
          {nav.map((n) => {
            const isActive = active === n.key;
            return (
              <button
                key={n.key}
                onClick={() => onSelect(n.key)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                  isActive ? "bg-signal-soft/70 text-ink" : "text-ink-muted hover:bg-surface-sunken"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-signal" : "bg-hairline-strong"}`} />
                {n.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="mt-6">
        <p className="px-2 mono-num text-[10px] uppercase tracking-[0.2em] text-ink-subtle">Saved views</p>
        <div className="mt-1 space-y-0.5">
          {savedViews.map((v) => (
            <button
              key={v.id}
              onClick={() => onView(v.id)}
              className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-ink-muted hover:bg-surface-sunken hover:text-ink"
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 border-t border-hairline pt-3">
        <div className="flex items-center gap-2 px-2">
          <div className="h-6 w-6 rounded-full bg-ink text-surface flex items-center justify-center text-[10px] font-medium">
            RM
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-medium text-ink">Riley Mora</div>
            <div className="mono-num truncate text-[10px] text-ink-subtle">on call · 14d</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({
  tab,
  onChange,
  onCommand,
}: {
  tab: TabId;
  onChange: (t: TabId) => void;
  onCommand: () => void;
}) {
  return (
    <div className="hairline-b flex items-center justify-between gap-4 px-6 py-3">
      <div className="flex items-center gap-3 text-sm text-ink-muted">
        <span>Workspace</span>
        <span className="text-ink-subtle">/</span>
        <span className="text-ink">Home</span>
      </div>
      <div className="relative flex items-center gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative rounded px-3 py-1.5 text-sm transition-colors ${
              tab === t.id ? "text-ink" : "text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-2 -bottom-[13px] h-[2px] bg-signal"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="mono-num hidden items-center gap-1 rounded border border-hairline bg-surface-muted px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-ink-subtle md:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> live
        </div>
        <button
          onClick={onCommand}
          className="rounded border border-hairline bg-surface px-2 py-1 text-xs text-ink-muted hover:text-ink"
        >
          ⌘K
        </button>
      </div>
    </div>
  );
}

function OverviewPanel({
  range,
  onRange,
  rows,
  statusFilter,
  onStatusFilter,
  sourceFilter,
  onClearSource,
  expanded,
  onExpand,
  onRefresh,
  secondsAgo,
}: {
  range: RangeId;
  onRange: (r: RangeId) => void;
  rows: InsightRow[];
  statusFilter: InsightStatus | "all";
  onStatusFilter: (s: InsightStatus | "all") => void;
  sourceFilter: string | null;
  onClearSource: () => void;
  expanded: string | null;
  onExpand: (id: string) => void;
  onRefresh: () => void;
  secondsAgo: number;
}) {
  const data = trendByRange[range];
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-lg border border-hairline bg-surface p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle">{k.label}</div>
            <div className="mono-num mt-2 text-2xl text-ink">{k.value}</div>
            <div
              className={`mono-num mt-1 inline-flex items-center gap-1 text-[11px] ${
                k.trend === "down" ? "text-success" : "text-signal"
              }`}
            >
              {k.trend === "down" ? "↓" : "↑"} {k.delta}
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-lg border border-hairline bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-ink">Signal volume · {range}</div>
              <div className="mono-num text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                events · millions
              </div>
            </div>
            <div className="flex gap-1 text-[11px]">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => onRange(r)}
                  className={`rounded px-2 py-1 transition-colors ${
                    range === r ? "bg-surface-sunken text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <TrendChart data={data} />
        </div>
        <div className="rounded-lg border border-hairline bg-surface p-5">
          <div className="text-sm font-medium text-ink">Confidence distribution</div>
          <div className="mono-num text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
            last 1,000 insights
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["≥ 0.95", 62],
              ["0.85–0.95", 24],
              ["0.70–0.85", 10],
              ["< 0.70", 4],
            ].map(([bucket, pct]) => (
              <div key={bucket as string}>
                <div className="mono-num flex justify-between text-[11px] text-ink-muted">
                  <span>{bucket}</span>
                  <span>{pct}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-surface-sunken">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                    className="h-1.5 rounded-full bg-signal"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <InsightsTable
        rows={rows}
        statusFilter={statusFilter}
        onStatusFilter={onStatusFilter}
        sourceFilter={sourceFilter}
        onClearSource={onClearSource}
        expanded={expanded}
        onExpand={onExpand}
        onRefresh={onRefresh}
        secondsAgo={secondsAgo}
      />
    </div>
  );
}

function SignalsPanel({ rows }: { rows: InsightRow[] }) {
  return (
    <div className="rounded-lg border border-hairline bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-medium text-ink">Streaming signals</div>
        <span className="mono-num text-[11px] text-ink-subtle">412 sources connected</span>
      </div>
      <div className="grid gap-2">
        {rows.slice(0, 6).map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded border border-hairline bg-surface-muted/40 px-3 py-2">
            <div className="min-w-0">
              <div className="mono-num text-[11px] text-ink-subtle">{r.source}</div>
              <div className="truncate text-sm text-ink">{r.signal}</div>
            </div>
            <div className="mono-num text-[11px] text-ink-subtle">{r.time} ago</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationsPanel({
  rules,
  onToggle,
  onAdd,
  onDelete,
}: {
  rules: AutomationRule[];
  onToggle: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-lg border border-hairline bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-medium text-ink">Automations</div>
        <button
          onClick={onAdd}
          className="mono-num text-[11px] text-signal hover:underline"
        >
          + new rule
        </button>
      </div>
      <div className="grid gap-2">
        {rules.map((r) => (
          <div key={r.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 rounded border border-hairline bg-surface-muted/40 px-3 py-2.5">
            <div>
              <div className="text-sm text-ink">{r.name}</div>
              <div className="mono-num text-[11px] text-ink-subtle">{r.scope}</div>
            </div>
            <div className="mono-num text-[11px] text-ink-muted">{r.runs}</div>
            <StatusPill status={r.state === "active" ? "resolved" : "queued"} label={r.state} />
            <button
              onClick={() => onToggle(r.id)}
              className="text-xs text-ink-muted hover:text-ink"
            >
              {r.state === "active" ? "Pause" : "Resume"}
            </button>
            <button
              onClick={() => onDelete(r.id)}
              className="text-xs text-ink-muted hover:text-warning"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendChart({ data }: { data: number[] }) {
  const w = 560;
  const h = 160;
  const pad = 8;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
    return [x, y] as const;
  });
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const area = `${line} L ${points[points.length - 1][0]} ${h - pad} L ${points[0][0]} ${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={pad}
          x2={w - pad}
          y1={pad + f * (h - pad * 2)}
          y2={pad + f * (h - pad * 2)}
          stroke="var(--color-hairline)"
        />
      ))}
      <motion.path
        key={`area-${data.length}-${data[0]}`}
        d={area}
        fill="url(#areaFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        key={`line-${data.length}-${data[0]}`}
        d={line}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      />
      {points.filter((_, i) => i === points.length - 1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="var(--color-signal)" />
      ))}
    </svg>
  );
}

function InsightsTable({
  rows,
  statusFilter,
  onStatusFilter,
  sourceFilter,
  onClearSource,
  expanded,
  onExpand,
  onRefresh,
  secondsAgo,
}: {
  rows: InsightRow[];
  statusFilter: InsightStatus | "all";
  onStatusFilter: (s: InsightStatus | "all") => void;
  sourceFilter: string | null;
  onClearSource: () => void;
  expanded: string | null;
  onExpand: (id: string) => void;
  onRefresh: () => void;
  secondsAgo: number;
}) {
  const statuses: (InsightStatus | "all")[] = ["all", "automated", "investigating", "queued", "resolved"];
  return (
    <div className="rounded-lg border border-hairline bg-surface">
      <div className="hairline-b flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium text-ink">Live insights</div>
          <div className="flex gap-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => onStatusFilter(s)}
                className={`mono-num rounded px-2 py-0.5 text-[11px] transition-colors ${
                  statusFilter === s
                    ? "bg-surface-sunken text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {sourceFilter && (
            <button
              onClick={onClearSource}
              className="mono-num inline-flex items-center gap-1 rounded-full border border-hairline bg-surface-muted px-2 py-0.5 text-[11px] text-ink-muted hover:text-ink"
            >
              source: {sourceFilter} ×
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="mono-num text-[11px] text-ink-subtle">refreshed {secondsAgo}s ago</div>
          <button
            onClick={onRefresh}
            className="mono-num rounded border border-hairline bg-surface px-2 py-1 text-[11px] text-ink-muted hover:text-ink"
          >
            ↻ refresh
          </button>
        </div>
      </div>
      <div>
        <div className="hairline-b grid grid-cols-[90px_1fr_160px_100px_110px_60px] gap-4 px-4 py-2 mono-num text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
          <span>ID</span>
          <span>Signal</span>
          <span>Source</span>
          <span>Confidence</span>
          <span>Status</span>
          <span className="text-right">Age</span>
        </div>
        {rows.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-ink-muted">
            No insights match the current filters.
          </div>
        )}
        {rows.map((r, i) => (
          <div key={r.id} className="hairline-b last:border-b-0">
            <motion.button
              type="button"
              onClick={() => onExpand(r.id)}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="grid w-full grid-cols-[90px_1fr_160px_100px_110px_60px] items-center gap-4 px-4 py-3 text-left text-sm transition-colors hover:bg-surface-muted/40"
            >
              <span className="mono-num text-xs text-ink-subtle">{r.id}</span>
              <span className="truncate text-ink">{r.signal}</span>
              <span className="mono-num truncate text-xs text-ink-muted">{r.source}</span>
              <span className="mono-num text-xs text-ink">{r.confidence.toFixed(2)}</span>
              <StatusPill status={r.status} />
              <span className="mono-num text-right text-xs text-ink-subtle">{r.time}</span>
            </motion.button>
            <AnimatePresence initial={false}>
              {expanded === r.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-surface-muted/40"
                >
                  <div className="px-4 py-3 text-xs text-ink-muted">
                    <div className="mono-num text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
                      Evidence
                    </div>
                    <p className="mt-1 text-ink">{r.detail}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandPalette({
  open,
  onClose,
  query,
  onQuery,
  results,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  query: string;
  onQuery: (v: string) => void;
  results: InsightRow[];
  onPick: (r: InsightRow) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 backdrop-blur-sm pt-[18vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-hairline bg-surface shadow-2xl"
          >
            <div className="hairline-b flex items-center gap-2 px-4 py-3">
              <span className="mono-num text-[11px] text-ink-subtle">⌘K</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="Search insights, sources, IDs…"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-subtle focus:outline-none"
              />
              <button onClick={onClose} className="text-xs text-ink-muted hover:text-ink">esc</button>
            </div>
            <div className="max-h-80 overflow-auto p-2">
              {results.length === 0 && (
                <div className="px-3 py-6 text-center text-sm text-ink-muted">No matches</div>
              )}
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onPick(r)}
                  className="grid w-full grid-cols-[70px_1fr_auto] items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-surface-muted"
                >
                  <span className="mono-num text-[11px] text-ink-subtle">{r.id}</span>
                  <span className="truncate text-sm text-ink">{r.signal}</span>
                  <span className="mono-num text-[11px] text-ink-subtle">{r.source}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusPill({ status, label }: { status: "resolved" | "investigating" | "queued" | "automated"; label?: string }) {
  const map: Record<string, { fg: string; bg: string; dot: string; label: string }> = {
    resolved: { fg: "text-success", bg: "bg-success/10", dot: "bg-success", label: "resolved" },
    investigating: { fg: "text-warning", bg: "bg-warning/15", dot: "bg-warning", label: "investigating" },
    queued: { fg: "text-ink-muted", bg: "bg-surface-sunken", dot: "bg-ink-subtle", label: "queued" },
    automated: { fg: "text-signal", bg: "bg-signal-soft", dot: "bg-signal", label: "automated" },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] ${s.bg} ${s.fg}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {label ?? s.label}
    </span>
  );
}
