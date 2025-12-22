## Generate Quote Specification and Quote

```
Generate quote specification and quote for client [CLIENT_NAME] with meeting date [MM.DD]
```

**Purpose:**
Generate the quote-focused specification file with IA, features, and pricing. **This file should focus on pricing and cost breakdown rather than detailed feature descriptions.**

**Process:**
1. Find the client's folder (format: `YY_MM_CLIENT_NAME/`)
2. **Check for `note.md` file** in `quotes/[MM.DD]/` folder:
   - If `note.md` exists, read it first and prioritize its content
   - `note.md` content takes precedence over all other sources when there are conflicts
   - Use `note.md` as the primary source for corrections, clarifications, or additional context
3. Read the following files:
   - `quotes/[MM.DD]/guide.md` (required, created in first step)
   - **ALL** `meeting_scripts/[MM.DD]/requirements.md` files (required, with REQ IDs) - 모든 미팅의 requirements.md 읽기
   - `meeting_scripts/[MM.DD]/summary.md` (required, especially section 2 for budget)
   - `quotes/[MM.DD]/ia_structure.md` (should exist from previous step)
   - `quotes/*.md` files (previous quotes for reference)
   - `appendix/requirements.md` (**REQUIRED if exists** - must be read and reflected, **must be checked for REQ IDs**)
   - `appendix/*.md` files (optional, for additional reference materials)
3. **REQ ID 리뷰 및 검증**:
   - 모든 미팅의 requirements.md에서 모든 REQ ID 추출
   - **appendix/requirements.md가 있는 경우, 반드시 해당 파일에서도 REQ ID 추출 및 검증 (필수)**
   - 각 REQ ID가 specification에 포함되었는지 확인
   - 포함되지 않은 REQ ID가 있으면 추가
   - 제외된 REQ ID는 Section 9에 명시
   - 기능이 늘어나거나 줄어드는 경우 견적 재계산
4. **견적 기준 결정** (guide.md Section 6.2 참고):
   - 현실적인 견적 계산 (모든 REQ 반영)
   - 협의된 견적과 비교
   - **현실적인 견적 > 협의된 견적인 경우**: 높은 견적을 기준으로 작성
   - **현실적인 견적 ≤ 협의된 견적인 경우**: 협의된 견적 또는 현실적인 견적 중 낮은 금액 기준
5. Analyze and create:
   - Visual site map (reference from ia_structure.md)
   - Integrated specification table with pricing focus
   - Total cost summary (견적 기준에 맞춰 조정)
   - Excluded requirements (if any, with separate pricing)
6. Create `specification_and_quote.md` file in `quotes/[MM.DD]/` folder

**IMPORTANT:**
- **`note.md` takes priority**: If `note.md` exists in `quotes/[MM.DD]/` folder, it must be read first and its content takes precedence over all other sources
- **`appendix/requirements.md` is REQUIRED**: If `appendix/requirements.md` exists, it must be read and reflected (not optional), and must be checked for REQ IDs
- `requirements.md` must have REQ IDs assigned
- `guide.md` must exist (created in first step) - reference for team composition and timeline
- **REQ ID 리뷰 필수**: 모든 미팅의 requirements.md 파일과 appendix/requirements.md 파일을 읽어 모든 REQ ID가 포함되었는지 확인
- **기능 포함/제외 검증**: 각 REQ ID가 specification에 포함되었는지 또는 제외 섹션에 명시되었는지 확인
- **견적 조정**: 기능이 늘어나거나 줄어드는 경우 견적을 변경
- **현실적인 견적 기준**: guide.md의 Section 6.2에서 현실적인 견적이 협의된 견적보다 높은 경우, 높은 견적을 기준으로 작성
- **기능 포함 원칙**: 왠만한 기능은 모두 포함 (고객사가 필요한 것만 선택하도록)
- **Focus on pricing and cost breakdown**, not detailed feature descriptions
- **Man-months are for internal calculation only** - DO NOT show man-months or man-month rate to client
- Only show final prices (₩X,XXX,XXX) in client-facing documents
- If requirements exceed budget, list them as excluded with separate pricing
- If `specification_and_quote.md` already exists, it will be overwritten

---

## Output Format

The file must follow this exact structure:

```markdown
## 7) Integrated Specification (IA + Feature + Price)

(Visual Site Map의 그룹 순서대로 테이블 생성)

### Group 01. [그룹명]

| IA ID | Screen Name | Linked Requirements (REQ ID) | Feature Description (기능 상세) | Est. Price |
|-------|-------------|------------------------------|--------------------------------|------------|
| IA-001 | [화면명] | [REQ-XXX, REQ-YYY] | [FEAT-번호]. [기능명]<br>- [상세 구현 내용 1]<br>- [상세 구현 내용 2] | ₩X,XXX,XXX |
| IA-002 | [화면명] | [REQ-XXX] | [FEAT-번호]. [기능명]<br>- [상세 구현 내용] | ₩X,XXX,XXX |

*(모든 그룹에 대해 위 테이블 반복)*

## 8) Total Cost Summary

**총 금액(견적): ₩XX,XXX,XXX KRW (VAT 별도)**

**세부 내역:**
- Group 01: ₩X,XXX,XXX
- Group 02: ₩X,XXX,XXX
- Group 03: ₩X,XXX,XXX
- **합계**: ₩XX,XXX,XXX

## 9) (선택) 제외된 요구사항

### Group 01. [그룹명]

| IA ID | Screen Name | Linked Requirements (REQ ID) | Feature Description (기능 상세) | Est. Price |
|-------|-------------|------------------------------|--------------------------------|------------|
| IA-XXX | [화면명] | [REQ-XXX, REQ-YYY] | [FEAT-번호]. [기능명]<br>- [상세 구현 내용] | ₩X,XXX,XXX |

*(모든 그룹에 대해 위 테이블 반복)*

**제외 항목 총액: ₩X,XXX,XXX KRW (VAT 별도)**
```

---

## Pricing Guidelines

### Man-Month Pricing Standard (Internal Use Only)
- **Base rate**: ₩6,500,000 per man-month (맨먼스 기준)
- **All pricing calculations must use this standard**: Est. Price = Man-Months × ₩6,500,000
- **Man-month estimation**: Estimate development effort in man-months for each screen/feature
- **⚠️ CRITICAL: Man-months and man-month rate are for AI calculation only**
- **DO NOT display man-months or rate in client-facing documents**
- **Only show final prices** (₩X,XXX,XXX) to the client
- **Internal calculation**: Use man-months × ₩6,500,000, but only show the result

### Man-Month Estimation Guidelines

#### Simple Features (0.2-0.5 MM)
- Basic CRUD operations
- Simple forms with validation
- Standard list/detail views
- Basic authentication screens
- Simple settings pages

#### Medium Features (0.5-1.0 MM)
- Complex forms with business logic
- Multi-step workflows
- Integration with external APIs
- Reports with data aggregation
- Role-based access control

#### Complex Features (1.0-2.0 MM)
- Complex business logic implementation
- Real-time features
- Advanced data processing
- Complex integrations
- Custom algorithms

#### Very Complex Features (2.0+ MM)
- AI/ML features
- Complex data analytics
- Enterprise integrations
- Custom frameworks
- Performance-critical systems

### Budget Alignment
- **견적 기준 결정** (guide.md Section 6.2 참고):
  - 현실적인 견적 계산: 모든 REQ 반영하여 맨먼스 합산 × ₩6,500,000
  - 협의된 견적 확인: summary.md Section 2에서 협의된 견적 확인
  - **현실적인 견적 > 협의된 견적인 경우**: 
    - ✅ 높은 견적(현실적인 견적)을 기준으로 작성
    - ✅ 왠만한 기능은 모두 포함 (고객사가 필요한 것만 선택하도록)
    - ✅ 견적 금액: 현실적인 견적 제시
    - ✅ 협의된 견적과의 차이 명시
  - **현실적인 견적 ≤ 협의된 견적인 경우**: 
    - ✅ 협의된 견적 또는 현실적인 견적 중 낮은 금액 기준
    - ✅ 협의된 견적 범위 내에서 최대한 많은 기능 포함
- **Calculate total man-months**: Sum all man-months and multiply by ₩6,500,000
- **REQ ID 리뷰 후 견적 조정**: 기능이 늘어나거나 줄어드는 경우 견적 재계산
- **Scope to budget**: 현실적인 견적 기준으로 작성하되, 고객사가 선택할 수 있도록 기능 명시

### Pricing Strategy
- **Estimate man-months first**: Based on complexity and development effort
- **Then calculate price**: Man-Months × ₩6,500,000
- **Group similar features**: Bundle related features for efficiency
- **Consider development effort**: Time and resources required
- **Reference previous quotes**: Maintain consistency with past pricing

### Feature Description (Quote-Focused)
- **Keep descriptions concise**: Focus on what affects pricing
- **Highlight complexity factors**: What makes it expensive/cheap
- **Mention technical considerations**: That impact cost
- **Reference REQ IDs**: Link back to requirements
- **Include man-month estimate**: Show development effort estimation

### Cost Breakdown
- **Group-level subtotals**: Show cost per group (₩X,XXX,XXX)
- **Total summary**: 
  - Total Cost: ₩XX,XXX,XXX
  - VAT separate
  - **Do NOT show man-months or calculation formula to client**
- **Excluded items**: If any, show separately with total price only

---

## IA ID Assignment

- Format: `IA-XXX` where XXX is a 3-digit number (e.g., IA-001, IA-002)
- Sequential numbering across all groups
- Each screen gets a unique IA ID
- IA IDs should match the order in Visual Site Map

---

## REQ ID 리뷰 및 검증 프로세스

### 0. note.md 우선 확인 (최우선)
- **`quotes/[MM.DD]/note.md` 파일이 있는 경우 반드시 먼저 읽기** (최우선 순위)
- `note.md`의 내용이 다른 모든 소스보다 우선순위가 높음
- `note.md`에 명시된 요구사항, 수정사항, 추가사항을 반드시 반영
- `note.md`와 다른 파일 간 충돌이 있는 경우 `note.md` 내용을 우선 적용

### 1. 모든 REQ ID 수집
- 모든 미팅의 `meeting_scripts/[MM.DD]/requirements.md` 파일 읽기
- **`appendix/requirements.md` 파일이 있는 경우 반드시 읽기** (필수, 상세 요구사항 참조)
- 각 파일에서 모든 REQ ID 추출 (REQ-XXX 형식)
- REQ ID 목록 작성 (예: REQ-101, REQ-102, REQ-201, REQ-202 등)
- **appendix/requirements.md에 있는 추가 요구사항도 확인하여 누락된 REQ ID가 없는지 검증**

### 2. REQ ID 포함 여부 확인
- specification_and_quote.md의 Section 7 (Integrated Specification)에서 각 REQ ID가 포함되었는지 확인
- 포함되지 않은 REQ ID가 있으면:
  - 해당 기능을 specification에 추가
  - 견적 재계산 (맨먼스 추가)
- 제외된 REQ ID는 Section 9에 명시

### 3. 견적 조정
- 기능이 늘어난 경우: 추가된 기능의 맨먼스만큼 견적 증가
- 기능이 줄어든 경우: 제외된 기능의 맨먼스만큼 견적 감소
- 총 견적 재계산: 모든 맨먼스 합산 × ₩6,500,000

### 4. 견적 기준 적용
- guide.md Section 6.2의 견적 적정성 평가 결과 확인
- 현실적인 견적 > 협의된 견적인 경우: 높은 견적 기준으로 작성
- 현실적인 견적 ≤ 협의된 견적인 경우: 협의된 견적 또는 현실적인 견적 중 낮은 금액 기준

## Example

```
Generate quote specification and quote for client 세빛넥스 with meeting date 12.01
```

This will:
1. Find client folder: `25_10_세빛넥스/`
2. **Check for `note.md`** in `quotes/12.01/` folder (if exists, read first and prioritize)
3. Read **ALL** requirements.md files:
   - `meeting_scripts/11.06/requirements.md` (REQ-101~149)
   - `meeting_scripts/12.01/requirements.md` (REQ-201~231)
   - `appendix/requirements.md` (**REQUIRED if exists** - must be read and reflected)
4. **REQ ID 리뷰**: 모든 REQ ID가 specification에 포함되었는지 확인 (appendix/requirements.md 포함, note.md 우선 반영)
4. Read guide.md for quote adequacy assessment
5. Reference ia_structure.md for IA structure
6. **견적 기준 결정**: 현실적인 견적 vs 협의된 견적 비교
7. Create quote-focused specification with pricing (기능 포함 원칙: 왠만한 기능은 모두 포함)
8. Create `quotes/12.01/specification_and_quote.md`

**Key Focus:**
- **REQ ID 완전성**: 모든 REQ ID가 포함되었는지 확인
- **견적 조정**: 기능 증감에 따른 견적 변경
- **현실적인 견적 기준**: 높은 견적을 기준으로 작성
- **기능 포함 원칙**: 왠만한 기능은 모두 포함
- Pricing and cost breakdown
- Clear cost structure
- Excluded items if any (with separate pricing)

