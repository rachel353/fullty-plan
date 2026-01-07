[claude]

```
/change-analyzer skill
i want to change the bottom naviagtion component of Reader Pages. I want to delete "충전" tab and make those to be part of "마이페이지" tab
```

```
/change-doc skill
이제 change-doc 스킬을 실행하여 기존 문서들(ia_structure.md, logical_architecture.md 등 docs 폴더들)의 정합성을 복구해
```

```
@tasks/tasks.json 에서도 관련 task 수정해
```

**output**
## 수정된 Task

| Task ID | 변경 내용 |
| --- | --- |
| **task-012** | status: `completed` → `in_progress`, notes 추가 (4탭→3탭 수정 필요) |
| **task-040** | notes 추가 (Ink 충전 바로가기 UI 포함 필요) |

---

## 문서 변경 요약

다음 파일들이 수정되었습니다:

- docs/ia_structure.md - Navigation 구조 변경
- docs/changes/2026-01-07-1200.md - 복구 결과 기록
- tasks/changes/2026-01-07-1200.json - affectedTasks 추가
- tasks/tasks.json - task-012, task-040 업데이트

커밋 메시지 제안:

`docs: Reader 하단 네비게이션 구조 변경 반영 (change-2026-01-07-1200)

- ia_structure.md: Bottom Navigation 4탭→3탭 변경
- ia_structure.md: /shop을 Common 영역으로 이동
- tasks.json: task-012(BottomNav), task-040(MyPage) 업데이트`

커밋하시겠습니까? (Y/n)