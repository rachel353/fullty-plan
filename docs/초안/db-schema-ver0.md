# DB schema

[시각화 by GPT](https://www.notion.so/by-GPT-2bc3aae9a89480ec9b8ffbe60e46ef6f?pvs=21)

```jsx
   client ──┬── manager
            │
            └── lead ──┬── lead_history ──┬── summary
                        │                  ├── temperature
                        │                  └── script
                        └── todo
                       
   project ──┬── project_history ─── summary
             │            └── requirements(Project)
             ├── requirements(Sales)
             ├── specification ─── specification_item
             ├── workitem
             ├── devtasks ─── devtasks_item
             ├── project_timeline
             └── project_review

   project ── contract ── milestone ─── taxinvoice
                          └── digital_signature

   workforce ── task ── task_daily_entry
            └── resource_assignment ── project

   settings
   monthly_workday

```

# 🟦 1. **HR / Workforce / Settings**

## **workforce**

```
id (PK)
created_at
email
name
phone
phone_corp
roles (array: PM / Sales / Designer / Developer / Manager)
skill_stacks (array)
type (정규직 / 계약직 / 프리랜서)
join_date
annual_salary
cost_per_hour
memo

```

## **settings**

```
id (PK)
created_at
created_by
skill_stacks_list (array)
contract_type_list (array)
dev_type_list (array)

```

## **monthly_workday**

```
id (PK)
year
month
workday_list (array of dates)
created_at
created_by

```

---

# 🟩 2. **Client / Manager / Lead / LeadHistory / TODO**

## **client**

```
id (PK)
client_name
client_type (corporate/personal)
corporate_name
representative_name
corp_registration_num
company_address
certificate_file
personal_name
registration_card

```

## **manager**

```
id (PK)
client_id (FK → client.id)
name
position
phone
email

```

## **lead**

```
id (PK)
client_id (FK)
name
budget
stage  (inquiry / discovery / proposal / negotiation / closed / lost)
created_at
created_by

```

## **lead_history**

```
id (PK)
lead_id (FK)
created_at
created_by
stage
meeting_id (nullable)
script
memo
records (recording URL)

```

## **todo**

```
id (PK)
lead_id (FK)
created_at
created_by
status (pending / done)
type (internal / external / meeting / system)
content
due
owner_id (FK → workforce.id)
participant_ids (array of workforce.id)

```

---

# 🟧 3. **AI Module (Summary / Temperature / Requirements / Script)**

## **summary**

```
id (PK)
lead_history_id (nullable, FK)
project_history_id (nullable, FK)
summary

```

## **temperature**

```
id (PK)
lead_history_id (FK)
temperature (0~100)
lead_type (Hot/Warm/Cold/etc)

```

## **script**

```
id (PK)
lead_history_id (FK)
script

```

## **requirements**

```
id (PK)
project_id (nullable, FK)
lead_history_id (nullable, FK)
type (Sales / Project)
title
requirement
script
status (Y/N)
priority (High/Medium/Low)

```

---

# 🟦 4. **Project Management**

## **project**

```
id (PK)
client_id (FK)
created_at
created_by
stage (pending / planning / developing / paused / internal_QA / external_QA / maintenance)

pm_ids (array FK)
design_ids (array FK)
dev_ids (array FK)
qa_ids (array FK)

assigned_sales (array)
assigned_pm (array)

project_start_date
project_end_date

contract_type (array)
dev_type (array)
total_price
memo

```

## **project_history**

```
id (PK)
project_id (FK)
created_at
created_by
stage
script
participants (array)
type (memo / requirement / keypoint)
title
content
file
meeting_id (FK, nullable)

```

## **specification**

```
id (PK)
project_id (FK)
created_at
total_cost

```

## **specification_item**

```
id (PK)
specification_id (FK)
item_title
purpose
feature
page
cost

```

## **workitem**

```
id (PK)
project_id (FK)
created_at
created_by
assignee_id (FK → workforce.id)
status (pending / in progress / finished)
title
description
start_date
end_date
workload_pct
estimated_hours
estimated_cost
actual_hours
actual_cost

```

## **devtasks**

```
id (PK)
project_id (FK)
created_at

```

## **devtasks_item**

```
id (PK)
devtasks_id (FK)
item_title
content
status (pending / in progress / done)
assigned_to (FK)
estimated_time
start_date
end_date
memo

```

## **project_timeline**

```
id (PK)
project_id (FK)
stage
expected_date
actual_date
is_delayed (-1/0/1)
memo

```

## **project_review**

```
id (PK)
project_id (FK)
created_at
created_by
is_delayed
pm_ids (array)
design_ids (array)
dev_ids (array)
qa_ids (array)
hardest_task
fastest_task
key_learnings
client_painpoint
improvements

```

---

# 🟨 5. **Finance (Contract / Milestone / TaxInvoice / DigitalSignature)**

## **contract**

```
id (PK)
project_id (FK)
created_at
created_by
contract_url
contract_name
total_price
total_tax_price
contract_start_date
contract_end_date
contract_type (array)
memo

```

## **milestone**

```
id (PK)
contract_id (FK)
created_at
created_by
taxinvoice_id (nullable, FK)
milestone_type (down/middle/final)
status (unpayed / payed / delayed)

expected_amount
expected_tax_amount
expected_date

payed_amount
payed_tax_amount
payed_date

memo

```

## **taxinvoice**

```
id (PK)
client_id (FK)
created_at
created_by
status (pending / in progress / finished / canceled)
client_type (사업자 / 개인 / 외국인)
invoice_type (현금영수증 / 세금계산서)
purpose_type (영수/청구)
send_email_to
write_date
total_price
total_tax_price
item
memo

```

## **digital_signature**

```
id (PK)
contract_id (FK)
created_at
created_by
status (pending / in progress / finished / canceled)
send_email_to
manager_ids (array)
memo

```

---

# 🟫 6. **Task System (Workforce Action)**

*(네가 새로 추가한 모듈 포함)*

## **task**

```
id (PK)
resource_id (FK → workforce.id)
project_id (nullable FK)

task_name
start_date
estimated_end_date
real_end_date (nullable)

memo
status (in_progress / completed)
total_spent_hours (계산용)
created_at
created_by

```

## **task_daily_entry**

```
id (PK)
task_id (FK)
date
spent_hours
memo

```

## **resource_assignment**

```
id (PK)
resource_id (FK)
project_id (FK)

start_date
end_date
estimated_work_amount_pct
estimated_work_hours

status (in_progress/completed/delayed)
memo

```

---

# 🎯 **전체 ERD 시각화 (ASCII 기반)**

*(Notion에서도 깨끗하게 보이도록 정리된 버전)*

---

# 📘 **Top-level ERD**

```
[client] 1─∞ [lead] 1─∞ [lead_history] 1─∞ [summary]
   │                │                    └─∞ [temperature]
   │                └─∞ [todo]
   │
   └∞ [manager]

[lead_history] ─∞ [requirements]
[requirements] ─(Sales)→ [project]

----------------------------------------------------------

[project] 1─∞ [project_history]
      │      ├─∞ [summary]
      │      └─∞ [requirements] (Project)
      │
      ├─1 [specification] 1─∞ [specification_item]
      ├─∞ [workitem]
      ├─1 [devtasks] 1─∞ [devtasks_item]
      ├─∞ [project_timeline]
      └─1 [project_review]

----------------------------------------------------------

[project] 1─1 [contract] 1─∞ [milestone] ∞─1 [taxinvoice]
                       │
                       └─∞ [digital_signature]

----------------------------------------------------------

[workforce] 1─∞ [task] 1─∞ [task_daily_entry]
       │
       └─∞ [resource_assignment] ∞─1 [project]

----------------------------------------------------------

[settings], [monthly_workday] (global configs)

```

---

# 🖼️ **모듈별 상세 ERD 시각화**

## **Sales CRM**

```
client(1) ─∞ lead(∞) ─∞ lead_history(∞)
                     ├─∞ todo
                     ├─∞ summary
                     ├─∞ temperature
                     ├─∞ script
                     └─∞ requirements(type=Sales)

```

---

## **Project Management**

```
project(1)
 ├─∞ project_history
 │     ├─ summary
 │     └─ requirements(type=Project)
 │
 ├─1 specification ─∞ specification_item
 ├─∞ workitem
 ├─1 devtasks ─∞ devtasks_item
 ├─∞ project_timeline
 └─1 project_review

```

---

## **Finance**

```
project(1) ─1 contract ─∞ milestone ─? taxinvoice
                            └─∞ digital_signature

```

---

## **Workforce / Task System**

```
workforce(1)
 ├─∞ task ─∞ task_daily_entry
 └─∞ resource_assignment ─∞ project

```

---