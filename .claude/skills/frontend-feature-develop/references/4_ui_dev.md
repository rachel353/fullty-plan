---
name: 4_ui_dev
description: 2-3단계 결과를 바탕으로 라우팅, Feature 컴포넌트, UI를 실제로 구현한다.
---

# Step 4: UI 개발

## 역할
진짜 UI 코드 만드는 단계. 실제로 집 짓기.

## Input
- 2단계 출력물 (UI/UX 계획)
- 3단계 출력물 (타입/더미데이터)

## 수행 작업

1. **라우팅**: `app/.../page.tsx` 생성/갱신
2. **Feature 컴포넌트**: `components/feature/...` 구현
3. **데이터 연결**: 더미데이터로 렌더링 확인
4. **상태 처리**: loading/empty/error UI

## 파일 구조

```
app/
  (route)/
    page.tsx           # 라우트 진입점

components/
  feature/
    FeatureName/
      index.tsx        # Feature 컴포넌트
      FeatureList.tsx  # 목록
      FeatureForm.tsx  # 폼
```

## 구현 규칙

1. **TypeScript 타입 필수**
2. **Props 인터페이스 정의**
3. **기존 UI 컴포넌트 재사용 우선**
4. **상태 처리 포함** (loading/empty/error)

## 예시

```tsx
// app/(dashboard)/entities/page.tsx
import { EntityList } from '@/components/feature/Entity';
import { dummyEntities } from '@/lib/dummy-data/entities';

export default function EntitiesPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Entities</h1>
      <EntityList entities={dummyEntities} />
    </div>
  );
}
```

```tsx
// components/feature/Entity/EntityList.tsx
interface EntityListProps {
  entities: Entity[];
  isLoading?: boolean;
}

export function EntityList({ entities, isLoading }: EntityListProps) {
  if (isLoading) return <Skeleton />;
  if (entities.length === 0) return <EmptyState />;

  return (
    <ul>
      {entities.map(entity => (
        <EntityItem key={entity.id} entity={entity} />
      ))}
    </ul>
  );
}
```

## Checklist
- [ ] 라우트에서 페이지가 정상 렌더링됨
- [ ] 목록/폼/상세 등 핵심 화면 존재
- [ ] empty/loading/error UI 존재
- [ ] 모바일에서 레이아웃 안 깨짐
