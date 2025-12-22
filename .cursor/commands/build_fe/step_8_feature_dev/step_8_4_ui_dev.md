# 8-4. UI 개발

## Overview
8-2/8-3 결과를 바탕으로 기능 UI를 구현합니다. 이 문서는 “코드 예시 모음”이 아니라 **무슨 파일을 만들고 어떤 순서로 확인할지**를 안내하는 커맨드입니다.

## Steps
1. 라우팅 파일(app router)을 생성/갱신합니다. (`src/app/.../page.tsx`)
2. Feature 컴포넌트를 생성/갱신합니다. (`src/components/feature/...`)
3. Composite/UI 컴포넌트는 가능한 재사용하고, 필요 시 최소 단위로 추가합니다.
4. 화면에 더미데이터를 연결해 렌더링을 확인합니다.
5. 인터랙션은 단계에 맞게 처리합니다.
   - UI-only 단계라면: handler는 stub/console 수준
   - Mock API가 준비됐다면: adapter를 통해 호출
6. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 지정된 라우트에서 페이지가 정상 렌더링되는가?
- [ ] 목록/폼/상세 등 핵심 화면이 모두 존재하는가?
- [ ] empty/loading/error UI가 최소 수준으로라도 존재하는가?
- [ ] 모바일(좁은 너비)에서 레이아웃이 깨지지 않는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?
