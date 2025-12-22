# Create Cursor Command
 
## Overview
새로운 Cursor 커맨드를 생성합니다. 커맨드 생성 요청을 받으면 간단하고 명확한 구조로 작성합니다.
 
## 기본 템플릿
 
```markdown
# {Command Name}
 
## Overview
{1-2문장으로 목적 설명}
 
## Steps
1. {단계 1}
2. {단계 2}
3. {단계 3}
4. (변경사항이 생긴 경우) `git status` 확인 → `git add` → `git commit`
 
## Checklist (선택)
- [ ] 항목 1
- [ ] 항목 2
- [ ] (변경사항이 생긴 경우) 커밋까지 완료했는가?
```
 
## 작성 규칙
 
1. **파일명**: kebab-case (예: `review-code.md`)
2. **구조**: Overview → Steps → Checklist (선택)
3. **원칙**: 
   - 간단하고 명확하게
   - 실행 가능한 액션으로 작성
   - 특정 파일/프로젝트에 종속되지 않도록
    - 커맨드 실행 결과로 레포에 변경사항이 생기면 **반드시 add → commit**까지 포함 (Steps/Checklist에 명시)
 
## 생성 프로세스
 
1. 요청 이해 → 목적 파악
2. 파일명 결정 → kebab-case
3. 템플릿 기반으로 작성
4. `.cursor/commands/{command-name}.md` 생성
 
## 체크리스트
 
- [ ] 파일명이 kebab-case인가?
- [ ] Overview가 명확한가?
- [ ] Steps가 실행 가능한가?
- [ ] 간단하고 명확한가?
- [ ] (커맨드 실행 결과 변경사항이 있으면) 커밋 단계가 포함되어 있는가?