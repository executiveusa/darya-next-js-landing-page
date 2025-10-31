const connectors = [
  { name: "Gmail", description: "Send and triage emails", enabled: true },
  { name: "Slack", description: "Post channel updates", enabled: false },
  { name: "Notion", description: "Sync knowledge base", enabled: true }
];

export default function RubePage() {
  return (
    <section className="space-y-8 px-8 py-10">
      <header className="space-y-2">
        <h1 className="font-display text-3xl">Rube MCP Connectors</h1>
        <p className="text-sm text-foreground/60">Authenticate apps, toggle connectors, and run validation commands.</p>
      </header>

      <article className="glass-panel rounded-3xl p-6">
        <h2 className="font-display text-xl text-primary">Quick start</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-foreground/70">
          <li>Install the Rube MCP CLI and authenticate with `rube login`.</li>
          <li>Paste the generated token below to link Synthia.</li>
          <li>Enable connectors and issue test actions.</li>
        </ol>
        <label className="mt-4 flex flex-col text-sm">
          Rube token
          <input className="mt-1 rounded-xl border border-primary/30 bg-black/40 px-4 py-2" placeholder="rube_live_***" />
        </label>
      </article>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {connectors.map((connector) => (
          <article key={connector.name} className="glass-panel rounded-3xl p-5">
            <header className="flex items-center justify-between">
              <h2 className="font-display text-xl">{connector.name}</h2>
              <span className={connector.enabled ? "text-success" : "text-warning"}>
                {connector.enabled ? "Connected" : "Disabled"}
              </span>
            </header>
            <p className="mt-2 text-sm text-foreground/70">{connector.description}</p>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 rounded-xl border border-primary/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
                {connector.enabled ? "Disable" : "Enable"}
              </button>
              <button className="flex-1 rounded-xl border border-secondary/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
                Send test
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
