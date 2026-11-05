# React Template

Minimal React starter template structured around [Bulletproof React](https://github.com/alan2207/bulletproof-react).

## Tech Stack

- **Core:** React 19, TypeScript, Vite, React Router
- **Testing:** Vitest, React Testing Library, MSW, Playwright
- **Quality:** ESLint, Prettier, Husky, lint-staged

## Quick Start

```bash
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start local Vite dev server |
| `npm run build` | Typecheck and build for production |
| `npm run preview` | Preview production build locally |
| `npm run typecheck` | Run TypeScript compiler checks |
| `npm run lint` | Run ESLint (includes architecture boundary checks) |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit/integration tests with Vitest |
| `npm run test:e2e` | Run end-to-end tests with Playwright |

## Project Structure

```text
src/
├── app/          # Application layer: router, global providers, route pages
├── assets/       # Static assets (images, fonts, global styles)
├── components/   # Shared UI components used across multiple features
├── config/       # Environment variables (env.ts) and route path constants
├── features/     # Self-contained feature modules (api, components, hooks, types)
├── hooks/        # Shared custom hooks
├── lib/          # Pre-configured third-party libraries (e.g., api-client)
├── stores/       # Global client state stores
├── testing/      # Test setup, custom render, and MSW mocks
├── types/        # Shared TypeScript definitions
└── utils/        # Pure shared utility functions
e2e/              # Playwright end-to-end tests
```

### Architecture Flow

Imports flow strictly in one direction (`shared` → `features` → `app`):

1. **`src/{components,hooks,lib,stores,types,utils}`** cannot import from `features` or `app`.
2. **`src/features/*`** cannot import from `app` or across other features.
3. **`src/app/*`** composes features and shared modules into routes.
