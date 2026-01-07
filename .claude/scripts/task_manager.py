#!/usr/bin/env python3
"""
Task Manager CLI
개발 Task를 관리하는 CLI 도구

Usage:
    python3 scripts/task_manager.py add --title "Task 제목" --priority high --feature "기능명"
    python3 scripts/task_manager.py update <task_id> --status done
    python3 scripts/task_manager.py list [--status pending|in_progress|done|blocked] [--feature "기능명"]
    python3 scripts/task_manager.py show <task_id>
"""

import argparse
import json
import os
from datetime import datetime
from pathlib import Path
from typing import Optional


def get_project_root() -> Path:
    """프로젝트 루트 디렉토리 반환"""
    current = Path(__file__).resolve()
    for parent in current.parents:
        if (parent / "CLAUDE.md").exists() or (parent / ".claude").exists():
            return parent
    return current.parent.parent


PROJECT_ROOT = get_project_root()
TASKS_DIR = PROJECT_ROOT / "tasks"
TASKS_FILE = TASKS_DIR / "tasks.json"


def ensure_tasks_file():
    """tasks.json 파일이 없으면 생성"""
    TASKS_DIR.mkdir(parents=True, exist_ok=True)
    if not TASKS_FILE.exists():
        initial_data = {
            "metadata": {
                "created_at": datetime.now().isoformat(),
                "last_updated": datetime.now().isoformat(),
                "version": "1.0"
            },
            "tasks": []
        }
        with open(TASKS_FILE, "w", encoding="utf-8") as f:
            json.dump(initial_data, f, ensure_ascii=False, indent=2)


def load_tasks() -> dict:
    """tasks.json 로드"""
    ensure_tasks_file()
    with open(TASKS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_tasks(data: dict):
    """tasks.json 저장"""
    data["metadata"]["last_updated"] = datetime.now().isoformat()
    with open(TASKS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def generate_task_id(tasks: list) -> str:
    """다음 task ID 생성"""
    if not tasks:
        return "task-001"

    max_num = 0
    for task in tasks:
        try:
            num = int(task["id"].split("-")[1])
            max_num = max(max_num, num)
        except (IndexError, ValueError):
            continue

    return f"task-{max_num + 1:03d}"


def cmd_add(args):
    """Task 추가"""
    data = load_tasks()

    task_id = generate_task_id(data["tasks"])

    new_task = {
        "id": task_id,
        "title": args.title,
        "status": "pending",
        "priority": args.priority or "medium",
        "feature": args.feature or "",
        "dependencies": args.depends.split(",") if args.depends else [],
        "files": args.files.split(",") if args.files else [],
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }

    data["tasks"].append(new_task)
    save_tasks(data)

    print(f"Task 생성됨: {task_id}")
    print(f"  제목: {new_task['title']}")
    print(f"  우선순위: {new_task['priority']}")
    print(f"  기능: {new_task['feature']}")
    if new_task['dependencies']:
        print(f"  의존성: {', '.join(new_task['dependencies'])}")


def cmd_update(args):
    """Task 상태 업데이트"""
    data = load_tasks()

    task_found = False
    for task in data["tasks"]:
        if task["id"] == args.task_id:
            task_found = True

            if args.status:
                old_status = task["status"]
                task["status"] = args.status
                print(f"상태 변경: {old_status} → {args.status}")

            if args.title:
                task["title"] = args.title
                print(f"제목 변경: {args.title}")

            if args.priority:
                task["priority"] = args.priority
                print(f"우선순위 변경: {args.priority}")

            if args.feature:
                task["feature"] = args.feature
                print(f"기능 변경: {args.feature}")

            if args.depends:
                task["dependencies"] = args.depends.split(",") if args.depends else []
                print(f"의존성 변경: {task['dependencies']}")

            if args.files:
                task["files"] = args.files.split(",") if args.files else []
                print(f"파일 변경: {task['files']}")

            if args.blocked_reason:
                task["blocked_reason"] = args.blocked_reason
                print(f"차단 사유: {args.blocked_reason}")

            task["updated_at"] = datetime.now().isoformat()
            break

    if not task_found:
        print(f"Error: Task '{args.task_id}' not found")
        return 1

    save_tasks(data)
    print(f"Task {args.task_id} 업데이트됨")
    return 0


def cmd_list(args):
    """Task 목록 출력"""
    data = load_tasks()
    tasks = data["tasks"]

    # 필터링
    if args.status:
        tasks = [t for t in tasks if t["status"] == args.status]

    if args.feature:
        tasks = [t for t in tasks if t.get("feature") == args.feature]

    if args.priority:
        tasks = [t for t in tasks if t.get("priority") == args.priority]

    if not tasks:
        print("조건에 맞는 Task가 없습니다.")
        return

    # 우선순위 순서
    priority_order = {"high": 0, "medium": 1, "low": 2}
    tasks = sorted(tasks, key=lambda t: (priority_order.get(t.get("priority", "medium"), 1), t["id"]))

    # 상태별 통계
    stats = {"pending": 0, "in_progress": 0, "done": 0, "blocked": 0}
    for t in data["tasks"]:
        stats[t["status"]] = stats.get(t["status"], 0) + 1

    print("=" * 70)
    print(f"📋 Task 목록 (총 {len(data['tasks'])}개)")
    print(f"   pending: {stats['pending']} | in_progress: {stats['in_progress']} | done: {stats['done']} | blocked: {stats['blocked']}")
    print("=" * 70)

    # 상태별 아이콘
    status_icons = {
        "pending": "⬜",
        "in_progress": "🔄",
        "done": "✅",
        "blocked": "🚫"
    }

    priority_icons = {
        "high": "🔴",
        "medium": "🟡",
        "low": "🟢"
    }

    current_priority = None
    for task in tasks:
        priority = task.get("priority", "medium")
        if priority != current_priority:
            current_priority = priority
            print(f"\n{priority_icons.get(priority, '⚪')} {priority.upper()} Priority")
            print("-" * 40)

        status_icon = status_icons.get(task["status"], "⬜")
        feature_str = f" [{task['feature']}]" if task.get("feature") else ""
        deps_str = f" (deps: {', '.join(task['dependencies'])})" if task.get("dependencies") else ""

        print(f"  {status_icon} {task['id']}: {task['title']}{feature_str}{deps_str}")

        if task["status"] == "blocked" and task.get("blocked_reason"):
            print(f"      └─ 차단 사유: {task['blocked_reason']}")

    print()


def cmd_show(args):
    """Task 상세 정보 출력"""
    data = load_tasks()

    task = None
    for t in data["tasks"]:
        if t["id"] == args.task_id:
            task = t
            break

    if not task:
        print(f"Error: Task '{args.task_id}' not found")
        return 1

    status_icons = {
        "pending": "⬜ Pending",
        "in_progress": "🔄 In Progress",
        "done": "✅ Done",
        "blocked": "🚫 Blocked"
    }

    priority_icons = {
        "high": "🔴 High",
        "medium": "🟡 Medium",
        "low": "🟢 Low"
    }

    print("=" * 50)
    print(f"📋 Task: {task['id']}")
    print("=" * 50)
    print(f"제목: {task['title']}")
    print(f"상태: {status_icons.get(task['status'], task['status'])}")
    print(f"우선순위: {priority_icons.get(task.get('priority', 'medium'), task.get('priority'))}")

    if task.get("feature"):
        print(f"기능: {task['feature']}")

    if task.get("dependencies"):
        print(f"의존성: {', '.join(task['dependencies'])}")

    if task.get("files"):
        print(f"파일: {', '.join(task['files'])}")

    if task.get("blocked_reason"):
        print(f"차단 사유: {task['blocked_reason']}")

    print(f"생성일: {task.get('created_at', 'N/A')}")
    print(f"수정일: {task.get('updated_at', 'N/A')}")
    print()

    return 0


def cmd_delete(args):
    """Task 삭제"""
    data = load_tasks()

    original_count = len(data["tasks"])
    data["tasks"] = [t for t in data["tasks"] if t["id"] != args.task_id]

    if len(data["tasks"]) == original_count:
        print(f"Error: Task '{args.task_id}' not found")
        return 1

    save_tasks(data)
    print(f"Task {args.task_id} 삭제됨")
    return 0


def cmd_clear_done(args):
    """완료된 Task 모두 삭제"""
    data = load_tasks()

    done_tasks = [t for t in data["tasks"] if t["status"] == "done"]
    if not done_tasks:
        print("완료된 Task가 없습니다.")
        return 0

    data["tasks"] = [t for t in data["tasks"] if t["status"] != "done"]
    save_tasks(data)

    print(f"완료된 Task {len(done_tasks)}개 삭제됨:")
    for t in done_tasks:
        print(f"  - {t['id']}: {t['title']}")

    return 0


def main():
    parser = argparse.ArgumentParser(
        description="Task Manager CLI - 개발 Task 관리 도구",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )

    subparsers = parser.add_subparsers(dest="command", help="Commands")

    # add 명령어
    add_parser = subparsers.add_parser("add", help="새 Task 추가")
    add_parser.add_argument("--title", "-t", required=True, help="Task 제목")
    add_parser.add_argument("--priority", "-p", choices=["high", "medium", "low"], default="medium", help="우선순위")
    add_parser.add_argument("--feature", "-f", help="관련 기능")
    add_parser.add_argument("--depends", "-d", help="의존성 Task IDs (쉼표 구분)")
    add_parser.add_argument("--files", help="관련 파일 (쉼표 구분)")

    # update 명령어
    update_parser = subparsers.add_parser("update", help="Task 업데이트")
    update_parser.add_argument("task_id", help="Task ID")
    update_parser.add_argument("--status", "-s", choices=["pending", "in_progress", "done", "blocked"], help="상태")
    update_parser.add_argument("--title", "-t", help="제목")
    update_parser.add_argument("--priority", "-p", choices=["high", "medium", "low"], help="우선순위")
    update_parser.add_argument("--feature", "-f", help="관련 기능")
    update_parser.add_argument("--depends", "-d", help="의존성 Task IDs (쉼표 구분)")
    update_parser.add_argument("--files", help="관련 파일 (쉼표 구분)")
    update_parser.add_argument("--blocked-reason", "-b", help="차단 사유")

    # list 명령어
    list_parser = subparsers.add_parser("list", help="Task 목록")
    list_parser.add_argument("--status", "-s", choices=["pending", "in_progress", "done", "blocked"], help="상태 필터")
    list_parser.add_argument("--feature", "-f", help="기능 필터")
    list_parser.add_argument("--priority", "-p", choices=["high", "medium", "low"], help="우선순위 필터")

    # show 명령어
    show_parser = subparsers.add_parser("show", help="Task 상세 정보")
    show_parser.add_argument("task_id", help="Task ID")

    # delete 명령어
    delete_parser = subparsers.add_parser("delete", help="Task 삭제")
    delete_parser.add_argument("task_id", help="Task ID")

    # clear-done 명령어
    clear_parser = subparsers.add_parser("clear-done", help="완료된 Task 모두 삭제")

    args = parser.parse_args()

    if args.command == "add":
        return cmd_add(args)
    elif args.command == "update":
        return cmd_update(args)
    elif args.command == "list":
        return cmd_list(args)
    elif args.command == "show":
        return cmd_show(args)
    elif args.command == "delete":
        return cmd_delete(args)
    elif args.command == "clear-done":
        return cmd_clear_done(args)
    else:
        parser.print_help()
        return 0


if __name__ == "__main__":
    exit(main() or 0)
