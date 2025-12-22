## Generate Quote IA Structure

```
Generate quote IA structure for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Purpose:**
Generate the IA (Information Architecture) structure file with visual site map in tree format. **Screen names only - no feature lists under screens.**

**Process:**
1. Find the client's folder (format: `YY_MM_CLIENT_NAME/`)
2. **Check for `note.md` file** in `quotes/[MM.DD]/` folder:
   - If `note.md` exists, read it first and prioritize its content
   - `note.md` content takes precedence over all other sources when there are conflicts
   - Use `note.md` as the primary source for corrections, clarifications, or additional context
3. Read the following files:
   - `quotes/[MM.DD]/guide.md` (required, created in first step)
   - `meeting_scripts/[MM.DD]/requirements.md` (required, with REQ IDs)
   - `meeting_scripts/[MM.DD]/summary.md` (required)
   - `quotes/*.md` files (previous quotes for reference)
   - `appendix/requirements.md` (**REQUIRED if exists** - must be read and reflected)
   - `appendix/*.md` files (optional, for additional reference materials)
3. Analyze requirements to create IA structure:
   - **First, determine platform type** from guide.md, requirements.md, and summary.md:
     - Check if it's web, mobile web, native mobile app, or webview-based app
     - Check if mobile has separate features that require separate service
     - Check if webview is used
   - **Add platform definition section at the top** before the tree structure
   - Organize screens into 3-4 logical groups
   - List screen names only (no feature descriptions)
   - Create tree structure
4. Create `ia_structure.md` file in `quotes/[MM.DD]/` folder

**IMPORTANT:**
- **`note.md` takes priority**: If `note.md` exists in `quotes/[MM.DD]/` folder, it must be read first and its content takes precedence over all other sources
- **`appendix/requirements.md` is REQUIRED**: If `appendix/requirements.md` exists, it must be read and reflected (not optional)
- `guide.md` must exist (created in first step) - reference for prioritization
- `requirements.md` must have REQ IDs assigned (for reference, but not displayed in IA)
- **Platform definition must be at the top**: Add platform definition section before the tree structure
- **Screen names only**: Do NOT include feature lists under screen names (no "- Feature 1", "- Feature 2", etc.)
- **Do not include REQ IDs** in the IA structure output
- **Platform type determination**: Check guide.md, requirements.md, and summary.md to determine platform type (web, mobile web, native app, webview)
- **Separate service for mobile**: If mobile has separate features that differ significantly from web, treat it as a separate service
- Organize into 3-4 logical groups based on guide.md priorities
- Use tree structure format
- Feature descriptions will be provided in specification_and_quote.md, not in IA structure
- If `ia_structure.md` already exists, it will be overwritten

---

## Output Format

The file must follow this exact structure:

```markdown
## 6) Visual Site Map (Structure)

### 플랫폼 정의

**서비스 플랫폼:**
- [웹 / 모바일 웹 / 네이티브 모바일 앱 / 웹뷰 기반 모바일 앱]
- [플랫폼별 상세 설명]
  - 웹: [반응형 웹 / 데스크톱 전용 웹 등]
  - 모바일: [네이티브 앱 / 웹뷰 기반 앱 / 모바일 웹 등]
  - 웹뷰 사용 시: [웹뷰로 사용하는 경우 명시]
- [모바일만 별도 기능이 필요한 경우]: 별도 서비스로 분리하여 명시

**사용자 유형별 플랫폼:**
- **[사용자 유형 1]**: [웹 / 모바일 지원 여부 / 별도 앱 제작 여부 등]
- **[사용자 유형 2]**: [웹 / 모바일 지원 여부 / 별도 앱 제작 여부 등]
- **[사용자 유형 3]**: [웹 / 모바일 지원 여부 / 별도 앱 제작 여부 등]
- [각 사용자 유형별 특이사항 명시]

**플랫폼별 기능 차이:**
- 웹: [웹에서 제공되는 기능]
- 모바일: [모바일에서 제공되는 기능]
- [플랫폼별 차이점이 있는 경우 상세 설명]

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

📦 Service Root 3 (공통)
├─ 01. Group Name
│   └─ 🏠 Screen Name
│
└─ 02. Group Name
    └─ 🏠 Screen Name
```
```

---

## IA Structure Guidelines

### Platform Definition (플랫폼 정의)
- **플랫폼 정의는 반드시 최상단에 위치**: Visual Site Map 트리 구조 이전에 플랫폼 정의 섹션을 먼저 작성
- **플랫폼 유형 명시**:
  - 웹: 반응형 웹 / 데스크톱 전용 웹 / 모바일 웹 등
  - 모바일: 네이티브 모바일 앱 (iOS/Android) / 웹뷰 기반 모바일 앱 / 모바일 웹 등
  - 웹뷰 사용 시: 웹뷰로 사용하는 경우 명시 (예: "웹뷰 기반 모바일 앱 (웹 콘텐츠를 앱 내에서 표시)")
- **사용자 유형별 플랫폼 명시 (필수)**:
  - 각 사용자 유형(사업장, 근로자, 노무법인 등)별로 플랫폼 정보를 명시
  - 예: "사업장 (담당자): 웹 (모바일 지원 안 함, 데스크톱 전용)"
  - 예: "근로자: 웹 (모바일 지원), 앱 별도 제작 (네이티브 모바일 앱)"
  - 각 사용자 유형별 특이사항 명시 (모바일 지원 여부, 별도 앱 제작 여부 등)
- **모바일만 별도 기능이 필요한 경우**: 별도 서비스로 분리하여 명시
  - 예: "모바일 전용 기능이 필요한 경우, 별도 서비스로 분리 (예: 모바일 앱 전용 기능)"
- **플랫폼별 기능 차이 명시**:
  - 웹에서 제공되는 기능과 모바일에서 제공되는 기능이 다른 경우 상세 설명
  - 각 플랫폼별 접근 가능한 화면 및 기능 명시
  - 사용자 유형별로 다른 플랫폼을 사용하는 경우 각각 명시
- **참고 자료 확인**:
  - `guide.md`의 기술 스택 섹션 참고
  - `requirements.md`의 플랫폼 관련 요구사항 참고
  - `summary.md`의 Scope 섹션 참고

### Logical Grouping
- **Group 01**: Public/Authentication (공통/인증)
  - Landing, Login, Signup, Policy pages
- **Group 02**: Core Features (핵심 기능)
  - Main business logic screens
  - User role-specific screens
- **Group 03**: Management (관리)
  - Admin screens
  - Settings, Configuration
- **Group 04**: Reports/Analytics (보고서/분석) - if applicable
  - Dashboard, Reports, Analytics

### Screen Names
- **Screen names only**: List only screen names, no feature descriptions
- **Do not include feature lists** under screen names (no "- Feature 1", "- Feature 2", etc.)
- **Do not include REQ IDs** in the IA structure
- Screen names should be clear and descriptive
- Feature descriptions will be provided in specification_and_quote.md, not here

### Tree Structure
- Use emoji icons (🏠 for screens)
- Use proper indentation
- Show hierarchy clearly
- Use text code block format

### User Role Consideration
- **Multiple roots for different user types**: If the service has different user types (e.g., 사업장, 근로자, 노무법인, 세무법인, 세빛넥스 어드민), create separate root structures for each user type
- **Role-specific screens**: Each user type should have their own root (📦) showing only the screens they can access
- **Common screens**: Screens accessible by all users should be in a separate "공통" root
- **Permission-based access**: The structure should clearly show which screens are available to which user types
- **User type labeling**: Each root should be labeled with the user type (e.g., "📦 사업장", "📦 근로자", "📦 노무법인", "📦 공통")
- **Feature differentiation**: Same screen name may appear in different roots with different features based on user permissions

---

## Example

```
Generate quote IA structure for client 세빛넥스 with meeting date 12.01
```

This will:
1. Find client folder: `25_10_세빛넥스/`
2. Read requirements.md (with REQ IDs)
3. Create IA structure with screen features
4. Create `quotes/12.01/ia_structure.md`

**Example Output Structure (Multiple Roots for Different User Types):**

```markdown
## 6) Visual Site Map (Structure)

### 플랫폼 정의

**서비스 플랫폼:**
- 웹: 반응형 웹 (데스크톱 및 모바일 디바이스 지원)
- 모바일: 모바일 웹 (반응형 웹의 모바일 최적화 버전)
- 웹뷰: 웹뷰 사용 안 함 (별도 네이티브 앱 없음)

**사용자 유형별 플랫폼:**
- **사업장 (담당자)**: 웹 (모바일 지원 안 함, 데스크톱 전용)
- **근로자**: 웹 (모바일 지원), 앱 별도 제작 (네이티브 모바일 앱)
- **노무법인 담당자**: 웹 (모바일 지원)
- **세무법인 담당자**: 웹 (모바일 지원)
- **세빛넥스 어드민**: 웹 (모바일 지원 안 함, 데스크톱 전용)
- **공통**: 웹 (모바일 지원)

**플랫폼별 기능 차이:**
- 웹: 모든 기능 제공 (근로계약서 작성, 근태 관리, 임금 정산 등 전체 기능)
- 모바일 웹: 핵심 기능만 제공 (결제 정보, 회원 가입, 근태 스케줄 승인, 근퇴 현황 조회, 근로계약서 발송, 명세서 조회)
- 모바일 앱 (근로자 전용): 근로자 핵심 기능 제공 (근태 입력, 명세서 조회, 푸시 알림 등)
- 모바일에서 제외되는 기능: 문서 작업, 직접 입력, 수정 사항 반영 (업데이트, 데이터 삭제 등)

전체 서비스의 메뉴 구조를 텍스트 트리 형태로 시각화. 사용자 유형별로 루트를 구분하여 표현

```text
📦 사업장 (담당자)
├─ 01. 근로계약서 및 근태 관리
│   ├─ 🏠 근로계약서 작성
│   ├─ 🏠 근무 스케줄 관리
│   └─ 🏠 근태 승인
│
└─ 02. 관리 및 설정
    ├─ 🏠 사업장 관리
    └─ 🏠 계정 설정

📦 근로자
├─ 01. 근태 관리
│   ├─ 🏠 근태 입력 및 확인
│   └─ 🏠 임금명세서 조회
│
└─ 02. 관리 및 설정
    └─ 🏠 계정 설정

📦 노무법인 담당자
├─ 01. 근태 및 임금 관리
│   ├─ 🏠 근태 확정
│   └─ 🏠 임금대장 관리
│
└─ 02. 관리 및 설정
    └─ 🏠 노무법인 관리

📦 세무법인 담당자
├─ 01. 임금 데이터 조회
│   └─ 🏠 세무법인 데이터 조회
│
└─ 02. 관리 및 설정
    └─ 🏠 세무법인 관리

📦 세빛넥스 어드민
├─ 01. 전체 관리
│   ├─ 🏠 전체 사업장 관리
│   └─ 🏠 전체 사용자 관리
│
└─ 02. 시스템 관리
    ├─ 🏠 시스템 설정
    └─ 🏠 로그 관리

📦 공통
├─ 01. 공통 및 인증
│   ├─ 🏠 로그인
│   ├─ 🏠 회원가입
│   └─ 🏠 공통 정책 페이지
│
└─ 02. 공통 기능
    └─ 🏠 비밀번호 찾기
```
```

**Example 2: 웹뷰 기반 모바일 앱이 있는 경우**

```markdown
### 플랫폼 정의

**서비스 플랫폼:**
- 웹: 반응형 웹 (데스크톱 및 모바일 디바이스 지원)
- 모바일: 웹뷰 기반 모바일 앱 (iOS/Android, 웹 콘텐츠를 앱 내에서 표시)
- 웹뷰 사용: 웹뷰로 사용 (네이티브 앱이 웹 콘텐츠를 로드하여 표시)

**사용자 유형별 플랫폼:**
- **사업장 (담당자)**: 웹 (모바일 지원 안 함, 데스크톱 전용)
- **근로자**: 웹 (모바일 지원), 웹뷰 기반 모바일 앱 (iOS/Android)
- **노무법인 담당자**: 웹 (모바일 지원)
- **세무법인 담당자**: 웹 (모바일 지원)
- **세빛넥스 어드민**: 웹 (모바일 지원 안 함, 데스크톱 전용)
- **공통**: 웹 (모바일 지원), 웹뷰 기반 모바일 앱 (근로자 전용)

**플랫폼별 기능 차이:**
- 웹: 모든 기능 제공
- 모바일 (웹뷰): 웹과 동일한 기능 제공 (웹뷰를 통해 웹 콘텐츠 접근)
```

**Example 3: 네이티브 모바일 앱이 별도로 있는 경우**

```markdown
### 플랫폼 정의

**서비스 플랫폼:**
- 웹: 반응형 웹 (데스크톱 및 모바일 디바이스 지원)
- 모바일 앱: 네이티브 모바일 앱 (iOS/Android, 별도 개발)
- 웹뷰 사용: 웹뷰 사용 안 함 (네이티브 앱으로 별도 개발)

**사용자 유형별 플랫폼:**
- **사업장 (담당자)**: 웹 (모바일 지원 안 함, 데스크톱 전용)
- **근로자**: 웹 (모바일 지원), 네이티브 모바일 앱 별도 제작 (iOS/Android)
- **노무법인 담당자**: 웹 (모바일 지원)
- **세무법인 담당자**: 웹 (모바일 지원)
- **세빛넥스 어드민**: 웹 (모바일 지원 안 함, 데스크톱 전용)
- **공통**: 웹 (모바일 지원), 네이티브 모바일 앱 (근로자 전용)

**플랫폼별 기능 차이:**
- 웹: 모든 기능 제공
- 모바일 앱 (근로자 전용): 핵심 기능만 제공 (별도 서비스로 분리)
  - 모바일 앱 전용 기능: 푸시 알림, 오프라인 모드, 생체 인증 등
  - 모바일 앱에서 제외되는 기능: 복잡한 문서 작업, 대량 데이터 입력 등
```

