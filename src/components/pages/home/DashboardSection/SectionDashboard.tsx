"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  insights as seedInsights,
  initialRules,
  savedViews,
  type TabId,
  type RangeId,
  type InsightStatus,
  type InsightRow,
  type AutomationRule,
} from "@/data/dashboard";
import { DashboardSidebar, type SidebarKey } from "./DashboardSidebar";
import { DashboardTopBar } from "./DashboardTopBar";
import { OverviewPanel } from "./OverviewPanel";
import { SignalsPanel } from "./SignalsPanel";
import { AutomationsPanel } from "./AutomationsPanel";
import { CommandPaletteModal } from "./CommandPaletteModal";

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
      <div className="mx-auto max-w-[1240px] px-3 py-12 sm:px-6 sm:py-20 lg:py-24">
        <div className="mb-6 sm:mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mono-num text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-ink-subtle">
              03 / Workspace
            </p>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-ink sm:mt-3 sm:text-3xl lg:text-4xl">
              A room for decisions,
              <br className="hidden md:block" /> not a wall of dashboards.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-ink-muted">
            The workspace is a live surface — insights arrive with evidence, and
            every action is one keystroke away. Try ⌘K.
          </p>
        </div>

        <div className="min-w-0 overflow-hidden rounded-xl border border-hairline bg-surface shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(20,30,60,0.15)]">
          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[220px_1fr]">
            <DashboardSidebar active={sidebar} onSelect={handleSidebar} onView={applyView} />
            <div className="min-w-0">
              <DashboardTopBar tab={tab} onChange={setTab} onCommand={() => setPaletteOpen(true)} />
              <div className="p-3 sm:p-6">
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

      <CommandPaletteModal
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
