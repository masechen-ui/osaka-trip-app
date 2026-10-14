# UI Design System V1 (project-adaptive)

This file sets design process guardrails rather than replacing approved product aesthetics.

## Principles
- Task-first layout. Above the fold: what the user needs to do or decide next. Secondary data below or expandable.
- Typography: clear Traditional Chinese labels, 14–16px readable body baseline and deliberate heading levels; avoid 12px for critical content.
- Color: reuse repository's existing palette or actual brand colors. Semantic success / warning / failure require labels as well as colors.
- Components: coherent spacing rhythm (8px increments), touch >=44px, clear selected/hover/focus/disabled states, restrained corners/shadows.
- Responsive: verify 390px, 768px, 1440px. Avoid awkward tiny tables, overlapping controls and unintended horizontal scrolling. 
- Accessibility: semantic headings, keyboard focus, proper control labels, WCAG AA contrast goal, reduced motion.
- Performance: no Canvas shaders, heavy scroll effects, novelty cursor, 3D or animation dependencies by default.

## Preserving application correctness
Keep data source priority, computation, schedules, user content, authentication, privacy, external API and persistence intact for UI-only tasks. Never mistake missing data for zero or fabricate results.

## Deliverable workflow
Inspect existing UI and requirements -> propose appropriate design -> prototype if practical -> implement with existing components in branch -> verify functionality and responsive layouts -> PR/review -> deploy only when authorized.

## Optional inspirations
Superdesign (explore alternatives); Better Design (systems); Design Taste (typography and hierarchy); Impeccable (visual critique); UI Layouts and Motion Primitives (selective elements). These are not installed or required. 
