---
name: 3_schema_mock
description: API 완성 전에도 FE 개발이 가능하도록 타입, 더미 데이터, Mock API를 준비한다.
---

# Step 3: Schema & Mock Data

## 역할
"어떤 정보를 다룰지" 정의하고 테스트용 샘플 만드는 단계. 가구 목록 정하고 종이 박스로 배치해보기.

## Input
- 1단계 출력물 (Entity/API 정의)
- `docs/conceptual_model.md`

## 수행 작업

1. **타입 정의**: `types/*.ts`에 Entity 인터페이스 생성
2. **더미 데이터**: `lib/dummy-data/*.ts`에 샘플 데이터 생성
3. **(필요시) Mock API**: `lib/api/*-api.ts`에 adapter 추가
4. **(필요시) conceptual_model.md 갱신**

## Output

### 타입 정의 (`types/entity.ts`)
```typescript
export interface Entity {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
}
```

### 더미 데이터 (`lib/dummy-data/entities.ts`)
```typescript
import { Entity } from '@/types/entity';

export const dummyEntities: Entity[] = [
  { id: '1', name: 'Sample 1', status: 'active', createdAt: '2024-01-01' },
  { id: '2', name: 'Sample 2', status: 'inactive', createdAt: '2024-01-02' },
];

// 빈 상태 테스트용
export const emptyEntities: Entity[] = [];
```

## 더미 데이터 케이스

다양한 상태 커버:
- **정상**: 일반적인 데이터 2-5개
- **빈 상태**: 빈 배열
- **에러 케이스**: 비활성, 만료 등

## Checklist
- [ ] 화면이 요구하는 필드가 타입에 모두 존재
- [ ] 더미 데이터가 빈 상태/비활성 등 다양한 케이스 커버
- [ ] (필요시) Mock API가 CRUD 흐름 커버
