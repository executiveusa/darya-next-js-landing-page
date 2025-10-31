import { useState } from "react";

const metrics = [
  { label: "Latency (p95)", values: [220, 190, 205, 182, 176] },
  { label: "Error rate", values: [0.9, 0.7, 0.6, 0.5, 0.4] },
  { label: "Tokens / min", values: [38, 42, 44, 43, 45] },
  { label: "Cost / day", values: [480, 520, 510, 505, 498] }
];

const ranges = ["6h", "24h", "7d", "30d"] as const;

export default function Observability() {
  const [activeRange, setActiveRange] = useState<typeof ranges[number]>("24h");

  return (
    <section className="space-y-8 px-8 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Observability</h1>
          <p className="text-sm text-foreground/60">Track key signals across CloudFlow, Claude Code, and model routing.</p>
        </div>
        <div className="flex gap-2">
          {ranges.map((range) => (
            <button
              key={range}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${activeRange === range ? "bg-primary/20 text-primary" : "border border-primary/30 text-foreground/60"}`}
              onClick={() => setActiveRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {metrics.map((metric) => (
          <article key={metric.label} className="glass-panel rounded-3xl p-6">
            <h2 className="font-display text-xl text-primary">{metric.label}</h2>
            <div className="mt-4 grid grid-cols-5 gap-3">
              {metric.values.map((value, idx) => (
                <div key={idx} className="flex h-24 flex-col justify-end">
                  <div className="rounded-t-lg bg-primary/30" style={{ height: `${Math.min(100, value)}%` }} />
                  <span className="mt-2 text-xs text-foreground/60">T-{idx + 1}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
