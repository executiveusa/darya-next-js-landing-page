# Component Inventory

| Component | Location | Description |
|-----------|----------|-------------|
| `LanguageToggle` | `frontend/src/components/LanguageToggle.tsx` | Bilingual toggle button with accessible focus state. |
| `NeonButton` | `frontend/src/components/NeonButton.tsx` | shadcn-inspired button with neon glow. |
| `Section` | `frontend/src/components/Section.tsx` | Shared section layout with icon accent. |
| `ModelRouterPanel` | `frontend/src/components/ModelRouterPanel.tsx` | Displays provider status, request logs, and radio selection. |
| `LandingPage` | `frontend/src/pages/LandingPage.tsx` | Marketing landing with GSAP hero, proof grid, categories, scheduling form. |
| `TemplatesHub` | `frontend/src/pages/templates/TemplatesHub.tsx` | Template marketplace accessible from marketing and admin. |
| `AdminLayout` | `frontend/src/pages/admin/AdminLayout.tsx` | Lazy-loaded admin shell with collapsible sidebar. |
| `Dashboard` | `frontend/src/pages/admin/Dashboard.tsx` | KPI grid and model router panel. |
| `Agents` | `frontend/src/pages/admin/Agents.tsx` | Manage sub-agents with create form. |
| `Runs` | `frontend/src/pages/admin/Runs.tsx` | CloudFlow run history with spans and Cloud Trace link. |
| `Deployments` | `frontend/src/pages/admin/Deployments.tsx` | Cloud Run management and traffic promotions. |
| `Observability` | `frontend/src/pages/admin/Observability.tsx` | Chart summary for latency, error rate, tokens, cost. |
| `SettingsPage` | `frontend/src/pages/admin/SettingsPage.tsx` | Configure IAP roles, router settings, Postgres env. |
| `RubePage` | `frontend/src/pages/admin/RubePage.tsx` | Manage Rube MCP connectors and quick start. |
| `Ide` | `frontend/src/pages/admin/Ide.tsx` | Claude Code chat interface with CloudFlow templates and YAML upload. |
| Component | Description | Status | Notes |
|-----------|-------------|--------|-------|
| `Button` | Primary CTA, neon accent with ghost/secondary variants using shadcn base. | Planned | Requires loading/success/error states and keyboard-focus outlines. |
| `Card` | Glassmorphic container for stats, template previews, and logs. | Planned | Tailwind tokens for radius, shadow, and border mixins. |
| `Navbar` | Sticky top navigation with ≤7 items and language toggle. | In Progress | Needs Skip-to-content link and mobile drawer animation. |
| `Footer` | Global footer with contact, compliance, and social proof. | In Progress | Provide bilingual content and structured data. |
| `HeroSection` | Animated headline with GSAP timeline and CTA. | Planned | Blend Lenis smooth scroll and ScrollTrigger pinning. |
| `ProofGrid` | Grid of testimonials, partner logos, and metrics. | Planned | Should support responsive columns and accessible captions. |
| `HowItWorks` | Stepper explaining BMAD voice flow. | Planned | Use ordered list semantics and focusable step controls. |
| `LiveDemos` | Carousel of template previews and video walkthroughs. | Planned | Requires keyboard accessible slider controls. |
| `PricingPlans` | Tier cards with CTA button and feature checklist. | Planned | Provide aria-describedby for each CTA button. |
| `ScheduleWidget` | Form that initiates interview scheduling. | Planned | Validates contact info and posts to backend endpoint. |
| `AdminSidebar` | Vertical navigation for admin pages. | Planned | Collapsible on mobile; track active route. |
| `KpiCard` | Metric visualization for Dashboard. | Planned | Accepts threshold props and displays trend badges. |
| `RunsTable` | Paginated table summarizing runs. | Planned | Integrate row detail drawer with tabs for overview/logs/artifacts. |
| `DeploymentsList` | Cards showing Cloud Run revisions. | Planned | Provide promote/demote controls and status badges. |
| `ObservabilityCharts` | Token usage, latency, cost charts. | Planned | Integrate with charting library and accessible descriptions. |
| `SettingsForm` | Manage roles, OTLP endpoint, secrets. | Planned | Each secret field masked with reveal toggle and audit logging. |

## Token Library
- Primary Color: `#7CFBFF`
- Secondary Color: `#9C6BFF`
- Neutral Surface: `rgba(12, 17, 28, 0.8)`
- Accent Gradient: `linear-gradient(135deg, #7CFBFF 0%, #9C6BFF 100%)`
- Border Radius Scale: `xs 4px`, `sm 8px`, `md 12px`, `lg 16px`
- Shadows: `glass-sm`, `glass-lg` defined in Tailwind config (planned)

