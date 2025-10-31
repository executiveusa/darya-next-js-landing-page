const deployments = [
  {
    service: "synthia-admin",
    region: "us-central1",
    revisions: [
      { name: "rev-42", traffic: "70%", status: "Serving" },
      { name: "rev-41", traffic: "30%", status: "Serving" }
    ]
  },
  {
    service: "synthia-landing",
    region: "us-east1",
    revisions: [
      { name: "rev-12", traffic: "100%", status: "Serving" }
    ]
  }
];

export default function Deployments() {
  return (
    <section className="space-y-6 px-8 py-10">
      <header>
        <h1 className="font-display text-3xl">Deployments</h1>
        <p className="text-sm text-foreground/60">Manage Cloud Run revisions, track traffic splits, and promote releases.</p>
      </header>
      <div className="space-y-4">
        {deployments.map((deployment) => (
          <article key={deployment.service} className="glass-panel rounded-3xl p-6">
            <header className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl text-primary">{deployment.service}</h2>
                <p className="text-xs text-foreground/60">Region: {deployment.region}</p>
              </div>
              <button className="rounded-full bg-primary/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
                Deploy new revision
              </button>
            </header>
            <ul className="mt-6 space-y-3 text-sm text-foreground/70">
              {deployment.revisions.map((revision) => (
                <li key={revision.name} className="flex flex-wrap items-center gap-4 rounded-2xl border border-primary/20 px-4 py-3">
                  <span className="font-semibold">{revision.name}</span>
                  <span className="text-foreground/60">Traffic {revision.traffic}</span>
                  <span className="text-foreground/60">{revision.status}</span>
                  <button className="ml-auto rounded-full border border-secondary/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
                    Promote
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
