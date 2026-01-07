# 독자 코어 Feature Execution Plan

## Overview
쟈근친구들 V2 프로젝트의 "독자 코어" feature 남은 14개 태스크 실행 계획

## Current Status
- **Completed**: task-009(Auth Layout), task-025~028(Home, StoryBanner/Card/List), task-038(Story Service)
- **In Progress**: task-004(TypeScript 타입 정의) - episode.ts, creator.ts 추가 필요
- **Pending**: 14 tasks

---

## Execution Order (사용자 선택: Explore/Search 페이지 먼저)

### Step 1: Explore & Search Pages (의존성 없음, 즉시 구현 가능)

| Task | Title | File | Complexity |
|------|-------|------|------------|
| task-029 | Explore Page | `jyageunfriends/app/(auth)/explore/page.tsx` | Medium |
| task-030 | Search Page | `jyageunfriends/app/(auth)/search/page.tsx` | Medium |

**Required Hooks:**
- `jyageunfriends/hooks/useExplore.ts` - 카테고리별 스토리 목록
- `jyageunfriends/hooks/useSearch.ts` - 검색 기능

**Features:**
- Explore: 카테고리 필터, 정렬 옵션, StoryList 재사용
- Search: 검색 입력, 실시간 결과, 검색 히스토리

---

## Remaining Phases (Step 1 이후)

### Phase 0: TypeScript Types (BLOCKING)
> task-004 완료 필수 - 9개 이상의 태스크가 이에 의존

| File | Types to Create |
|------|-----------------|
| `jyageunfriends/types/episode.ts` | `EpisodeStatus`, `Episode`, `EpisodeContent`, `EpisodeCardData` |
| `jyageunfriends/types/creator.ts` | `CreatorProfile`, `CreatorDetailData` |
| `jyageunfriends/types/index.ts` | Export 추가 |

---

### Phase 1: Services (병렬 가능)

| Task | Title | File | Complexity |
|------|-------|------|------------|
| task-039 | Episode Service | `jyageunfriends/services/episodeService.ts` | Medium |
| task-092 | Creator Service | `jyageunfriends/services/creatorService.ts` | Medium |

**Methods to implement:**
```
episodeService: getEpisodesByStoryId, getEpisodeById, getNextEpisode, getPrevEpisode
creatorService: getCreatorById, getStoriesByCreator, getCreatorDetail
```

---

### Phase 2: Base Components (5개, 모두 병렬 가능)

| Task | Title | File | Complexity |
|------|-------|------|------------|
| task-033 | EpisodeCard | `jyageunfriends/components/episode/EpisodeCard.tsx` | Low |
| task-036 | ContentRenderer | `jyageunfriends/components/episode/ContentRenderer.tsx` | Medium |
| task-037 | ActionBar | `jyageunfriends/components/episode/ActionBar.tsx` | Low |
| task-090 | CreatorProfile | `jyageunfriends/components/creator/CreatorProfile.tsx` | Low |
| task-091 | CreatorStoryList | `jyageunfriends/components/creator/CreatorStoryList.tsx` | Low |

---

### Phase 3: Composite Components (2개, 병렬 가능)

| Task | Title | File | Dependencies | Complexity |
|------|-------|------|--------------|------------|
| task-034 | EpisodeList | `jyageunfriends/components/episode/EpisodeList.tsx` | task-033 | Low |
| task-032 | StoryDetail | `jyageunfriends/components/story/StoryDetail.tsx` | - | Medium |

**Note**: task-032에 작가 정보 클릭 시 `/creators/[creatorId]` 링크 포함 필수

---

### Phase 4: Pages (5개)

#### Group A (의존성 없음, 먼저 구현 가능)
| Task | Title | File | Complexity |
|------|-------|------|------------|
| task-029 | Explore Page | `jyageunfriends/app/(auth)/explore/page.tsx` | Medium |
| task-030 | Search Page | `jyageunfriends/app/(auth)/search/page.tsx` | Medium |

#### Group B (Phase 3 완료 후)
| Task | Title | File | Dependencies | Complexity |
|------|-------|------|--------------|------------|
| task-031 | Story Detail Page | `jyageunfriends/app/(auth)/stories/[storyId]/page.tsx` | task-032, task-034, task-039 | High |
| task-089 | Creator Detail Page | `jyageunfriends/app/(auth)/creators/[creatorId]/page.tsx` | task-090, task-091, task-092 | Medium |
| task-035 | Episode Viewer Page | `jyageunfriends/app/(auth)/stories/[storyId]/episodes/[episodeId]/page.tsx` | task-036, task-037, task-039 | High |

---

## Required Hooks (Pages와 함께 생성)

| Hook | File | Used By |
|------|------|---------|
| useExplore | `jyageunfriends/hooks/useExplore.ts` | Explore Page |
| useSearch | `jyageunfriends/hooks/useSearch.ts` | Search Page |
| useStory | `jyageunfriends/hooks/useStory.ts` | Story Detail Page |
| useEpisodes | `jyageunfriends/hooks/useEpisodes.ts` | Story Detail Page |
| useEpisode | `jyageunfriends/hooks/useEpisode.ts` | Episode Viewer Page |
| useCreator | `jyageunfriends/hooks/useCreator.ts` | Creator Detail Page |

---

## Execution Order Summary

```
Phase 0: task-004 (types) ─────────────────────────────────┐
                                                           │
Phase 1: task-039 + task-092 (services, parallel) ◄────────┘
              │
Phase 2: task-033, task-036, task-037, task-090, task-091 (components, all parallel)
              │
Phase 3: task-034 + task-032 (composite components, parallel)
              │
Phase 4A: task-029 + task-030 (pages, parallel) ◄──────────┐
Phase 4B: task-031, task-089, task-035 (pages) ◄───────────┘
```

---

## Reference Files (패턴 참고용)
- Types: [story.ts](jyageunfriends/types/story.ts)
- Services: [storyService.ts](jyageunfriends/services/storyService.ts)
- Components: [StoryCard.tsx](jyageunfriends/components/story/StoryCard.tsx)
- Hooks: [useHome.ts](jyageunfriends/hooks/useHome.ts)
- Pages: [home/page.tsx](jyageunfriends/app/(auth)/home/page.tsx)

---

## Total: 14 Tasks
- Phase 0: 1 task (types)
- Phase 1: 2 tasks (services)
- Phase 2: 5 tasks (base components)
- Phase 3: 2 tasks (composite components)
- Phase 4: 4 tasks (pages) + hooks
