# 8-1. 개발 명세 구체화

## Overview
현재 기능을 구현 가능한 단위로 쪼개서 **요구사항(AC) → 화면 범위 → 데이터/API → 컴포넌트/훅**까지 한 문서로 확정합니다.

## Steps
1. 현재 기능(FXX)과 관련 User Story/AC를 확정합니다. (`docs/user_stories.md`)
2. 기능에 포함되는 화면(라우트)을 나열합니다. (`docs/ia.md`, `docs/integration.md`)
3. 필요한 Entity/API(모킹 기준)와 에러 케이스를 정리합니다.
4. 만들 컴포넌트(Feature)와 재사용할 컴포넌트(Composite/UI), 필요한 Hook을 정리합니다.
5. `docs/features/FXX_*_spec.md`를 작성/갱신합니다.
6. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] AC가 모두 “구현 방법/검증 방법”에 매핑되어 있는가?
- [ ] 화면 범위(라우트)가 명확한가?
- [ ] API(또는 Mock API) 목록이 누락 없이 정의됐는가?
- [ ] 컴포넌트/훅 전략이 Step 5(integration)와 충돌하지 않는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Output (생성/갱신 문서 예시)
생성해야 하는 문서: `docs/features/FXX_기능명_spec.md`

```markdown
# F03: 근로자 관리 - 개발 명세

## 1. Goal
사업장 관리자가 근로자를 등록/조회/수정할 수 있다.

## 2. Requirements
### 관련 User Story
- US-001 근로자 등록

### Acceptance Criteria
| AC | 내용 | 구현(초안) | 검증(초안) |
|---|---|---|---|
| AC-1 | 필수 정보 입력 가능 | WorkerForm | 폼 필수값 체크 |
| AC-2 | 신분증 업로드 가능 | FileUploader | 파일 선택 UI 확인 |

## 3. Screens
| 화면 | 경로 | 핵심 기능 |
|---|---|---|
| 목록 | /business/workers | 검색/필터/목록 |
| 등록 | /business/workers/new | 폼 입력/제출 |

## 4. Data & API (Mock)
| Method | Endpoint | 설명 |
|---|---|---|
| GET | /api/workers | 목록 |
| POST | /api/workers | 등록 |

## 5. Components & Hooks
- Feature: WorkerList, WorkerForm
- Composite: PageHeader, DataTable, FormField
- Hooks: useWorker

## 6. Test Focus
- [ ] 목록 렌더링
- [ ] 등록 폼 필수값/에러
```
