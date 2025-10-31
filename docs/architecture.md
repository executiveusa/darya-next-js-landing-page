# Architecture Overview

## Frontend Structure
- **Vite + React 18** bootstraps the application with concurrent rendering features via `Suspense` and `startTransition`.
- **Routing** handled by React Router with marketing (`/`), templates (`/templates`), and admin nested routes (`/admin/*`).
- **State** primarily managed via component state hooks; localization provided by a custom `I18nProvider`.
- **Styling** relies on Tailwind using Synthia tokens from `tailwind.config.js` plus shadcn-inspired components (`NeonButton`, `Section`).
- **Animations** powered by GSAP on hero elements for the landing experience.

## Admin Layout
- Sidebar navigation with collapsible state to improve responsive behavior.
- Each admin page is lazy-loaded to optimize initial payload, rendered inside a shared Suspense boundary.
- `ModelRouterPanel` surfaces provider connectivity and recent logs.
- `Ide` page embeds the Claude Code chat UI with workflow launchers and YAML upload placeholder.

## Integrations
- Environment-driven endpoints set via Vite define for Cloud Code, CloudFlow, Rube, and model router services.
- Scheduling form posts to `/api/interview/start` for BMAD voice intake trigger.
- Template cards expose Build action to backend hook (to be implemented) that clones templates and starts Lemon AI loop.

## Build & Deployment
- `Dockerfile.frontend` builds the Vite project and serves pre-rendered assets via `serve` on port 5173.
- GitHub Actions workflow (`.github/workflows/frontend.yml`) validates lint, test, build, and prepares accessibility + performance budgets.
# Frontend Architecture

## Tech Stack
- **Framework:** Next.js 13 (pages directory) with React 18.
- **Styling:** Tailwind CSS tokens layered on top of existing SCSS modules while migration occurs.
- **Animation:** GSAP with ScrollTrigger and Lenis for smooth scroll experiences.
- **UI Library:** shadcn/ui primitives composed with Radix UI for accessible dialogs, tabs, and popovers.
- **State Management:** React context for theme and localization, React Query (planned) for API data hydration.
- **Internationalization:** next-intl (planned) with language-specific namespaces stored in `/public/locales`.

## Application Structure
```
/frontend
  ├─ app/                # Next.js app directory (planned migration)
  ├─ pages/              # Legacy page routes (current)
  ├─ components/
  │   ├─ ui/             # Reusable shadcn-based primitives
  │   └─ sections/       # Landing page sections with GSAP hooks
  ├─ hooks/
  ├─ context/
  ├─ schemas/            # zod/yup validation shared across forms
  ├─ styles/
  ├─ public/
  └─ tests/              # Playwright MCP integration tests
```

## Key Flows
- **Landing Page Scroll Story:** Compose hero, proof grid, process, template gallery, live demos, pricing, and CTA sections as independently animated slices triggered by ScrollTrigger hooks.
- **Scheduling Widget:** `components/sections/Scheduling.tsx` renders the CTA form, sending POST requests to `/backend/api/interview/start` with user context and consent metadata.
- **Admin Layout:** `/pages/admin` routes use a guard hook (`useRequireAuth`) to redirect unauthenticated visitors. Primary navigation includes Dashboard, Agents, Runs, Deployments, Observability, Settings.
- **Template Catalogue:** `/pages/templates/index.tsx` maps file metadata from `/templates/manifest.json`, enabling preview cards and download buttons.

## Data Contracts
- **Agent:** `{ id, clientId, model, status, budget, environment, createdAt }`
- **Run:** `{ id, agentId, clientId, status, costUsd, latencyMs, spans: SpanNode[], logs: LogEntry[], artifacts: ArtifactRef[] }`
- **Deployment:** `{ service, revision, trafficPercent, updatedAt }`

## Testing & QA
- **Playwright MCP:** Executes Lighthouse + axe audits for `/` and `/admin` routes, failing builds if metrics regress.
- **Unit Tests:** Components under `/components/ui` leverage Jest + React Testing Library (planned addition).
- **Storybook:** Visual regression coverage for component library (planned addition).

## Deployment
- Dockerized via `Dockerfile.frontend` with multi-stage build.
- GitHub Actions pipeline builds, tests, and deploys to Google Cloud Run.
- `docker-compose.yaml` coordinates local frontend + mock backend for offline development.

