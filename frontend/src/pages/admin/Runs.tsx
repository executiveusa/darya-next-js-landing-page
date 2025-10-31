import { useState } from "react";
import { ChevronDown } from "lucide-react";

const runs = [
  {
    id: "run_924",
    agent: "UI Refiner",
    workflow: "Upgrade UI",
    status: "success",
    startedAt: "12:05",
    duration: "3m 24s",
    spans: [
      { name: "claude.plan", duration: "48s" },
      { name: "git.diff", duration: "1m 30s" }
    ]
  },
  {
    id: "run_921",
    agent: "Test Captain",
    workflow: "Write tests",
    status: "error",
    startedAt: "11:48",
    duration: "1m 12s",
    spans: [
      { name: "playwright.run", duration: "42s" },
      { name: "report.upload", duration: "30s" }
    ]
  }
];

export default function Runs() {
  const [expanded, setExpanded] = useState<string | null>(runs[0]?.id ?? null);

  return (
    <section className="space-y-6 px-8 py-10">
      <header>
        <h1 className="font-display text-3xl">Runs</h1>
        <p className="text-sm text-foreground/60">Inspect CloudFlow runs with span breakdowns and quick links to Cloud Trace.</p>
      </header>
      <div className="space-y-4">
        {runs.map((run) => (
          <article key={run.id} className="glass-panel rounded-3xl">
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              onClick={() => setExpanded((prev) => (prev === run.id ? null : run.id))}
              aria-expanded={expanded === run.id}
            >
              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
                  {run.status}
                </span>
                <strong>{run.workflow}</strong>
                <span className="text-foreground/60">{run.agent}</span>
                <span className="text-foreground/60">{run.duration}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-foreground/60" aria-hidden="true" />
            </button>
            {expanded === run.id && (
              <div className="border-t border-primary/20 px-6 py-4 text-sm text-foreground/70">
                <p className="mb-3 text-xs text-foreground/60">Started at {run.startedAt} • <a href="https://console.cloud.google.com/traces" className="text-primary underline">Cloud Trace</a></p>
                <ul className="space-y-2">
                  {run.spans.map((span) => (
                    <li key={span.name} className="flex justify-between">
                      <span>{span.name}</span>
                      <span>{span.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
