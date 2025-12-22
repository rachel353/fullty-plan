# Information Architecture

*(Task System + GA + PM + Sales + Finance + HR + Settings 모두 포함)*

# 🏛️ **0. Admin Root IA**

```
Admin
 ├── Dashboard
 ├── Sales CRM
 ├── Projects
 ├── Workforce
 ├── Finance
 ├── Settings
 └── System / Logs
```

---

# 🟦 **1. Dashboard**

### 📌 KPI / Overview

- Sales Pipeline (inquiry → discovery → proposal → negotiation → closed/lost)
- 프로젝트 상태 (pending / planning / developing / QA / maintenance)
- 이번 달 milestone 현황
- Overdue milestone / overdue tasks
- Workforce utilization (근무시간 / 투입률)
- 금일 미팅 일정
- 금일 각 Workforce task count

> PDF 근거:
> 
> - Sales pipeline 흐름 (Sales 문서)
> - Project Stage (PM 문서)
> - Milestone 업데이트 기능 (Sales 문서)
> - Workforce/Workday 기반 cost 계산 구조 (GA 문서)

---

# 🟧 **2. Sales CRM**

```
Sales
 ├── Lead List
 │     ├── Inquiry
 │     ├── Discovery
 │     ├── Proposal
 │     ├── Negotiation
 │     ├── Closed Deal
 │     └── Lost Deal
 ├── Lead Detail
 │     ├── 기본 정보
 │     ├── Client Research (AI)
 │     ├── Temperature Score (AI)
 │     ├── Requirements (AI)
 │     ├── Summary (AI)
 │     ├── Script (AI)
 │     ├── Memo
 │     ├── LeadHistory (미팅/통화 기록)
 │     └── TODO List
 ├── Meeting (Teams API / STT)
 ├── Proposal
 ├── Contract Creation
 └── Project 생성 연결

```

### 주요 기능 IA

### 2.1 Lead

- 산업 / 예산 / client info
- stage 변경: inquiry → discovery → proposal → negotiation → closed/lost

### 2.2 LeadHistory

- Meeting DB (+ Teams API / transcript / recording)
- Memo, Script, Keypoints 저장

### 2.3 TODO

- meeting / internal / external / system
- meeting → Teams 자동 생성
- due 기반 알림

### 2.4 AI 기능

- Summary AI
- Requirements AI
- Question Generator AI
- Script AI
- Temperature AI

### 2.5 Proposal

- requirement + specification 기반
- proposal_content 자동 생성

### 2.6 Contract

- contract 생성
- milestone 자동 생성
- tax invoice 및 digital signature로 연결

> PDF 근거:
> 
> - LeadHistory, Meeting, Requirements, Proposal 전체 플로우 (Sales 문서)
> - Contract → Milestone 구조 (Sales 문서)

---

# 🟩 **3. Projects (PM)**

```
Projects
 ├── Project List
 ├── Project Detail
 │     ├── Overview
 │     ├── Stage 변경
 │     ├── Assigned Workforce
 │     ├── Requirements (Sales → PM)
 │     ├── Specification
 │     ├── WorkItem
 │     ├── DevTasks
 │     ├── Project History (meeting/memo)
 │     ├── Project Timeline
 │     └── Project Review
 ├── Meeting & Transcript
 └── Files

```

---

## 주요 기능 IA

### **3.1 Project Overview**

- project info
- project_start_date / end_date
- stage: pending → planning → developing → QA → maintenance
- PM, Design, Dev, QA multi-select 배정

### **3.2 Requirements / Specification**

- Sales에서 넘어온 요구사항 + PM 추가
- Specification DB, Specification Item DB

### **3.3 WorkItem**

- 업무 단위
- assignee
- estimated_hours · actual_hours
- estimated_cost · actual_cost
- 기간 설정, progress tracking

### **3.4 DevTasks**

- DevTasks set
- DevTasks Item (AI 자동 생성 가능)

### **3.5 Project History**

- meeting 기록
- transcript
- participant matching
- memo, requirement, keypoint 저장

### **3.6 Project Timeline**

- stage별 expected_date / actual_date
- is_delayed: -1 / 0 / 1
- memo 기록

### **3.7 Project Review**

- hardest task
- fastest task
- key learnings
- client painpoint
- improvement

> PDF 근거:
> 
> - WorkItem DB, DevTasks DB, ProjectHistory DB, Timeline DB, Review DB 명확히 기재됨 (PM 문서)

---

# 🟨 **4. Workforce (Task System 포함)**

```
Workforce
 ├── Calendar (전체 workforce 캘린더)
 ├── My Tasks (오늘 / 이번주 / 전체)
 ├── All Tasks (PM/Manager only)
 ├── Resource Management (PM/Manager)
 └── Workforce Info (GA)

```

---

# 🔥 **4.1 Calendar (Main Page)** – All Workforce

**통합 일정 시각화 페이지**

- 오늘 표시
- 내가 배정된 모든 Task(start~end)
- 내가 참여 중인 프로젝트의
    - Project Start
    - Expected Completion
    - Contractual Completion
- 날짜당 task 개수 표시
- 날짜 클릭 → Task 관리 화면 이동

---

# 📝 **4.2 Task 관리 화면** – All Workforce

### 기능

- Create Task
- Edit Task
- Task 삭제
- Daily Time Entry (퇴근 전 필수 기록)
- completed/in progress 선택
- real_end_date 자동 등록
- 오늘 투입 시간 합계 표시
- 8시간 미만/초과 경고
- 특이사항 기록

### Today Task List

- 오늘 해야 할 모든 task
- 투입 시간 입력
- 상태 업데이트

### All Task List

- 전체 task 정보
- 누적 투입 시간
- 상태(in progress/completed)
- real end date

---

# 👤 **4.3 Resource 관리 화면** – PM / Manager

### Resource 정보

- 참여 기간(start~end)
- estimated work amount %
- estimated work hour
- memo

### 자동 상태 로직

```
되면     today ∈ start~end → in progress
모든 task 완료 → completed(관리자 승인)
today ≥ end & task 미완료 → 경고 + 알림

```

### Resource별 Task List

- task name
- 기간
- memo
- 누적 투입시간
- 상태

### Estimated vs Actual Hour 비교

- 그래프 시각화
- over/under work 경고

---

# 🟦 **5. Finance**

```
Finance
 ├── Contract
 │     ├── Contract Info
 │     ├── Contract File
 │     ├── Milestone List
 ├── Tax Invoice
 ├── Digital Signature
 └── Billing Dashboard

```

### 5.1 Contract

- contract_name / url
- contract_type
- total_price / total_tax_price
- 계약 기간
- milestone 자동 생성

### 5.2 Milestone

- down/middle/final
- expected/payed
- delayed 감지

### 5.3 Tax Invoice

- invoice_type
- client_type
- send_email_to
- status 변경(GA only)

### 5.4 Digital Signature

- status (pending/in progress/finished/canceled)
- manager email list

> PDF 근거: Sales 문서의 Contract/TaxInvoice/Signature 전체 플로우 명확히 수록
> 

---

# 🟫 **6. Settings**

```
Settings
 ├── Skill Stack List
 ├── Contract Type List
 ├── Dev Type List
 ├── Monthly Workday
 └── Environment Variables(확장)

```

> PDF 근거: Settings DB, monthly_workday DB (GA 문서)
> 

---

# 🟪 **7. System / Logs**

```
System
 ├── API Logs
 ├── Meeting Sync Logs
 ├── Notification Logs
 └── AI Generation Logs

```

---

# 🧾 **8. Tasks 관련 DB Mapping (IA 기준)**

```
task
task_daily_entry
resource_assignment
workforce
project
project_timeline
workitem

```

---

# 🔍 **PDF 3종을 기반으로 누락된 기능이 있는지 최종 검토**

## 🔵 GA PDF 검토 (Workforce / Settings) — OK

✔ workforce, settings, monthly_workday 모두 IA 반영됨

✔ cost_per_hour 구조 IA에서 WorkItem/Task에 반영됨

→ 누락 없음

---

## 🟧 PM PDF 검토 — OK

✔ WorkItem DB

✔ DevTasks DB

✔ ProjectHistory

✔ Requirements 관리

✔ Specification 관리

✔ Timeline / Review

✔ Meeting AI + parsing flow

→ 전부 Projects IA에 들어감

---

## 🟦 Sales PDF 검토 — OK

✔ Lead / LeadHistory

✔ Meeting (teams / recording / transcript)

✔ Summary AI / Requirements AI

✔ Temperature / Script AI

✔ TODO AI

✔ Proposal DB

✔ Contract DB / Milestone DB

✔ TaxInvoice / DigitalSignature

→ 모두 Sales, Finance IA에 정확히 구성

---

## 🟩 Task System (네가 추가 요청한 요구사항) — OK

✔ Calendar

✔ Task 관리 (today/all)

✔ Resource 별 task list

✔ 8시간 규칙

✔ estimated vs actual hour

✔ 상태 로직

✔ DB table 3종

→ IA 전체에 문제없이 자연스럽게 통합됨

---