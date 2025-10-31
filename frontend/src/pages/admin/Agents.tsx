import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const sampleAgents = [
  { name: "UI Refiner", model: "Claude 3 Opus", budget: "$1,500", status: "running" },
  { name: "Test Captain", model: "DeepSeek V3", budget: "$900", status: "paused" },
  { name: "Ops Liaison", model: "Gemini 1.5", budget: "$1,200", status: "running" }
];

export default function Agents() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="space-y-8 px-8 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Agents</h1>
          <p className="text-sm text-foreground/60">Manage autonomous sub-agents, their budgets, and environment variables.</p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <PlusCircle className="h-4 w-4" aria-hidden="true" />
          Create agent
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sampleAgents.map((agent) => (
          <article key={agent.name} className="glass-panel rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">{agent.name}</h2>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-wide",
                  agent.status === "running" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                )}
              >
                {agent.status}
              </span>
            </div>
            <dl className="mt-4 space-y-2 text-sm text-foreground/70">
              <div className="flex justify-between"><dt>Model</dt><dd>{agent.model}</dd></div>
              <div className="flex justify-between"><dt>Budget</dt><dd>{agent.budget}</dd></div>
            </dl>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 rounded-xl border border-primary/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
                {agent.status === "running" ? "Pause" : "Resume"}
              </button>
              <button className="flex-1 rounded-xl border border-secondary/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
                Logs
              </button>
            </div>
          </article>
        ))}
      </div>

      {formOpen && (
        <form className="glass-panel grid gap-4 rounded-3xl p-6 md:grid-cols-2" aria-labelledby="create-agent">
          <h2 id="create-agent" className="md:col-span-2 font-display text-xl text-primary">
            Create new agent
          </h2>
          <label className="flex flex-col text-sm">
            Client ID
            <input className="mt-1 rounded-xl border border-primary/30 bg-black/40 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary" />
          </label>
          <label className="flex flex-col text-sm">
            Model
            <select className="mt-1 rounded-xl border border-primary/30 bg-black/40 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
              <option>Claude 3 Opus</option>
              <option>DeepSeek V3</option>
              <option>Qwen3 XL</option>
              <option>Ollama Llama 3</option>
            </select>
          </label>
          <label className="flex flex-col text-sm">
            Budget
            <input type="number" className="mt-1 rounded-xl border border-primary/30 bg-black/40 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary" />
          </label>
          <label className="flex flex-col text-sm">
            Env Vars
            <textarea className="mt-1 rounded-xl border border-primary/30 bg-black/40 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary" rows={4} />
          </label>
          <button className="md:col-span-2 rounded-full bg-primary/20 px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
            Submit
          </button>
        </form>
      )}
    </section>
  );
}
