# Step 5: IA + Logical Architecture 통합 (1~2p 인덱스/매핑표)

## Overview
`docs/ia.md`(화면/라우트)와 `docs/logical_architecture.md`(컴포넌트 구조)를 연결해 **화면 → 컴포넌트/훅 매핑 인덱스**를 만듭니다.
목표는 “장문 설계서”가 아니라 **1~2페이지 분량의 빠른 참조표(인덱스)**이며, Step 6(파일 구조/라우팅 설계)의 입력으로 사용됩니다.

## Steps
1. `docs/ia.md`에서 **MVP/우선순위가 높은 화면(라우트) 3~7개**만 뽑아 정렬합니다.
2. `docs/logical_architecture.md`에서 사용할 수 있는 **Composite/Feature 컴포넌트와 Hooks** 후보를 확인합니다.
3. `docs/integration.md`를 “인덱스”로 작성/갱신합니다. 각 화면은 **5~10줄 내**로만 적습니다.
   - 화면 경로(라우트)
   - 주요 UI 블록(키워드만)
   - 사용 Component(Composite vs Feature 이름만)
   - 사용 Hook/데이터 의존성(이름만)
4. **매트릭스(요약표)**로 “공통 Composite 재사용”과 “화면별 Feature”만 한눈에 보이게 합니다.
5. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] `docs/integration.md`가 **1~2페이지 분량(짧은 인덱스)**인가? (장문 금지)
- [ ] **MVP 핵심 화면(최소 3개)**은 매핑되어 있는가?
- [ ] 컴포넌트가 **Feature/Composite**로 일관되게 분류되어 있는가?
- [ ] 화면별로 **Hook/데이터 의존성(이름만)** 이 누락되지 않았는가?
- [ ] 매트릭스에서 **공통 Composite 재사용**과 **화면별 Feature**가 구분되어 보이는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Output (생성/갱신 문서 예시)
생성해야 하는 문서: `docs/integration.md`

```markdown
# IA + Logical Architecture 통합 (Integration)

> 목적: 화면(라우트) 기준으로 “무슨 Feature/Composite/Hook이 필요한지”를 **빠르게 찾는 인덱스**  
> 원칙: 각 화면 섹션은 **최대 10줄**, 이 문서는 **1~2페이지**로 유지

## 1) 화면 → 구성요소 인덱스 (MVP 우선)

### /business/workers (근로자 목록)
- **UI 블록**: PageHeader / SearchBar / WorkerList / Pagination
- **Composite**: PageHeader, SearchBar, DataTable, Pagination
- **Feature**: WorkerList
- **Hooks/데이터**: useWorker(목록/필터), (선택) usePagination

---

## 2) 매트릭스(요약)
| Route | Feature(대표) | PageHeader | DataTable | FormField | 주요 Hooks |
|---|---|:---:|:---:|:---:|---|
| /business/workers | WorkerList | ✅ | ✅ |  | useWorker |
| /business/workers/new | WorkerForm | ✅ |  | ✅ | useWorker |

---

## 3) 재사용 포인트(1~3줄 메모)
- PageHeader는 대부분의 페이지에서 재사용
- DataTable은 “목록형 화면”에서 재사용
```

