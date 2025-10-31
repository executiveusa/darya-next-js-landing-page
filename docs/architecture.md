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
