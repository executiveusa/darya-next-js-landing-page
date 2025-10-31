import { lazy, Suspense, useState, startTransition } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
  Activity,
  Bot,
  Code2,
  Compass,
  Gauge,
  Layers,
  LineChart,
  Settings,
  Workflow
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useI18n } from "../../lib/i18n";
import TemplatesHub from "../templates/TemplatesHub";

const Dashboard = lazy(() => import("./Dashboard"));
const Agents = lazy(() => import("./Agents"));
const Runs = lazy(() => import("./Runs"));
const Deployments = lazy(() => import("./Deployments"));
const Observability = lazy(() => import("./Observability"));
const SettingsPage = lazy(() => import("./SettingsPage"));
const Ide = lazy(() => import("./Ide"));
const RubePage = lazy(() => import("./RubePage"));

const navItems = [
  { to: ".", label: "Dashboard", icon: Gauge },
  { to: "agents", label: "Agents", icon: Bot },
  { to: "runs", label: "Runs", icon: Activity },
  { to: "deployments", label: "Deployments", icon: Layers },
  { to: "observability", label: "Observability", icon: LineChart },
  { to: "ide", label: "IDE", icon: Code2 },
  { to: "rube", label: "Rube MCP", icon: Workflow },
  { to: "settings", label: "Settings", icon: Settings },
  { to: "templates", label: "Templates", icon: Compass }
];

export default function AdminLayout() {
  const { language, toggleLanguage } = useI18n();
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <div className="grid min-h-screen grid-cols-[auto,1fr] bg-[#050608] text-foreground">
      <aside className={cn("border-r border-primary/20 bg-black/40 backdrop-blur-xl transition-all", isCollapsed ? "w-20" : "w-64")}
        aria-label="Admin navigation"
      >
        <button
          type="button"
          onClick={() => startTransition(() => setCollapsed((prev) => !prev))}
          className="m-4 inline-flex w-[calc(100%-2rem)] items-center justify-center rounded-xl border border-primary/40 px-3 py-2 text-xs uppercase tracking-[0.3em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          aria-pressed={isCollapsed}
        >
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
        <nav className="flex flex-col gap-1 px-2" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "."}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
                    isActive ? "bg-primary/20 text-primary" : "text-foreground/70 hover:bg-white/5",
                    isCollapsed && "justify-center"
                  )
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-primary/20 bg-black/60 px-8 py-4">
          <h1 className="font-display text-2xl">Synthia Admin</h1>
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-primary/30 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            {language === "en" ? "ES" : "EN"}
          </button>
        </header>
        <main tabIndex={-1} className="flex-1 overflow-y-auto focus-visible:outline-none">
          <Suspense
            fallback={
              <div className="flex min-h-[40vh] items-center justify-center text-sm text-foreground/70">Loading admin module…</div>
            }
          >
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="agents" element={<Agents />} />
              <Route path="runs" element={<Runs />} />
              <Route path="deployments" element={<Deployments />} />
              <Route path="observability" element={<Observability />} />
              <Route path="ide" element={<Ide />} />
              <Route path="rube" element={<RubePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="templates" element={<TemplatesHub admin />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
