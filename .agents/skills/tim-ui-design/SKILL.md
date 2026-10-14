---
name: tim-ui-design
description: "Reusable project UI/UX design workflow for Codex and Claude Code. Apply automatically on UI redesign, page creation, layout, visual polish, mobile/responsive, forms, dashboard, interactive elements, accessibility and styling requests. Do not activate for logic-only or backend-only tasks."
---
# Tim UI Design Skill V1

## When to use
Automatically on 美化、介面、UI、UX、頁面設計、響應式、手機版、桌機版、按鈕、卡片、表格、圖表、表單、互動設計、配色、字型等前端體驗修改。Use `/tim-ui-design` in Claude Code or select `tim-ui-design` in Codex when explicit invocation is helpful.

## Workflow
1. First read `README.md` and repository documents, existing code, layout, styles, design assets, package.json, and `docs/UI_DESIGN_SYSTEM.md`. Project-approved layout and content always take priority over this generic guide.
2. Learn which screen/device matters, the user's key decision, important data states and current UI. Plan primary/secondary information hierarchy; preserve existing functionality.
3. For major redesigns, propose up to three meaningful visual directions with realistic coded or visual previews **if available**. For small polish work, choose the best scoped solution.
4. Implement using the project's **current** framework and native components: plain HTML projects remain plain HTML unless explicitly authorized; React/Vite projects reuse existing packages. If `frontend-design` or `web-design-guidelines` Skill exists in this repo, combine rather than override it.
5. Test at 390px mobile, 768px tablet and 1440px desktop (plus 320px edge case if relevant). Avoid sideways overflow, keep touch targets >=44px, contrast legible, keyboard focus and `prefers-reduced-motion`; use text labels in addition to colors. Audit empty/loading/error/stale states.
6. Run existing lint, test and build when executable. Report actual checks, branch/PR and exact publish status. Do not claim screenshot QA without screenshots.

## Safety
- A UI-only task must not alter business logic, calculations, schedules, Firebase/Firestore schemas, API, authentication, permissions, persistence, exchange rates, navigation semantics, or data source precedence.
- Do not send project files/private data to unapproved third-party design services.
- Superdesign, Better Design, Design Taste, Motion Primitives and component libraries are reference/options ONLY; none is automatically installed by this Skill. New dependencies/installations require explicit approval.
- Work in a feature branch when implementing; do not auto-merge or deploy unless the current user request authorizes it.
- This Skill is design guidance, not runtime JavaScript; it does not install any browser plug-in or alter the live website on its own.
