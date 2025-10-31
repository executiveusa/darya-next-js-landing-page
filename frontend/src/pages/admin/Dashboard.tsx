import { useMemo } from "react";
import { Activity, Cpu, DollarSign, Zap } from "lucide-react";
import { formatCurrency } from "../../lib/utils";
import ModelRouterPanel from "../../components/ModelRouterPanel";

const metrics = [
  {
    title: "Latency",
    value: "182 ms",
    delta: "-12% vs last week",
    icon: Zap
  },
  {
    title: "Tokens / min",
    value: "42k",
    delta: "+8%",
    icon: Activity
  },
  {
    title: "Spend",
    value: formatCurrency(2480),
    delta: "Budget 72% utilized",
    icon: DollarSign
  },
  {
    title: "Active Agents",
    value: "32",
    delta: "4 paused",
    icon: Cpu
  }
];

export default function Dashboard() {
  const cards = useMemo(
    () =>
      metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article key={metric.title} className="glass-panel flex flex-col gap-3 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-primary">{metric.title}</h2>
              <Icon className="h-5 w-5 text-secondary" aria-hidden="true" />
            </div>
            <p className="text-3xl font-semibold">{metric.value}</p>
            <p className="text-xs text-foreground/60">{metric.delta}</p>
          </article>
        );
      }),
    []
  );

  return (
    <section className="space-y-8 px-8 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl">Operational Pulse</h1>
        <p className="text-sm text-foreground/60">
          Real-time overview of Claude Code command throughput, CloudFlow success rates, and model routing performance.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{cards}</div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="glass-panel grid gap-6 rounded-3xl p-6">
          <div>
            <h2 className="font-display text-xl text-primary">Request Logs</h2>
            <ul className="mt-4 space-y-2 text-xs text-foreground/70">
              <li>12:02 • Claude 3 Opus • Upgrade UI workflow • 3.1k tokens</li>
              <li>11:57 • DeepSeek V3 • Regression tests run • 2.3k tokens</li>
              <li>11:55 • Gemini 1.5 • Observability query • 1.1k tokens</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl text-primary">Workflow Momentum</h2>
            <p className="mt-4 text-sm text-foreground/70">
              CloudFlow executions are clustered around design QA and integration testing. Consider enabling auto-scaling for DeepSeek on US-central1.
            </p>
          </div>
        </div>
        <ModelRouterPanel />
      </div>
    </section>
  );
}
