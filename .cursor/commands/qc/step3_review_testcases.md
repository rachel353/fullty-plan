# QC Step 3: Review Test Cases

## Overview
생성된 테스트케이스를 검토하고 누락된 케이스를 추가하여 테스트 커버리지를 보완합니다.

## Steps
1. 기존 테스트케이스 분석:
   - `docs/qc/testcases.json` 파일 읽기
   - 현재 커버리지 확인
2. 필수 체크리스트 검증:
   - **Authentication** (로그인, 회원가입, 로그아웃, 세션 만료 등)
   - **Input Fields** (Empty, Valid, Invalid, Limitation, Navigation)
   - **OTP Code** (Empty, Valid, Timeout, Resend, Navigation)
   - **Sent Mail (Flow)** (Valid, Resend, Direct URL 접근)
   - **Filter / Search** (Empty, Valid, Pagination, Combination, Navigation)
   - **Sent Mail (Content)** (Valid, Resend)
   - **Image** (Size, Align, Space)
   - **Text** (Font size, Font weight, Content)
   - **Create Content** (Normal text, Special character, Link, Image, Navigation)
   - **Navbar / Footer** (Active on all pages, Mobile, Logged / Unlogged, Change language, Themes, Logo)
   - **Sidebar** (First and last, "See all" 버튼)
   - **Dropdown** (Empty, Valid, Limitation, Navigation)
   - **Upload File** (Empty, Valid, Invalid, Limitation, Navigation)
   - **Navigation** (메뉴 링크, 딥링크, 404, 뒤로가기 등)
   - **Responsive** (데스크톱/태블릿/모바일 레이아웃)
   - **UI Components** (버튼, 모달, 토스트, 로딩, 스크롤 등)
   - **Form Processing** (필수 필드, 유효성 검증, 중복 제출 방지 등)
   - **Security** (권한, 데이터 보호, XSS, CSRF 등)
   - **Error Handling** (네트워크 오류, 서버 오류, 타임아웃 등)
3. 누락된 케이스 추가:
   - 체크리스트에서 누락된 항목을 testcases.json의 testCases 배열에 추가
   - 새 테스트케이스의 id는 기존 번호에 이어서 할당 (예: 기존이 TC-050까지면 TC-051부터)
   - 리뷰 코멘트는 notes 필드에 추가 가능
4. 테스트케이스 정렬:
   - Priority 순서로 정렬 (P0 → P1 → P2 → P3)
   - 동일 Priority 내에서는 id 순서로 정렬
5. testcases.json 업데이트:
   - meta.totalCases를 업데이트된 테스트케이스 수로 수정
   - meta.categories에 새로 추가된 카테고리가 있으면 추가
   - statistics는 변경하지 않음 (테스트 실행 시 업데이트)
6. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`

## Checklist
- [ ] 필수 체크리스트 검증 완료
- [ ] 누락된 케이스 추가 완료
- [ ] Priority 순서로 정렬 완료
- [ ] meta.totalCases가 업데이트되었는가?
- [ ] meta.categories가 업데이트되었는가?
- [ ] 각 테스트케이스 ID가 고유한가?
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?

