# User Stories

> 문서 목적: Litmers Admin v2의 모든 기능 요구사항을 User Story 형식으로 정리하여 이후 설계 및 개발, QC의 기준으로 사용한다.  
> 근거 문서: `docs/prd.md`, `docs/conceptual-model.md`

---

## Actors (역할 정의)

- **Admin/GA (General Affairs)**: 총무/관리 역할, 시스템 설정 및 직원 관리 담당
- **C-level**: 경영진, 최고 의사결정권자
- **Manager**: 관리자, 프로젝트/재무 전반 관리
- **PM (Project Manager)**: 프로젝트 매니저, 프로젝트 운영 및 일정 관리
- **Finance/Ops**: 재무/운영 담당, 계약/청구/수금 관리
- **Sales**: 영업 담당 (프로젝트/재무 관련 권한 포함)
- **Workforce Manager**: 리소스 매니저, 인력 배정 및 관리
- **Designer**: 디자이너, 작업 관리 및 태스크 수행
- **Developer**: 개발자, 작업 관리 및 태스크 수행
- **QA**: QA 담당, 작업 관리 및 태스크 수행

---

## Priority Guide

- **P0 (Critical)**: 핵심 기능, 시스템 필수 기능
- **P1 (High)**: 주요 기능, 주요 사용자 시나리오 지원
- **P2 (Medium)**: 보조 기능, 사용성 개선
- **P3 (Low)**: 추가 기능, 향후 확장

---

## User Stories

### Dashboard

#### US-001: 대시보드에서 전체 운영 현황을 1분 내 파악하기
**Priority**: P0

As a **PM/Manager/C-level**
I want to see a consolidated dashboard with key metrics and recent activities
So that I can quickly understand the overall operational status and identify any urgent issues

**Acceptance Criteria:**
- [ ] 대시보드에 프로젝트 진행 현황(stage별/지연 여부)이 표시된다
- [ ] 인력 가동률(배정/실투입 기반)이 시각화되어 표시된다
- [ ] 재무 요약(청구/수금/미수) 정보가 표시된다
- [ ] 최근 활동(프로젝트/재무/리소스 이벤트) 목록이 표시된다
- [ ] 위험/지연 영역 클릭 시 해당 모듈 목록으로 딥링크된다
- [ ] 모든 데이터는 1초 내 로드된다 (초기 목표)

---

### Client Management

#### US-002: 고객사 정보를 생성하고 관리하기
**Priority**: P0

As a **PM/Sales/Manager/C-level/GA**
I want to create and manage client information (corporate/individual)
So that I can track all customer relationships and connect them to projects and financial records

**Acceptance Criteria:**
- [ ] 법인 고객사 생성 시: 고객사명, 법인명, 대표자명, 사업자등록번호, 주소, 등기파일 입력이 가능하다
- [ ] 개인 고객사 생성 시: 고객사명, 개인명, 주민등록증 파일 입력이 가능하다
- [ ] 사업자등록번호 중복 검증이 수행된다
- [ ] 고객사 목록에서 법인/개인 구분이 명확히 표시된다
- [ ] 고객사명으로 검색이 가능하다
- [ ] C-level/GA/Manager/PM/Sales는 생성/수정/삭제가 가능하고, Designer/Developer/QA는 조회만 가능하다

#### US-003: 고객사 담당자(Manager) 정보를 관리하기
**Priority**: P1

As a **PM/Sales/Manager**
I want to manage contact information for client managers
So that I can easily communicate with the right people at each client

**Acceptance Criteria:**
- [ ] 고객사 상세 화면에서 담당자 목록을 조회할 수 있다
- [ ] 담당자 추가 시 이름, 직위, 전화번호, 이메일을 입력할 수 있다
- [ ] 이메일 형식 검증이 수행된다
- [ ] 고객사당 여러 담당자 등록이 가능하다
- [ ] 담당자 정보 수정 및 삭제가 가능하다

#### US-004: 고객사별 프로젝트 및 재무 정보를 탐색하기
**Priority**: P1

As a **PM/Manager/C-level**
I want to see all projects and financial records related to a specific client
So that I can understand the complete business relationship with that client

**Acceptance Criteria:**
- [ ] 고객사 상세 화면에서 연결된 프로젝트 목록이 표시된다
- [ ] 고객사 상세 화면에서 연결된 계약/청구 정보가 표시된다
- [ ] 프로젝트/재무 정보 클릭 시 해당 상세 화면으로 이동한다
- [ ] 고객사별 프로젝트 수 및 총 계약 금액 등 집계 정보가 표시된다

---

### Project Management

#### US-005: 프로젝트를 생성하고 기본 정보를 관리하기
**Priority**: P0

As a **PM/Manager**
I want to create projects and manage basic project information
So that I can track project lifecycles from initiation to completion

**Acceptance Criteria:**
- [ ] 프로젝트 생성 시 고객사 선택이 필수이다
- [ ] 프로젝트명, 현재 단계(ProjectStage), PM 지정이 필수 입력이다
- [ ] 디자이너, 개발자, QA 담당자를 복수 선택할 수 있다
- [ ] 예상 시작일/예상 종료일, 실제 시작일/실제 종료일을 입력할 수 있다
- [ ] 계약 유형, 개발 유형은 Settings에서 관리되는 목록에서 선택한다
- [ ] 총 가격 및 메모를 입력할 수 있다
- [ ] 프로젝트 목록에서 필터링(고객사, 단계, PM 등)이 가능하다

#### US-006: 프로젝트 단계(ProjectStage)를 관리하고 상태를 추적하기
**Priority**: P0

As a **PM**
I want to manage project stages and track status transitions
So that I can monitor project progress and ensure proper stage transitions

**Acceptance Criteria:**
- [ ] 프로젝트 단계는 PENDING/PLANNING/DESIGN/DEVELOPMENT/INTERNAL_QA/EXTERNAL_QA/MAINTENANCE/COMPLETED/PAUSED/CANCELLED 중 선택 가능하다
- [ ] 단계 변경 시 자동으로 ProjectHistory에 기록된다
- [ ] 프로젝트 상세 화면에서 현재 단계가 명확히 표시된다
- [ ] 단계 변경 시 실제 시작일/실제 종료일을 수정할 수 있다
- [ ] 완료(COMPLETED) 상태로 변경 시 ProjectReview 작성이 필수이다

#### US-007: 프로젝트 타임라인(ProjectTimeline)을 관리하고 지연을 모니터링하기
**Priority**: P1

As a **PM**
I want to manage project timeline for each stage and monitor delays
So that I can track schedule adherence and take corrective actions when needed

**Acceptance Criteria:**
- [ ] 각 단계(PLANNING/DESIGN/DEVELOPMENT/INTERNAL_QA/EXTERNAL_QA/MAINTENANCE)별 예상/실제 시작일/종료일을 입력할 수 있다
- [ ] 실제 종료일 입력 시 예상 종료일과 비교하여 지연 여부(-1: 단축/0: 정시/1: 지연)가 자동 계산된다
- [ ] 지연 발생 시 담당자 알림이 표시된다 (추후 구현)
- [ ] 타임라인 화면에서 모든 단계의 일정이 한눈에 보인다
- [ ] 지연된 단계는 시각적으로 구분되어 표시된다

#### US-008: 프로젝트 작업(WorkItem)을 생성하고 관리하기
**Priority**: P1

As a **PM/Manager**
I want to create and manage work items for a project
So that I can break down project work into manageable tasks and track progress

**Acceptance Criteria:**
- [ ] 프로젝트 상세 화면에서 작업 목록을 조회할 수 있다
- [ ] 작업 생성 시 제목(필수), 설명, 담당자, 시작일/종료일을 입력할 수 있다
- [ ] 작업 상태는 TODO/IN_PROGRESS/REVIEW/DONE/CANCELLED 중 선택 가능하다
- [ ] 예상 시간, 예상 비용, 실제 시간, 실제 비용을 입력할 수 있다
- [ ] 작업 완료 시 실제 시간 입력이 필수이다
- [ ] 상태 변경 시 담당자에게 알림이 표시된다 (추후 구현)
- [ ] C-level/Manager/PM만 작업 추가 버튼이 노출된다

#### US-009: 개발 태스크(DevTaskItem)를 관리하고 투입량을 추적하기
**Priority**: P1

As a **PM/Developer**
I want to manage development tasks and track time/effort allocation
So that I can monitor development progress and calculate costs accurately

**Acceptance Criteria:**
- [ ] 프로젝트당 하나의 DevTasks 그룹이 생성된다
- [ ] 개발 태스크 생성 시 항목명, 상태, 담당자, 시작일/종료일, 투입% 또는 예상 투입 시간을 입력할 수 있다
- [ ] 작업일수는 Settings의 MonthlyWorkday 기준으로 자동 계산된다 (주말/공휴일 제외)
- [ ] 투입 방식 선택(%, 시간)에 따라 예상 투입 시간이 자동 계산된다
- [ ] 실제 투입 시간은 일별 투입 기록의 합계로 자동 계산된다
- [ ] 예상/실제 투입 비용은 담당 Workforce의 시간당 레벨 비용(GradeLevel.hourlyLevelCost)을 기준으로 자동 계산된다
- [ ] 태스크 상태는 TODO/IN_PROGRESS/REVIEW/DONE/BLOCKED 중 선택 가능하다
- [ ] 태스크 완료율로 프로젝트 진행률이 계산된다

#### US-010: 프로젝트 히스토리(ProjectHistory)를 기록하고 관리하기
**Priority**: P1

As a **PM**
I want to record project history including calls, emails, notes, files, and status changes
So that I can maintain a complete audit trail of project activities

**Acceptance Criteria:**
- [ ] 히스토리 이벤트 유형(CALL/EMAIL/NOTE/FILE/STATUS_CHANGE)별로 기록할 수 있다
- [ ] 이벤트 제목, 내용, 참여자 리스트, 파일 첨부가 가능하다
- [ ] 단계 변경 시 자동으로 히스토리에 기록된다
- [ ] 히스토리 타임라인 화면에서 시간순으로 모든 이벤트를 조회할 수 있다
- [ ] 파일 첨부 시 저장 경로가 관리된다

#### US-011: 프로젝트 회고(ProjectReview)를 작성하고 저장하기
**Priority**: P2

As a **PM**
I want to write a project review upon completion
So that I can capture lessons learned and improve future projects

**Acceptance Criteria:**
- [ ] 프로젝트 완료(COMPLETED) 시 ProjectReview 작성이 필수이다
- [ ] 지연 여부, PM/디자이너/개발자/QA ID 리스트를 입력할 수 있다
- [ ] 가장 어려웠던 작업, 가장 쉬웠던 작업, 핵심 학습 내용, 고객 페인포인트, 개선사항을 입력할 수 있다
- [ ] 완료 프로젝트 목록에서 회고를 조회할 수 있다

#### US-012: 프로젝트 수익성 정보를 조회하기
**Priority**: P1

As a **C-level/GA/Manager/PM/Sales**
I want to view profitability information for projects
So that I can assess project financial performance

**Acceptance Criteria:**
- [ ] 프로젝트 상세 화면에서 수익성 정보가 표시된다
- [ ] 계약 금액과 실제 투입 비용(레벨 비용 기준)을 비교한 수익률이 계산되어 표시된다
- [ ] Designer/Developer/QA 역할은 수익성 정보가 노출되지 않는다

---

### Finance - Contracts

#### US-013: 계약(Contract)을 생성하고 관리하기
**Priority**: P0

As a **Finance/PM/Manager/Sales**
I want to create and manage contracts for projects
So that I can track contract terms and link them to billing milestones

**Acceptance Criteria:**
- [ ] 프로젝트당 하나의 계약만 생성 가능하다
- [ ] 계약 생성 시 계약명, 총 금액, 계약 시작일/종료일, 계약 유형(Settings 참조), 계약서 URL/첨부가 가능하다
- [ ] 총 세액(부가세 포함 총액)이 자동 계산되거나 입력 가능하다
- [ ] 계약 목록에서 프로젝트별로 조회할 수 있다
- [ ] 계약 상세 화면에서 연결된 마일스톤 목록이 표시된다

#### US-014: 마일스톤(Milestone)을 생성하고 청구/수금 상태를 관리하기
**Priority**: P0

As a **Finance/PM**
I want to create milestones and manage billing/payment status
So that I can track invoice schedules and payment collections

**Acceptance Criteria:**
- [ ] 계약 상세 화면에서 마일스톤 목록을 조회할 수 있다
- [ ] 마일스톤 생성 시 마일스톤 유형(Settings 참조), 예정 금액, 예정일을 입력할 수 있다
- [ ] 마일스톤 상태는 PENDING/INVOICED/PAID/OVERDUE 중 하나이다
- [ ] 예정일 초과 시 자동으로 OVERDUE 상태로 변경된다
- [ ] 지급 금액, 지급일 입력 시 PAID 상태로 변경 가능하다
- [ ] 마일스톤 금액 합계가 계약 총액을 초과하지 않도록 검증된다
- [ ] 마일스톤에 세금계산서를 연결할 수 있다

---

### Finance - Invoices

#### US-015: 세금계산서(TaxInvoice)를 생성하고 발행 상태를 관리하기
**Priority**: P0

As a **Finance/GA**
I want to create tax invoices and manage issuance status
So that I can track invoice generation and delivery to clients

**Acceptance Criteria:**
- [ ] 세금계산서 생성 시 고객사 선택(필수), 고객사 유형, 계산서 유형(CASH_RECEIPT/TAX_INVOICE), 용도 유형(RECEIPT/CLAIM)을 선택할 수 있다
- [ ] 총 금액(공급가액), 총 세액(부가세), 품목명, 이메일 수신, 작성일을 입력할 수 있다
- [ ] 세금계산서 상태는 REQUESTED/GA_REVIEW/INVOICE_SENT/PAYED 중 하나이다
- [ ] GA 역할은 REQUESTED → GA_REVIEW → INVOICE_SENT 상태 변경이 가능하다
- [ ] C-level/Manager/PM/Sales 역할은 INVOICE_SENT → PAYED 상태 변경이 가능하다
- [ ] 상태 변경 시 고객사 이메일로 자동 발송된다 (추후 구현)
- [ ] 작성일 기준 세금계산서 번호가 자동 생성된다
- [ ] 마일스톤과 연결하여 생성할 수 있다

#### US-016: 세금계산서 발행 및 수금 현황을 조회하기
**Priority**: P1

As a **Finance/Manager/C-level**
I want to view invoice issuance and payment status
So that I can monitor accounts receivable and identify overdue payments

**Acceptance Criteria:**
- [ ] 세금계산서 목록에서 상태별 필터링이 가능하다
- [ ] 미수금(OVERDUE 상태) 건수 및 금액이 집계되어 표시된다
- [ ] 고객사별 세금계산서 목록을 조회할 수 있다
- [ ] 마일스톤과 연결된 세금계산서를 확인할 수 있다

---

### Finance - Digital Signatures

#### US-017: 전자서명(DigitalSignature)을 요청하고 진행 상태를 추적하기
**Priority**: P1

As a **Finance/GA/PM/Sales**
I want to request digital signatures for contracts and track signing progress
So that I can ensure contracts are properly executed before project start

**Acceptance Criteria:**
- [ ] 계약 상세 화면에서 전자서명 요청을 생성할 수 있다
- [ ] 서명 요청 시 담당자 ID 리스트, 이메일 수신, 메모를 입력할 수 있다
- [ ] 내부 프로세스 상태: REQUESTED → GA_REVIEW → MODUSIGN_SENT 순서로 진행된다
- [ ] GA 역할만 상태 변경(REQUESTED → GA_REVIEW → MODUSIGN_SENT)이 가능하다
- [ ] 모두싸인 발송(MODUSIGN_SENT) 시 해당 프로젝트 PM, Sales에게 알림이 전송된다
- [ ] 모두싸인 API 연동을 통해 문서 이력 이벤트를 수신하고 상태를 업데이트한다
- [ ] SIGNING_COMPLETED_ALL 이벤트 수신 시 해당 프로젝트 PM, Sales에게 알림이 전송된다
- [ ] 서명 진행 상태 화면에서 각 담당자별 서명 상태를 확인할 수 있다
- [ ] 만료 기한은 30일로 설정된다

---

### Workforce - People

#### US-018: 직원(Workforce) 정보를 추가하고 관리하기
**Priority**: P0

As a **GA**
I want to add and manage employee information
So that I can maintain the workforce database and assign resources to projects

**Acceptance Criteria:**
- [ ] GA 역할만 직원 추가 버튼이 노출된다
- [ ] 직원 추가 시 이름, 이메일(필수, 고유), 역할(복수 선택 가능), 고용형태, 전화번호, 스킬스택, 입사일, 지역그룹(KOR/SEA), 레벨(GradeLevel)을 입력할 수 있다
- [ ] 이메일은 회사 도메인으로 제한된다 (@company.com)
- [ ] 이메일 입력 시 계정이 자동 생성된다
- [ ] 지역그룹 선택 시 해당 지역의 GradeLevel만 선택 가능하다
- [ ] 직원 목록에서 검색 및 필터링(역할, 고용형태, 지역그룹 등)이 가능하다

#### US-019: 직원 목록에서 권한별로 다른 정보를 조회하기
**Priority**: P1

As a **C-level/GA/Manager/PM/Sales/Designer/Developer/QA**
I want to view employee information according to my role permissions
So that I can access relevant information while protecting sensitive cost data

**Acceptance Criteria:**
- [ ] C-level/GA 역할: 이름, 역할, 스킬, 고용형태, 레벨, 시간당 레벨 비용 컬럼이 노출된다
- [ ] Manager/PM/Sales/Designer/Developer/QA 역할: 이름, 역할, 스킬 컬럼만 노출된다
- [ ] 실제 연봉, 실제 시급은 전 역할에서 노출되지 않는다
- [ ] 모든 비용 계산은 레벨 비용(GradeLevel.hourlyLevelCost) 기준으로 수행된다

#### US-020: 직원 정보를 수정하고 관리하기
**Priority**: P1

As a **GA**
I want to update employee information
So that I can keep workforce data current and accurate

**Acceptance Criteria:**
- [ ] 직원 상세 화면에서 모든 필드를 수정할 수 있다
- [ ] 레벨 변경 시 비용 계산이 자동으로 업데이트된다
- [ ] 퇴사 시 기존 태스크는 다른 인력으로 재배정이 필요하다는 알림이 표시된다

---

### Workforce - Tasks

#### US-021: 개인 태스크(Task)를 생성하고 관리하기
**Priority**: P0

As a **PM/Designer/Developer/QA**
I want to create and manage my personal tasks
So that I can track my work assignments and time allocation

**Acceptance Criteria:**
- [ ] 내 태스크 화면에서 Task 목록을 조회할 수 있다
- [ ] Task 생성 시 태스크명(필수), 프로젝트 연결(선택), 시작일, 종료 예정일, 작업일수, 투입% 또는 예상 투입 시간을 입력할 수 있다
- [ ] 작업일수는 Settings의 MonthlyWorkday 기준으로 자동 계산된다 (주말/공휴일 제외)
- [ ] 투입 방식 선택(%, 시간)에 따라 예상 투입 시간이 자동 계산된다
- [ ] 실제 투입 시간은 TaskDailyEntry의 투입 시간 합계로 자동 계산된다
- [ ] 예상/실제 투입 비용은 담당 Workforce의 시간당 레벨 비용을 기준으로 자동 계산된다
- [ ] Task 상태는 IN_PROGRESS/COMPLETED 중 선택 가능하다
- [ ] 상태가 COMPLETED일 때 실제 종료일 입력이 필수이다

#### US-022: 일별 투입 시간(TaskDailyEntry)을 기록하기
**Priority**: P0

As a **PM/Designer/Developer/QA**
I want to record daily time entries for my tasks
So that I can track actual effort and ensure accurate cost calculation

**Acceptance Criteria:**
- [ ] 오늘의 태스크 화면에서 일별 투입 시간을 입력할 수 있다
- [ ] 투입 시간은 0.5시간 단위(30분 단위)로 기록한다
- [ ] 퇴근 전까지 기록이 필수이다 (다음 날 기록 제한)
- [ ] 같은 태스크의 같은 날짜에 중복 기록이 불가능하다
- [ ] 일별 메모를 입력할 수 있다
- [ ] 실제 투입 시간 합계가 Task의 실제 투입 시간으로 자동 업데이트된다
- [ ] 8시간 근무 규칙 준수 체크 및 경고가 표시된다

#### US-023: 오늘의 태스크를 조회하고 관리하기
**Priority**: P1

As a **PM/Designer/Developer/QA**
I want to view and manage today's tasks
So that I can prioritize my daily work and ensure all tasks are completed

**Acceptance Criteria:**
- [ ] 내 태스크 화면에서 Today/All 필터로 오늘의 태스크만 조회할 수 있다
- [ ] 오늘 진행 중인 Task 목록이 표시된다
- [ ] 각 Task별 예상 투입 시간과 실제 투입 시간이 비교되어 표시된다
- [ ] 일별 투입 시간 기록이 완료되지 않은 Task가 강조 표시된다

---

### Workforce - Resources

#### US-024: 프로젝트에 리소스를 배정(ResourceAssignment)하고 관리하기
**Priority**: P0

As a **PM/Workforce Manager**
I want to assign resources to projects and manage allocations
So that I can plan resource utilization and track assignments

**Acceptance Criteria:**
- [ ] 리소스 관리 화면에서 프로젝트별 리소스 배정 목록을 조회할 수 있다
- [ ] 리소스 배정 생성 시 인력(Workforce), 프로젝트, 시작일, 종료일, 예상 투입 퍼센트 또는 예상 투입 시간을 입력할 수 있다
- [ ] 시작일 ≤ 종료일 검증이 수행된다
- [ ] 배정 상태는 IN_PROGRESS/COMPLETED/DELAYED 중 선택 가능하다
- [ ] 배정 기간 중 태스크 투입량 모니터링이 가능하다

#### US-025: 리소스 배정의 예상 vs 실제 투입량을 비교 분석하기
**Priority**: P1

As a **PM/Workforce Manager/C-level**
I want to compare planned vs actual resource allocations
So that I can identify resource utilization gaps and optimize assignments

**Acceptance Criteria:**
- [ ] 리소스 배정 상세 화면에서 예상 투입량과 실제 투입량(TaskDailyEntry 합계)을 비교할 수 있다
- [ ] 편차가 큰 경우 경고가 표시된다
- [ ] 리소스별 Task 목록을 조회할 수 있다
- [ ] 프로젝트별 리소스 현황이 집계되어 표시된다

---

### Workforce - Calendar

#### US-026: 통합 캘린더에서 일정을 시각화하고 관리하기
**Priority**: P1

As a **All Roles**
I want to view a unified calendar with all my tasks and project schedules
So that I can understand my workload and plan my time effectively

**Acceptance Criteria:**
- [ ] 캘린더 화면에서 오늘이 명확히 표시된다
- [ ] 날짜별 Task 개수가 표시된다
- [ ] 내가 배정된 모든 Task(시작~종료 기간)가 표시된다
- [ ] 참여 프로젝트의 주요 일정(시작/완료 예정)이 표시된다
- [ ] 날짜 클릭 시 Task 관리 화면으로 이동한다
- [ ] 캘린더는 읽기 전용이다 (편집 불가)

---

### Settings

#### US-027: 기준정보(Settings)를 관리하기
**Priority**: P0

As a **C-level/GA**
I want to manage system settings including skill stacks, contract types, and development types
So that I can maintain consistent reference data across the system

**Acceptance Criteria:**
- [ ] C-level/GA 역할만 Settings 메뉴에 접근 가능하다
- [ ] 스킬스택 목록을 추가/수정/삭제할 수 있다
- [ ] 계약유형 목록을 추가/수정/삭제할 수 있다
- [ ] 개발유형 목록을 추가/수정/삭제할 수 있다
- [ ] 마일스톤유형 목록을 추가/수정/삭제할 수 있다
- [ ] 각 목록은 최소 1개 이상의 옵션이 존재해야 한다
- [ ] 변경 시 기존 데이터와의 호환성 검토가 필요하다는 경고가 표시된다

#### US-028: 급여별 레벨(GradeLevel)을 관리하기
**Priority**: P0

As a **C-level/GA**
I want to manage salary grade levels by region
So that I can calculate costs consistently using level-based pricing instead of actual salaries

**Acceptance Criteria:**
- [ ] 지역그룹(KOR/SEA)별 레벨 목록을 조회할 수 있다
- [ ] 레벨 생성 시 지역그룹, 레벨명, 평균연봉, 연간근무시간(기본값 2080)을 입력할 수 있다
- [ ] 시간당 레벨 비용(hourlyLevelCost)이 평균연봉 ÷ 연간근무시간으로 자동 계산된다
- [ ] regionGroup + levelName 조합은 고유해야 한다
- [ ] 레벨 활성여부를 설정할 수 있으며, 비활성 시 신규 배정이 불가능하다
- [ ] 레벨 삭제는 금지되며, 비활성화로 처리한다 (과거 데이터 참조 가능성)
- [ ] avgAnnualSalary는 0보다 커야 한다

#### US-029: 월별 근무일(MonthlyWorkday)을 관리하기
**Priority**: P1

As a **C-level/GA**
I want to manage monthly workdays
So that I can accurately calculate workdays for cost and effort estimation

**Acceptance Criteria:**
- [ ] 월별 근무일 관리 화면에서 연도/월별 근무일 리스트를 조회할 수 있다
- [ ] 연도/월 선택 후 해당 월의 근무일(1-31) 리스트를 입력할 수 있다
- [ ] 연도+월 조합은 고유해야 한다 (중복 불가)
- [ ] 근무일 리스트는 해당 월의 유효한 날짜만 포함해야 한다
- [ ] 작업일수 계산 시 MonthlyWorkday 기준이 사용된다

---

### System

#### US-030: 시스템 관리 메뉴에 접근하기
**Priority**: P3

As a **Admin/C-level**
I want to access system management features
So that I can configure system-wide settings and monitor system health

**Acceptance Criteria:**
- [ ] 시스템 메뉴가 존재한다 (초기에는 placeholder)
- [ ] 추후 권한/감사로그/환경설정/통합(SSO, 웹훅 등) 기능이 확장된다

---

### Integration & Data Flow

#### US-031: Client-Project-Finance-Workforce 간 End-to-end 연결을 유지하기
**Priority**: P0

As a **All Roles**
I want to navigate seamlessly between clients, projects, finance, and workforce data
So that I can understand the complete business context without switching systems

**Acceptance Criteria:**
- [ ] 고객사 상세에서 연결된 프로젝트 목록으로 이동할 수 있다
- [ ] 프로젝트 상세에서 연결된 계약/마일스톤으로 이동할 수 있다
- [ ] 프로젝트 상세에서 연결된 리소스 배정/태스크로 이동할 수 있다
- [ ] 재무 정보에서 연결된 프로젝트/고객사로 이동할 수 있다
- [ ] 리소스 배정에서 연결된 프로젝트/인력 상세로 이동할 수 있다
- [ ] 모든 연결 관계가 데이터 무결성을 유지한다 (삭제 시 Cascade/SetNull 정책 준수)

#### US-032: 프로젝트 상태 전이 규칙을 검증하기
**Priority**: P1

As a **System**
I want to validate state transitions for projects and financial entities
So that I can prevent invalid state changes and maintain data consistency

**Acceptance Criteria:**
- [ ] MilestoneStatus 전이(PENDING → INVOICED → PAID, OVERDUE) 규칙이 검증된다
- [ ] InvoiceStatus 전이(REQUESTED → GA_REVIEW → INVOICE_SENT → PAYED) 규칙이 검증된다
- [ ] DigitalSignature 상태 전이(REQUESTED → GA_REVIEW → MODUSIGN_SENT) 규칙이 검증된다
- [ ] 잘못된 상태 전이 시도 시 에러 메시지가 표시된다

---

### Security & Permissions

#### US-033: 역할 기반 접근 제어(RBAC)를 구현하기
**Priority**: P0

As a **System**
I want to enforce role-based access control
So that users only access features and data appropriate to their role

**Acceptance Criteria:**
- [ ] 역할은 C-level, GA, Manager, PM, Sales, Designer, Developer, QA 중 선택 가능하다
- [ ] 한 사용자에게 여러 역할을 부여할 수 있으며, 권한은 합집합으로 적용된다
- [ ] 메뉴 접근 권한이 역할별로 다르게 적용된다
- [ ] 버튼 권한(생성/수정/삭제)이 역할별로 다르게 적용된다
- [ ] 데이터 노출 권한(컬럼 표시)이 역할별로 다르게 적용된다

#### US-034: 민감한 원가 정보를 마스킹하기
**Priority**: P0

As a **System**
I want to mask sensitive cost information
So that actual salaries and costs are protected from unauthorized access

**Acceptance Criteria:**
- [ ] 실제 연봉(annualSalary), 실제 시급(costPerHour)은 전 역할에서 노출되지 않는다
- [ ] 모든 비용 계산은 레벨 비용(GradeLevel.hourlyLevelCost) 기준으로만 수행된다
- [ ] C-level/GA 역할만 레벨 및 시간당 레벨 비용 컬럼을 볼 수 있다
- [ ] Designer/Developer/QA 역할은 직원 테이블에서 레벨/비용 관련 컬럼이 노출되지 않는다

---

### Performance & Usability

#### US-035: 목록 페이지에서 빠른 필터링과 검색을 수행하기
**Priority**: P1

As a **All Roles**
I want to quickly filter and search in list pages
So that I can find relevant information efficiently

**Acceptance Criteria:**
- [ ] 목록 페이지에서 필터 조건이 URL 쿼리로 유지된다 (새로고침/공유 가능)
- [ ] 검색 기능이 주요 목록 페이지에 제공된다 (고객사, 프로젝트, 직원 등)
- [ ] 필터 상태가 새로고침 후에도 유지된다
- [ ] 목록 페이지는 초기 목표 1초 내 로드된다

#### US-036: 표 기반 작업 흐름에서 빠른 액션을 수행하기
**Priority**: P1

As a **All Roles**
I want to perform quick actions (status change, edit, delete) in table views
So that I can process tasks efficiently without navigating to detail pages

**Acceptance Criteria:**
- [ ] 목록 페이지에서 상태 변경이 가능하다 (드롭다운/토글)
- [ ] 목록 페이지에서 인라인 편집이 가능하다 (선택 기능)
- [ ] 목록 페이지에서 삭제 액션이 가능하다 (확인 다이얼로그 포함)
- [ ] 액션 후 목록이 자동으로 새로고침된다

---

### Data Integrity

#### US-037: 관계 삭제 정책을 명확히 적용하기
**Priority**: P1

As a **System**
I want to enforce clear deletion policies for related entities
So that data integrity is maintained when deleting records

**Acceptance Criteria:**
- [ ] Client 삭제 시 관련 Project/Manager/TaxInvoice에 대한 정책(Cascade/SetNull)이 명확히 적용된다
- [ ] Project 삭제 시 관련 WorkItem/DevTasks/Contract/ResourceAssignment에 대한 정책이 명확히 적용된다
- [ ] Workforce 삭제 시 관련 Task/ResourceAssignment에 대한 정책이 명확히 적용된다
- [ ] 삭제 시 관련 데이터 존재 여부를 확인하고 경고 메시지를 표시한다

---

### Internationalization & Standards

#### US-038: 통화 및 날짜 포맷을 표준화하기
**Priority**: P2

As a **All Roles**
I want to see currency and dates in a consistent, localized format
So that I can read financial and date information correctly

**Acceptance Criteria:**
- [ ] 통화는 KRW로 표시된다 (예: 1,000,000원)
- [ ] 날짜는 ko-KR 포맷으로 표시된다 (예: 2024-01-15)
- [ ] 타임존은 UTC 저장 + 표시 시 변환한다
- [ ] 모든 화면에서 일관된 포맷이 적용된다

---

## Summary

### Total User Stories: 38

**By Priority:**
- P0 (Critical): 18 stories
- P1 (High): 16 stories
- P2 (Medium): 2 stories
- P3 (Low): 2 stories

**By Feature Area:**
- Dashboard: 1 story
- Client Management: 3 stories
- Project Management: 8 stories
- Finance (Contracts/Invoices/Signatures): 4 stories
- Workforce (People/Tasks/Resources/Calendar): 8 stories
- Settings: 3 stories
- System: 1 story
- Integration & Data Flow: 2 stories
- Security & Permissions: 2 stories
- Performance & Usability: 2 stories
- Data Integrity: 1 story
- Internationalization: 1 story

**By Actor:**
- All Roles: Multiple stories (dashboard, calendar, navigation)
- Admin/GA: Settings, employee management, invoice/signature state management
- C-level: High-level overview, financial visibility, settings access
- Manager: Project and resource oversight, client management
- PM: Project lifecycle management, task/work item management
- Finance/Ops: Contract, invoice, signature management
- Sales: Client and project visibility, financial tracking
- Designer/Developer/QA: Task management, daily time entry

---

## Notes

- 모든 User Story는 PRD 및 Conceptual Model 문서를 기반으로 작성되었습니다.
- Acceptance Criteria는 테스트 가능하도록 구체적으로 작성되었습니다.
- 권한 정책은 `docs/changes/메뉴별 권한 정책.md`를 참고하여 반영되었습니다.
- 우선순위는 비즈니스 영향도와 시스템 필수 기능을 기준으로 할당되었습니다.
- 향후 설계 및 개발, QC 시 이 문서를 기준으로 진행됩니다.

