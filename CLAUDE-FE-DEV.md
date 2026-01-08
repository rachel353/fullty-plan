# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
```

## Tech Stack
- Next.js 14 (App Router), React 19, TypeScript
- TanStack Query (server state), Zustand (client state)
- Tailwind CSS 4, Lucide React icons

## Project Structure
```
jyageunfriends/
├── app/(auth)/          # Authenticated routes (home, explore, search, stories, creators)
├── app/(public)/        # Public routes (login, signup)
├── components/          # React components by domain (story/, episode/, layout/, auth/)
├── hooks/               # Custom hooks (useHome, useExplore, useSearch)
├── services/            # Mock API services (storyService, etc.)
├── stores/              # Zustand stores (authStore, uiStore)
├── types/               # TypeScript types (user.ts, story.ts)
└── lib/                 # Utilities (cn, formatInk, queryClient)
```

## Code Patterns

**Service**: `export const xxxService = { async method(): Promise<Type> {...} }`

**Hook**: TanStack Query wrapper returning `{ data, isLoading, isError }`

**Component**: `'use client'` directive, PascalCase, `cn()` for classnames

**Page**: Uses custom hooks, skeleton loading, `max-w-3xl` container

## Type References
- `StoryCardData`: id, title, thumbnailUrl, creatorName, totalBackingAmount, category?
- `StoryCategory`: romance | fantasy | action | drama | comedy | thriller | slice_of_life
- `StorySortOption`: popular | latest | backing | views

