# 8-2. UI/UX 계획 구체화

## Overview
8-1 명세를 기반으로 화면별 UX를 확정합니다. 핵심은 “예쁜 문서”가 아니라 **구현에 필요한 UI 규칙(레이아웃/상태/피드백/에러/반응형)**을 빠르게 정리하는 것입니다.

## Steps
1. `docs/features/FXX_기능명_spec.md`의 핵심 Flow 1~3개를 선정합니다.
2. 각 Flow에 대해 “사용자 행동 → 화면 요소 → 피드백”을 3~7줄로 정리합니다.
3. 화면별로 다음을 확정합니다.
   - 주요 UI 블록(헤더/필터/본문/푸터)
   - 상태(loading/empty/error)
   - 피드백(toast/inline error)
   - 반응형에서 바뀌는 규칙(컬럼 수, 스택 등)
4. `docs/features/FXX_기능명_ui_ux.md`를 작성/갱신합니다.
5. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 사용자 Flow가 명확하고 화면 요소로 연결되는가?
- [ ] empty/loading/error 상태가 빠지지 않았는가?
- [ ] 재사용 컴포넌트 중심으로 설계했는가?
- [ ] 모바일에서 동작 규칙이 정의됐는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Output (생성/갱신 문서 예시)
생성해야 하는 문서: `docs/features/FXX_기능명_ui_ux.md`

```markdown
# F03: 근로자 관리 - UI/UX

## 1. User Flow
### Flow: 근로자 등록
- 목록(/business/workers)에서 [등록] 클릭 → 등록 폼으로 이동
- 필수값 누락 시: 필드 하단 인라인 에러 표시
- 저장 성공 시: Toast(성공) 후 목록으로 이동

## 2. 화면별 구성
### /business/workers (목록)
- 상단: PageHeader(제목/CTA)
- 중단: SearchBar(검색/필터)
- 본문: DataTable(목록)
- 상태:
  - loading: 테이블 스켈레톤
  - empty: EmptyState + CTA

## 3. 반응형 규칙
- Mobile: 테이블 → 카드 리스트(또는 가로 스크롤)

## 4. 피드백/에러
- 저장 성공: Toast success(3s)
- 저장 실패: Toast error(5s) + 재시도 안내
```
