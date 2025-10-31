import { useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

const providers = [
  { id: "openrouter", name: "OpenRouter", status: "connected" },
  { id: "deepseek", name: "DeepSeek", status: "connected" },
  { id: "qwen", name: "Qwen3", status: "connected" },
  { id: "ollama", name: "Ollama", status: "disconnected" },
  { id: "anthropic", name: "Anthropic", status: "connected" }
];

export default function ModelRouterPanel() {
  const [selected, setSelected] = useState<string>(providers[0].id);

  return (
    <section className="glass-panel rounded-3xl p-6" aria-labelledby="model-router">
      <header className="flex items-center justify-between">
        <div>
          <h2 id="model-router" className="font-display text-xl text-primary">
            Model routing
          </h2>
          <p className="text-xs text-foreground/60">Route requests across providers via Claude Code Router.</p>
        </div>
        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
          {providers.find((item) => item.id === selected)?.name}
        </span>
      </header>
      <ul className="mt-6 space-y-3" role="radiogroup" aria-label="Model provider">
        {providers.map((provider) => (
          <li key={provider.id}>
            <label className="flex items-center justify-between gap-3 rounded-2xl border border-primary/20 px-4 py-3 text-sm text-foreground/80">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="model"
                  value={provider.id}
                  checked={selected === provider.id}
                  onChange={() => setSelected(provider.id)}
                />
                <span>{provider.name}</span>
              </div>
              <span className={provider.status === "connected" ? "text-success" : "text-warning"}>
                {provider.status === "connected" ? (
                  <Wifi className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <WifiOff className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-2xl border border-primary/20 bg-black/40 p-4 text-xs text-foreground/60">
        <p className="font-semibold text-primary">Recent requests</p>
        <ul className="mt-2 space-y-1">
          <li>11:58 • Claude Code • Upgrade UI • 3,200 tokens</li>
          <li>11:56 • Qwen3 • Data synthesis • 1,900 tokens</li>
          <li>11:54 • DeepSeek • Regression tests • 2,240 tokens</li>
        </ul>
      </div>
    </section>
  );
}
