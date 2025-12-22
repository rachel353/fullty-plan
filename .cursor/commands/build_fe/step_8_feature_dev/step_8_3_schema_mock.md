# 8-3. Schema & Mock Data

## Overview
API가 완성되지 않아도 FE 개발이 진행되도록 **타입/스키마 + 더미 데이터 + (필요 시) Mock API Adapter**를 준비합니다. 이 단계의 목표는 “정교함”이 아니라 **일관된 형태로 화면 개발이 가능**하게 만드는 것입니다.

## Steps
1. 8-1 명세의 Entity/필드를 확인합니다.
2. (필요 시) `docs/conceptual_model.md`에 Entity/관계/제약을 간단히 추가/갱신합니다.
3. 타입 정의를 정리합니다. (프로젝트 규칙에 맞는 파일에 추가)
4. `lib/dummy-data/*.ts`에 최소 5~10개의 샘플 데이터를 준비합니다.
5. 화면에서 “CRUD 흐름”이 필요하면 `lib/api/*-api.ts` 형태로 Mock adapter를 추가합니다.
6. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 화면이 요구하는 필드가 타입/더미데이터에 모두 존재하는가?
- [ ] 더미데이터가 빈 상태/비활성/에러 등 다양한 케이스를 커버하는가?
- [ ] (필요 시) Mock API가 목록/상세/생성/수정/삭제 흐름을 커버하는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Output (예시)
문서 생성이 필요한 경우(예: conceptual model 누적 업데이트)는 아래 형태로 최소 기록을 남깁니다.

```markdown
### Worker (근로자)
- 속성: id, name, phone, status, createdAt
- 관계: Business 1 : N Worker
- 제약: phone unique
- 사용 화면: /business/workers, /business/workers/new
```
