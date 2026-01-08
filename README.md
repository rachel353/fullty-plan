# Workflow
### 1. PRD/SRS 생성 및 Seeding, tweakcn 설치
1. tweakcn 설치는 아래 프롬프트 붙여서 실행
        
      ```
      아래 명령어로 tweakcn을 먼저 설치해
      `pnpm dlx shadcn@latest add <https://tweakcn.com/r/themes/cmk2dt04m000f04lbc9x47d7f> `
      ```
        
### 2. planning(workflow)
- 개발문서 (FE관련)
- 디자인 검수용 페이지의 경우, `"design_validation_required": true`
    
    ```
      /feature-executor
      Develop all features in @tasks/tasks.json where design_validation_required = true.

      Also develop the minimal set of prerequisite features required to complete them.
      Do NOT develop unrelated features.

      Handle dependencies at the task level:
      - If a task’s dependencies are satisfied, develop it immediately.
      - If it depends on an unfinished feature, mark the task as blocked and skip it.
      - Do not block an entire feature due to a single blocked task.
      - Resume blocked tasks once their dependencies are completed.
    ```
    
### 3. planning 피드백 **HITL**
- **여기서는 Human이 지호가 만든 커맨드로 계속해서 개발문서, tasks.json이 적절하게 변경되는것이 핵심**
- Signal 발송후 바로 3번으로 넘어감

### 4. tasks/tasks.json 에서 디자인 검수 페이지가 설정된 feature들 먼저 개발
- design_validation_required = true인 feature들 모두 개발완료되어야만 종료
        
      ```
      /feature-executor
      @tasks/tasks.json에서 design_validation_required = true로설정된 feature들까지 개발해줘
      ```
        
### 5. Feedback Loop **→ 여기는 여러번 돌수있음.**
1. Replan **HITL (고객 Confirm)**
      - ‘요구사항 및 디자인 수정 반영’ 커맨드 실행
      - 승인시 Loop 탈출
      - **여기서는 Human이 지호가 만든 커맨드로 계속해서 개발문서, tasks.json이 적절하게 변경되는것이 핵심**
2. 남은 task 개발
        
      ```
        /feature-executor
        
        Use @tasks/tasks.json as the single source of truth.
        
        Execution rules:
        
        1. A feature is considered "remaining" if it contains at least one task with status != "completed".
        2. Execute all remaining features.
        3. For each feature:
           - If a feature plan/spec already exists, DO NOT run /feature-spec.
           - If no plan/spec exists, run /feature-spec first.
        4. After plan resolution, develop at the task level.
        5. Skip tasks already marked as "completed".
        6. Execute tasks in logical order within a feature, considering dependencies.
        7. If tasks are independent, execute them in parallel.
        8. Do NOT ask the user for confirmation unless information is missing.
        
      ```