# Generate Quote IA Structure

## Overview
시각적 사이트맵을 트리 형식으로 포함한 IA 구조 파일을 생성합니다. 화면 이름만 포함하며 기능 목록은 포함하지 않습니다.

## Steps
1. 클라이언트 폴더 찾기 (`YY_MM_CLIENT_NAME/`)
2. `quotes/[MM.DD]/note.md` 확인 (존재 시 최우선)
3. 필수 파일 읽기:
   - `quotes/[MM.DD]/guide.md` (필수)
   - `meeting_scripts/[MM.DD]/requirements.md` (REQ IDs 포함)
   - `meeting_scripts/[MM.DD]/summary.md` (필수)
   - 이전 견적서 파일들
   - `appendix/requirements.md` (존재 시 필수)
4. 플랫폼 유형 결정 (웹, 모바일 웹, 네이티브 앱, 웹뷰)
5. IA 구조 생성:
   - 플랫폼 정의 섹션을 최상단에 추가
   - 화면 이름만 나열 (기능 설명 제외)
   - 사용자 유형별 루트 구조 생성
6. `quotes/[MM.DD]/ia_structure.md` 생성 (기존 파일 덮어쓰기)

## Output Format

파일은 다음 구조를 따라야 합니다:

```markdown
## 6) Visual Site Map (Structure)

### 플랫폼 정의

**서비스 플랫폼:**
- [웹 / 모바일 웹 / 네이티브 모바일 앱 / 웹뷰 기반 모바일 앱]
- [플랫폼별 상세 설명]
- [모바일만 별도 기능이 필요한 경우]: 별도 서비스로 분리하여 명시

**사용자 유형별 플랫폼:**
- **[사용자 유형 1]**: [웹 / 모바일 지원 여부 / 별도 앱 제작 여부 등]
- **[사용자 유형 2]**: [웹 / 모바일 지원 여부 / 별도 앱 제작 여부 등]

**플랫폼별 기능 차이:**
- 웹: [웹에서 제공되는 기능]
- 모바일: [모바일에서 제공되는 기능]

전체 서비스의 메뉴 구조를 텍스트 트리 형태로 시각화. 3~4개의 논리적 그룹으로 묶어서 표현할 것

```text
📦 Service Root 1 (사용자 유형 1)
├─ 01. Group Name
│   ├─ 🏠 Screen Name
│   └─ 🏠 Screen Name
│
└─ 02. Group Name
    └─ 🏠 Screen Name

📦 Service Root 2 (사용자 유형 2)
├─ 01. Group Name
│   └─ 🏠 Screen Name
│
└─ 02. Group Name
    └─ 🏠 Screen Name
```
```

**중요 사항:**
- 플랫폼 정의는 반드시 최상단에 위치
- 화면 이름만 나열 (기능 설명 제외)
- REQ ID는 포함하지 않음
- 사용자 유형별로 별도 루트 구조 생성

## Checklist
- [ ] note.md가 읽혔는가? (존재 시)
- [ ] 플랫폼 유형이 결정되었는가?
- [ ] 플랫폼 정의 섹션이 최상단에 포함되었는가?
- [ ] 화면 이름만 포함되었는가? (기능 목록 제외)
- [ ] 사용자 유형별 루트가 생성되었는가?
- [ ] ia_structure.md가 올바른 구조로 생성되었는가?
