# GEMINI.md

<project_context>
Minimal React 19 + TypeScript + Vite starter template based on [Bulletproof React](https://github.com/alan2207/bulletproof-react).
All code must adhere to unidirectional architecture boundaries, colocation, and behavior-driven testing.
</project_context>

<mandatory_gate name="styling_library_prompt">
**CRITICAL RULE — ASK BEFORE STYLING:**
No styling library is pre-installed in this template.
If a task involves styling, UI design, or creating styled components and no styling library has been chosen yet in `package.json`:
1. **STOP** before installing packages or writing CSS/styles.
2. **ASK the user** which styling library they want to use (e.g., Tailwind CSS, CSS Modules, Plain CSS, shadcn/ui, Emotion/styled-components, Mantine, etc.).
3. Only proceed with implementation after the user confirms their preference.
</mandatory_gate>

<architecture_rules>
## 1. Unidirectional Dependency Flow (`shared` → `features` → `app`)

Imports must strictly flow in one direction (enforced by ESLint `no-restricted-imports`):

- **Shared Layer (`src/components`, `src/hooks`, `src/lib`, `src/stores`, `src/types`, `src/utils`):**
  - May only import from other shared modules.
  - **FORBIDDEN:** Importing from `@/features/*` or `@/app/*`.
- **Feature Layer (`src/features/<feature-name>`):**
  - Self-contained domain slice containing `api/`, `components/`, `hooks/`, `types/`, and `components/__tests__/`.
  - May import from the Shared Layer (`@/components/*`, `@/lib/*`, etc.).
  - **FORBIDDEN:** Importing from `@/app/*` or from another feature (`@/features/<other-feature>/*`).
- **App Layer (`src/app`):**
  - Contains `routes/`, `router.tsx`, and `provider.tsx`.
  - Composes features and shared components into pages.

## 2. Code Organization & Imports
- Use the `@/*` path alias for imports across `src/` directories; use relative imports only within the same feature slice.
- Centralize all route URLs in `src/config/paths.ts` and environment variables in `src/config/env.ts` (never use `import.meta.env` directly in components).
- Wrap third-party libraries in `src/lib/` (e.g., `src/lib/api-client.ts`).
</architecture_rules>

<coding_standards>
## React & TypeScript Best Practices

- **Components:**
  - Use named exports for components and hooks.
  - Never declare a component inside another component's render body.
  - Prefer composition (`children`) over deep prop drilling or boolean prop explosion.
- **State & Effects:**
  - Compute derived values directly during render instead of syncing state with `useEffect`.
  - Keep state colocated to the narrowest component subtree that needs it.
  - Separate server data (`features/*/api/`), local UI state (`useState`), and URL state (`react-router`).
- **Testing:**
  - Unit/Integration: Use Vitest + React Testing Library via `@/testing/test-utils` (`npm run test`).
  - Query elements by accessibility role (`getByRole`, `findByRole`) and simulate interactions with `userEvent`.
  - Mock HTTP endpoints via MSW in `src/testing/mocks/handlers.ts`.
  - E2E: Place Playwright specs in `e2e/` (`npm run test:e2e`).
</coding_standards>

<verification_workflow>
Before completing any code change, run and pass:
1. `npm run typecheck`
2. `npm run lint`
3. `npm run test`
</verification_workflow>
