const roles = ["Owner", "Operator", "Viewer"];

export default function SettingsPage() {
  return (
    <section className="space-y-8 px-8 py-10">
      <header>
        <h1 className="font-display text-3xl">Settings</h1>
        <p className="text-sm text-foreground/60">Configure IAP access, Cloud Code Router, Rube endpoints, and environment variables.</p>
      </header>

      <form className="glass-panel grid gap-4 rounded-3xl p-6 md:grid-cols-2" aria-labelledby="iap">
        <h2 id="iap" className="md:col-span-2 font-display text-xl text-primary">
          IAP roles
        </h2>
        {roles.map((role) => (
          <label key={role} className="flex items-center gap-3 text-sm">
            <input type="checkbox" className="h-4 w-4 rounded border-primary/40 bg-black/60" />
            {role}
          </label>
        ))}
      </form>

      <form className="glass-panel grid gap-4 rounded-3xl p-6" aria-labelledby="router">
        <h2 id="router" className="font-display text-xl text-primary">
          Cloud Code Router
        </h2>
        <label className="flex flex-col text-sm">
          Endpoint
          <input className="mt-1 rounded-xl border border-primary/30 bg-black/40 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary" placeholder="https://router.synthia.dev" />
        </label>
        <label className="flex flex-col text-sm">
          API Key
          <input className="mt-1 rounded-xl border border-primary/30 bg-black/40 px-4 py-2" placeholder="••••••" />
        </label>
      </form>

      <form className="glass-panel grid gap-4 rounded-3xl p-6" aria-labelledby="postgres">
        <h2 id="postgres" className="font-display text-xl text-primary">
          Postgres connection
        </h2>
        <label className="flex flex-col text-sm">
          Connection string
          <textarea className="mt-1 rounded-xl border border-primary/30 bg-black/40 px-4 py-2" rows={3} placeholder="postgres://user:pass@host:5432/db" />
        </label>
      </form>
    </section>
  );
}
