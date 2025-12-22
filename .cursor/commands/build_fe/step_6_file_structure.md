# Step 6: 전체 File Structure & Routing 설계

## Overview
Step 5의 화면-컴포넌트 매핑을 바탕으로 **프로젝트 디렉터리 구조**와 **라우팅(Next.js App Router)**을 확정해 개발이 바로 시작 가능한 “구조 청사진”을 만듭니다.

## Steps
1. `docs/ia.md`의 화면(라우트) 목록을 기준으로 **Route Group**(예: `(auth)`, `(admin)`, `(business)`, `(worker)`)을 확정합니다.
2. `docs/integration.md`를 참고해 페이지가 사용하는 컴포넌트가 들어갈 위치(`components/ui|composite|feature|layout`)를 확정합니다.
3. 아래 항목이 포함되도록 `docs/file_structure.md`를 작성/갱신합니다.
   - “최소” 디렉터리 트리(핵심만) + 확장 규칙
   - 라우팅 표(경로/권한/설명)
   - 네이밍/컨벤션(파일/폴더/Hook/API)
4. 권한 체크 기준(예: Middleware/서버 컴포넌트 가드 등)을 “한 문단 요약”으로 정리합니다.
5. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 라우팅 표가 `docs/ia.md`와 **불일치 없이** 매핑되어 있는가?
- [ ] 컴포넌트 분류(`ui/composite/feature/layout`)가 Step 4/5와 충돌하지 않는가?
- [ ] 동적 라우트(예: `[id]`, `[date]`) 규칙이 명확한가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

## Output (생성/갱신 문서 예시)
생성해야 하는 문서: `docs/file_structure.md`

```markdown
# File Structure & Routing

## 1. 디렉터리 구조(요약)
{project}/
├── docs/
│   ├── ia.md
│   ├── logical_architecture.md
│   ├── integration.md
│   ├── file_structure.md
│   └── dev_plan.md
└── src/
    ├── app/
    │   ├── (auth)/login/page.tsx
    │   ├── (business)/workers/page.tsx
    │   └── (worker)/attendance/page.tsx
    ├── components/
    │   ├── ui/
    │   ├── composite/
    │   ├── feature/
    │   └── layout/
    ├── hooks/
    ├── lib/
    └── middleware.ts

## 2. 라우팅(권한 포함)
| Route | Group | 권한 | 설명 |
|---|---|---|---|
| /login | (auth) | public | 로그인 |
| /business/workers | (business) | business | 근로자 목록 |
| /worker/attendance | (worker) | worker | 출퇴근 기록 |

## 3. 컨벤션
- Component: `kebab-case.tsx`
- Hook: `use-*.ts`
- API adapter: `*-api.ts`
```

