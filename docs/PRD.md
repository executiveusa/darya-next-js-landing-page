# Synthia 3.0 Frontend PRD

## Goal
Deliver a bilingual landing page and an admin dashboard for Synthia 3.0 using React 18, Vite, Tailwind, shadcn/ui, GSAP, Radix, and high-contrast accessibility patterns.

## Personas
- **Automation Director** – Evaluates landing, books BMAD interview, reviews demos.
- **Platform Operator** – Uses admin to manage agents, monitor runs, run CloudFlow templates, and configure connectors.

## User Journeys
1. Discover Synthia capabilities on the landing page, review template categories, and schedule a BMAD call.
2. Navigate to the admin console, manage agents, inspect CloudFlow runs, route models, and launch workflows via the Claude Code IDE.
3. Explore template library from both marketing site and admin.

## Requirements Summary
- High-contrast dark neon aesthetic aligned with Synthia tokens.
- WCAG AA compliant interactions with keyboard reachability.
- GSAP animation on hero content.
- Cloud Code chat IDE with CloudFlow workflow launcher and YAML upload.
- Model router status dashboard and request log feed.
- Rube MCP connector management with quick start instructions.
- Documentation, Dockerfile, and CI ready for deployment.

## Non-Goals
- Building backend services for Claude Code, CloudFlow, or Rube MCP.
- Implementing authentication flows beyond IAP role configuration UI.

## Success Metrics
- Lighthouse LCP < 2.5s and CLS < 0.1 (monitored via CI audit hooks).
- Complete coverage of admin sections with accessible UI.
- Template library accessible from both marketing and admin experiences.
# Synthia-3.0 Frontend Product Requirements Document

## Overview
Synthia-3.0 delivers a bilingual marketing site and operational console for orchestrating AI-driven delivery teams. The frontend is implemented with Next.js and Tailwind CSS, integrates GSAP animations, and surfaces administration tools that pair with the Lemon AI backend orchestrator. Experiences adhere to Krug-style heuristics, Synthia visual rules, and WCAG AA accessibility.

## Goals
- Present Synthia-3.0 as a premium automation partner through a neon dark-glass visual language.
- Capture prospective client requirements via the BMAD voice intake workflow and schedule interviews.
- Provide administrators with dashboards for agent lifecycle management, observability, and deployment controls.
- Ship a maintainable mono-repo frontend package with automated QA, documentation, and containerization.

## Personas
1. **Prospective Client** – explores the landing page, reviews proof points, and books BMAD interviews.
2. **Delivery Operator** – manages agents, reviews runs, and promotes deployments from the admin dashboard.
3. **Executive Stakeholder** – monitors KPIs, cost controls, and audit reports from observability views.

## User Journeys
- Landing page visitor scrolls through hero, proof grid, process explanation, template gallery, pricing, and CTA, ultimately scheduling an interview.
- Admin user signs in, surveys dashboard KPIs, inspects agent runs, and promotes a candidate revision to production.
- Operator reviews BMAD intake artifacts stored as PRD JSON, triggers template generation, and audits accessibility results.

## Functional Requirements
- **Internationalization:** Provide English and Spanish content with instant toggle, ensuring component-level translations.
- **Scheduling:** Embed a widget that POSTs to `/backend/api/interview/start` to initialize BMAD calls.
- **Template Catalogue:** Surface curated component templates sourced from the `/templates` archive.
- **Admin Navigation:** Dashboard, Agents, Runs, Deployments, Observability, Settings with contextual breadcrumbs and one primary CTA per page.
- **Observability KPIs:** Visualize latency, error, cost, and usage with charts and integrate external Cloud Logging/Trace links.
- **Security:** Hide admin routes until authentication is established (placeholder guards documented for follow-up implementation).

## Non-Functional Requirements
- WCAG AA contrast, keyboard navigation, screen-reader friendly labels, and focus outlines.
- Lighthouse LCP < 2.5s, CLS < 0.1 with Playwright MCP regression audits.
- Deterministic builds packaged via Docker and deployable to Google Cloud Run or local Compose targets.
- Comprehensive documentation in `/docs` and Storybook coverage for the component library.

## Success Metrics
- ≥ 3 minute session duration on landing page hero-to-CTA path.
- ≥ 50% conversion from CTA to scheduled interview.
- ≤ 5% error rate on agent runs monitored daily.
- Automated CI pipeline completes lint, build, and Playwright MCP suite in under 12 minutes.

## Open Questions
- Authentication integration method (Google IAP vs. custom identity provider).
- Exact scheduling provider for BMAD voice agent (Calendly, Cal.com, or bespoke voice service).
- Data retention policy for PRD JSON artifacts and templates.

