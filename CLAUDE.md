# CLAUDE.md

This project follows the [Bulletproof React](https://github.com/alan2207/bulletproof-react) architecture. Keep solutions minimal, modular, and strictly typed.

## First Step: Styling Library Check

- **No styling library is installed by default.**
- Before writing CSS, installing UI packages, or building styled components, **ask the user which styling solution they want to use** (e.g., Tailwind CSS, CSS Modules, Vanilla CSS, shadcn/ui, Emotion/styled-components, Mantine, etc.) unless already configured in `package.json`.

## Architecture & Import Rules

Code flows strictly in one direction: **`shared` → `features` → `app`**.

```text
src/
├── app/          # Routes, router.tsx, provider.tsx (imports from features & shared)
├── features/     # Domain modules: api/, components/, hooks/, stores/, types/
├── components/   # Shared UI only (used by 2+ features; no business logic)
├── config/       # Typed env vars (env.ts) & route paths (paths.ts)
├── hooks/        # Shared hooks
├── lib/          # Configured libraries & wrappers (e.g., api-client.ts)
├── stores/       # Global stores
├── testing/      # Vitest setup, MSW server/handlers, custom render
├── types/        # Shared TypeScript types
└── utils/        # Pure helper functions
```

- **No cross-feature imports:** A feature in `src/features/<feature-a>` must never import from `src/features/<feature-b>`. Compose them at the `src/app/routes/*` level instead.
- **Keep features self-contained:** Colocate feature-specific `api/`, `components/`, `hooks/`, `types/`, and `__tests__/` inside `src/features/<feature-name>/`.
- **Promote to shared only when reused:** Keep components/hooks in a feature folder until needed by multiple features.
- **Path aliases:** Always use `@/*` for cross-folder imports from `src/` (e.g., `@/components/...`, `@/lib/api-client`).

## Clean React & TypeScript Guidelines

- **Components:**
  - Prefer small, single-responsibility functional components with named exports (use default exports only where required by lazy route loading).
  - Avoid nested inline component definitions (`const SubComponent = () => ...` inside another component).
  - Limit props; use composition (`children` or slots) instead of deep prop drilling.
- **State Management:**
  - Keep state as close to where it is used as possible.
  - Separate **server cache state** (API requests in `features/*/api/`) from **UI/client state** (`useState`/`useReducer` or stores) and **URL state** (`react-router` params/searchParams).
  - Do not mirror props or derived values in `useState` + `useEffect`; compute derived values during render.
- **API & Third-Party Libraries:**
  - Never call raw `fetch` inside components. Use the centralized `@/lib/api-client` via request functions in `src/features/<feature>/api/`.
  - Wrap third-party libraries in `src/lib/` so they can be swapped or configured in one place.
  - Read environment variables exclusively from `@/config/env`—never reference `import.meta.env` directly in components.
- **Error Handling:**
  - Wrap route/feature trees in `ErrorBoundary` (`react-error-boundary`) and handle API errors explicitly.
- **Testing:**
  - Test user-visible behavior, not implementation details.
  - Query DOM elements by accessible roles/labels (`getByRole`, `getByLabelText`) using `@/testing/test-utils`.
  - Mock network requests with MSW (`src/testing/mocks/handlers.ts`), not by mocking fetch/axios internals.

## Commands

- `npm run dev` — Start dev server (`http://localhost:3000`)
- `npm run typecheck` — TypeScript check (`tsc --noEmit`)
- `npm run lint` — ESLint (enforces unidirectional import boundaries)
- `npm run test` — Run Vitest unit/integration suite
- `npm run test:e2e` — Run Playwright E2E suite
- `npm run build` — Production build check
