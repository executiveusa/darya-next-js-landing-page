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
