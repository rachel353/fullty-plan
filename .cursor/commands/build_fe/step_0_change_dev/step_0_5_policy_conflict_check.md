# Step 0-5: 기존 정책/결정과 충돌 점검 (Policy Conflict Check)

## Overview
변경 반영 후, 기존 문서/정책(아키텍처/파일구조/연동/라우팅/권한)과 충돌이 없는지 점검하고, 미결정 사항(TBD) 때문에 개발이 BLOCKED 되지 않는지 확인합니다.

## Steps
1. 변경이 반영된 모듈 목록을 `docs/changes/YYYY-MM-DD.md`에서 확인합니다.
2. 아래 문서들과 충돌/불일치가 없는지 확인하고 필요한 경우 갱신합니다.
   - `docs/file_structure.md` (라우팅/폴더 구조/컨벤션)
   - `docs/integration.md` (화면-컴포넌트-훅 매핑, 데이터 의존성)
   - `docs/logical_architecture*` (책임/경계/레이어링)
   - `docs/user_stories.md` (AC 변경/추가/삭제 반영 필요 여부)
3. 권한/validation이 바뀐 변경이라면, 접근 제어 정책(가드/미들웨어 등)이 일관적인지 확인합니다.
4. 미결정(TBD)이 있거나 결정이 필요한 경우, `docs/decisions/tbd_registry.md`에 등록하고 `/decisions/check`로 BLOCKED 여부를 확인합니다.
5. 최종적으로 `docs/changes/YYYY-MM-DD.md`에 “충돌 점검 결과”와 후속 조치를 기록합니다.
6. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 문서 불일치(IA/Integration/File structure/Architecture)가 없는가?
- [ ] 권한/validation 정책이 일관적인가?
- [ ] TBD가 있다면 등록/해결/상태 확인 흐름이 연결되었는가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?


