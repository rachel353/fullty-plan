# API Specification: 직원 관리 (Workforce People)

> 생성일: 2024-12-08  
> 모듈 경로: `app/(admin)/workforce/people/page.tsx`

---

## 1. API 목록

| API | Method | 설명 | 입력 | 출력 |
|-----|--------|------|------|------|
| `getEmployees` | GET | 전체 직원 목록 조회 | - | `Employee[]` |
| `getEmployee` | GET | 특정 직원 상세 조회 | `id` | `Employee` |
| `createEmployee` | POST | 직원 추가 | `EmployeeInput` | `Employee` |
| `updateEmployee` | PUT | 직원 수정 | `id`, `EmployeeInput` | `Employee` |
| `deleteEmployee` | DELETE | 직원 삭제 | `id` | `boolean` |
| `getSkillStacks` | GET | 스킬 목록 (Settings에서) | - | `string[]` |
| `getMonthlyWorkdays` | GET | 월별 근무일 수 | `year`, `month` | `number` |

---

## 2. 데이터 타입

```typescript
// Enums
type WorkforceRole = "PM" | "SALES" | "DESIGNER" | "DEVELOPER" | "MANAGER"
type WorkforceType = "FULL_TIME" | "CONTRACT" | "FREELANCE"

// Input type for create/update
interface EmployeeInput {
  name: string
  email: string
  phone?: string
  phoneCorp?: string
  roles: WorkforceRole[]
  skillStacks: string[]
  type: WorkforceType
  joinDate?: Date
  annualSalary?: number
}

// Response type (includes computed field)
interface Employee extends EmployeeInput {
  id: string
  costPerHour?: number  // 서버에서 자동 계산
  createdAt: Date
  updatedAt: Date
}
```

---

## 3. 비즈니스 로직

### Cost Per Hour 계산

```typescript
const WORK_HOURS_PER_DAY = 8

function calculateCostPerHour(
  annualSalary: number,
  monthlyWorkdays: number
): number {
  const monthlySalary = annualSalary / 12
  return Math.round((monthlySalary * 1.5) / (monthlyWorkdays * WORK_HOURS_PER_DAY))
}
```

### 계산 시점
- **Create**: `annualSalary` 입력 시 자동 계산
- **Update**: `annualSalary` 변경 시 재계산
- **월별 근무일 변경 시**: 해당 월 costPerHour 재계산 필요 (Optional)

---

## 4. 연관 테이블

```
┌─────────────┐     ┌─────────────────┐
│  Workforce  │────▶│ MonthlyWorkday  │
│             │     │ (근무일 조회)    │
└─────────────┘     └─────────────────┘
       │
       ▼
┌─────────────┐
│  Settings   │
│ (스킬 목록)  │
└─────────────┘
```

---

## 5. Prisma 스키마 변경 사항

### WorkforceRole enum
```diff
enum WorkforceRole {
- ADMIN
  PM
  SALES
  DESIGNER
  DEVELOPER
- QA
+ MANAGER
}
```

### WorkforceType enum
```diff
enum WorkforceType {
  FULL_TIME
- PART_TIME
  CONTRACT
  FREELANCE
}
```









