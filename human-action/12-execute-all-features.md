[claude]

**실행** 
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

**F01 plan 완료**
```
all tasks of F01"프로젝트 설정" seems to be finished. check that first
```

**F01 개발 완료**
```
Move to 독자 코어 feature next~
```

**F04 개발 완료**
```
move to the next feature F06: 인터벤션 
```

**F06 Plan 완료**
```
/feature-executor
```

**F06 개발 완료**
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

**F07 Plan 완료**
```
continue~
```

```
continue~
```

**F07 개발 완료 전에 다른 터미널에서 F08 관리자 실행**
```
/feature-executor 
Develop the "관리자" feature based on tasks.json.

Parallel execution is allowed.
For each task:
- If all dependencies are satisfied, develop it immediately.
- If it depends on another feature that is not completed yet, mark the task as blocked and skip it.
- Do not block the entire feature due to a single blocked task.
- Resume blocked tasks once their dependencies are completed.

------ 
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


**F08 Plan 완료**
```
proceed task execution
```