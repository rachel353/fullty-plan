# CLAUDE-FE-DEV.md

This file provides guidance to Claude Code (claude.ai/code) when working on frontend development in this repository. Customize sections based on your specific project setup.

## Commands
```bash
# Typical commands - adjust based on your project
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Linting
npm run test     # Run tests
npm run type-check  # TypeScript check
```

## Tech Stack
Update this section with your project's technology choices:

**Example (Next.js + React):**
- Next.js 14 (App Router), React 19, TypeScript
- TanStack Query or SWR (data fetching), Zustand or Redux (state)
- Tailwind CSS or CSS-in-JS (styling), Icon library (Lucide, Heroicons, etc.)

## Project Structure

Update folder names and descriptions to match your project layout:

```
your-project/
├── app/                 # [Next.js] App Router or pages directory
├── components/          # Reusable React components (organize by feature or domain)
├── pages/               # [Optional] Page components
├── hooks/               # Custom React hooks
├── services/            # API services, data fetching logic
├── stores/              # State management (Zustand, Redux, Context, etc.)
├── types/               # TypeScript type definitions
├── styles/              # Global styles, CSS modules
├── lib/                 # Utility functions, helpers
├── constants/           # App constants, config
└── public/              # Static assets
```

## Code Patterns

Define and document your project's patterns:

**Service/API:**
```typescript
export const xxxService = {
  async method(): Promise<Type> { /* implementation */ }
}
```

**Hook:** Returns data, loading, and error states
```typescript
export function useXxx() {
  // Implement with TanStack Query, SWR, or custom logic
  return { data, isLoading, isError }
}
```

**Component:** Follows component best practices
- Use `'use client'` for client components (Next.js)
- PascalCase naming
- Use utility functions for classnames (e.g., `cn()` from clsx)

**Page:**
- Uses custom hooks for data fetching
- Implements loading states/skeletons
- Responsive layout patterns

## Type Definitions

Document key TypeScript types in your project:

```typescript
// Example pattern
export type DataItem = {
  id: string
  title: string
  // Add your specific fields
}

export type DataCategory = 'category1' | 'category2'
export type SortOption = 'newest' | 'popular'
```

## Important Notes

- Always check `@docs` folder for additional project documentation
- Follow existing code patterns in the codebase
- Run linting and type-check before committing
- Update this file when adding new patterns or significant structural changes

