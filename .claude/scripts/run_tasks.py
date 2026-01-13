#!/usr/bin/env python3
"""
Task Runner - Claude Headless를 사용한 자동 Task 실행 스크립트

Usage:
    python3 .claude/scripts/run_tasks.py              # 모든 ready task 순차 실행
    python3 .claude/scripts/run_tasks.py --task task-001   # 특정 task만 실행
    python3 .claude/scripts/run_tasks.py --dry-run    # 실행할 task 목록만 출력
    python3 .claude/scripts/run_tasks.py --limit 3    # 최대 3개 task만 실행
"""

import argparse
import json
import subprocess
import sys
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
TASKS_FILE = PROJECT_ROOT / "tasks" / "tasks.json"
USER_STORIES_FILE = PROJECT_ROOT / "docs" / "user_stories_data.json"
LOGS_DIR = PROJECT_ROOT / "tasks" / "logs"

# User Stories 캐시
_user_stories_cache: Optional[dict] = None


def load_tasks() -> dict:
    """tasks.json 로드"""
    with open(TASKS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def load_user_stories() -> dict:
    """user_stories_data.json 로드 (캐시 사용)"""
    global _user_stories_cache
    if _user_stories_cache is None:
        if USER_STORIES_FILE.exists():
            with open(USER_STORIES_FILE, "r", encoding="utf-8") as f:
                _user_stories_cache = json.load(f)
        else:
            _user_stories_cache = {"user_stories": []}
    return _user_stories_cache


def get_user_stories_by_ids(story_ids: list[str]) -> list[dict]:
    """User Story ID 목록으로 해당 스토리들을 조회"""
    if not story_ids:
        return []
    
    data = load_user_stories()
    stories = data.get("user_stories", [])
    
    result = []
    for story in stories:
        if story.get("id") in story_ids:
            result.append(story)
    
    return result


def format_user_stories_for_prompt(story_ids: list[str]) -> str:
    """User Story들을 프롬프트용 문자열로 포맷"""
    stories = get_user_stories_by_ids(story_ids)
    
    if not stories:
        return ""
    
    lines = ["## 관련 User Stories\n"]
    
    for story in stories:
        lines.append(f"### {story['id']}: {story.get('domain', '')}")
        lines.append(f"**Story**: {story['story']}")
        lines.append(f"**Priority**: {story.get('priority', 'N/A')}")
        lines.append("")
        lines.append("**Acceptance Criteria**:")
        for ac in story.get("acceptance_criteria", []):
            lines.append(f"- {ac}")
        lines.append("")
    
    return "\n".join(lines)


def get_completed_task_ids(tasks: list) -> set:
    """완료된 task ID 집합 반환"""
    return {t["id"] for t in tasks if t["status"] == "completed"}


def get_ready_tasks(tasks: list) -> list:
    """의존성이 충족된 pending task 목록 반환 (우선순위 순)"""
    completed_ids = get_completed_task_ids(tasks)
    ready = []

    priority_order = {"high": 0, "medium": 1, "low": 2}

    for task in tasks:
        if task["status"] != "pending":
            continue

        deps = set(task.get("dependencies", []))
        if deps.issubset(completed_ids):
            ready.append(task)

    # 우선순위 순 정렬
    ready.sort(key=lambda t: (priority_order.get(t.get("priority", "medium"), 1), t["id"]))
    return ready


def get_task_by_id(tasks: list, task_id: str) -> Optional[dict]:
    """ID로 task 조회"""
    for task in tasks:
        if task["id"] == task_id:
            return task
    return None


def check_dependencies(task: dict, tasks: list) -> tuple[bool, list]:
    """의존성 체크. (충족 여부, 미완료 의존성 목록) 반환"""
    completed_ids = get_completed_task_ids(tasks)
    deps = set(task.get("dependencies", []))
    missing = deps - completed_ids
    return len(missing) == 0, list(missing)


# UI 관련 Feature 키워드 목록
UI_FEATURES = [
    "공통 컴포넌트", "UI", "컴포넌트", "페이지", "화면",
    "사용자 플로우", "폼", "레이아웃", "대시보드", "관리자"
]


def is_ui_task(task: dict) -> bool:
    """Task가 UI 개발이 필요한지 판별"""
    # 명시적 type 필드가 있으면 사용
    task_type = task.get("type", "")
    if task_type == "ui":
        return True
    if task_type in ["api", "config"]:
        return False

    # feature 키워드로 판별
    feature = task.get("feature", "")
    return any(keyword in feature for keyword in UI_FEATURES)


def build_ui_prompt(task: dict) -> str:
    """UI Task용 프롬프트 생성 - frontend-feature-develop 스킬 순차 호출"""
    files = task.get("files", [])
    user_story_ids = task.get("userStories", [])
    
    # User Stories 섹션 생성
    user_stories_section = format_user_stories_for_prompt(user_story_ids)

    prompt = f"""다음 UI Task를 frontend-feature-develop 스킬을 사용해서 개발해줘.

## 주의사항 
@global.css, design system rules, @components.json 파일을 반드시 따라서 개발해 주세요.

## Task 정보
- **ID**: {task['id']}
- **제목**: {task['title']}
- **기능**: {task.get('feature', '')}
- **우선순위**: {task.get('priority', 'medium')}
- **파일**: {', '.join(files)}
- **설명**: {task.get('description', '')}

### Acceptance Criteria
{chr(10).join(f"- {ac}" for ac in task.get('acceptanceCriteria', []))}

{user_stories_section}
## 실행 순서
아래 스킬을 순서대로 호출해서 Task를 완료해줘:

1. `/frontend-feature-develop:1_dev_spec` - 개발 명세 구체화
2. `/frontend-feature-develop:2_ui_ux_plan` - UI/UX 계획
3. `/frontend-feature-develop:3_schema_mock` - Schema & Mock Data
4. `/frontend-feature-develop:4_ui_dev` - UI 개발

## 참고 문서
- docs/user_stories.md
- docs/ia_structure.md
- docs/logical_architecture.md
- docs/conceptual_model.md

## 완료 조건
모든 단계가 완료되면: `python3 scripts/task_manager.py update {task['id']} --status completed`
"""
    return prompt


def build_api_prompt(task: dict) -> str:
    """API Task용 프롬프트 생성"""
    files = task.get("files", [])

    prompt = f"""다음 API Task를 구현해줘:

## Task 정보
- **ID**: {task['id']}
- **제목**: {task['title']}
- **기능**: {task.get('feature', '')}
- **우선순위**: {task.get('priority', 'medium')}
- **파일**: {', '.join(files)}

## 구현 지침
1. API 엔드포인트를 구현해줘
2. 입력 유효성 검증 포함
3. 적절한 에러 처리
4. TypeScript 타입 정의 포함
5. HTTP 상태 코드 올바르게 사용

## 참고 문서
- docs/user_stories.md
- docs/logical_architecture.md
- docs/conceptual_model.md

## 완료 조건
구현 완료 후: `python3 scripts/task_manager.py update {task['id']} --status completed`
"""
    return prompt


def build_config_prompt(task: dict) -> str:
    """Config Task용 프롬프트 생성"""
    files = task.get("files", [])

    prompt = f"""다음 설정 Task를 구현해줘:

## Task 정보
- **ID**: {task['id']}
- **제목**: {task['title']}
- **기능**: {task.get('feature', '')}
- **우선순위**: {task.get('priority', 'medium')}
- **파일**: {', '.join(files)}

## 구현 지침
1. 설정 파일을 생성/수정해줘
2. 필요한 의존성 설치
3. 환경 변수 설정 (필요시)

## 완료 조건
설정 완료 후: `python3 scripts/task_manager.py update {task['id']} --status completed`
"""
    return prompt


def build_prompt(task: dict) -> str:
    """Task 타입에 따라 적절한 프롬프트 생성"""
    task_type = task.get("type", "")
    feature = task.get("feature", "")

    # UI Task
    if is_ui_task(task):
        return build_ui_prompt(task)

    # API Task
    if task_type == "api" or "API" in feature or "엔드포인트" in feature:
        return build_api_prompt(task)

    # Config Task
    if task_type == "config" or "설정" in feature or "프로젝트 설정" in feature:
        return build_config_prompt(task)

    # 기본: UI로 간주
    return build_ui_prompt(task)


def execute_task(task: dict, dry_run: bool = False) -> bool:
    """Claude headless로 task 실행"""
    task_id = task["id"]
    title = task["title"]

    print(f"\n{'='*60}")
    print(f"Task: {task_id} - {title}")
    print(f"{'='*60}")

    if dry_run:
        print("[DRY RUN] 실행하지 않음")
        return True

    prompt = build_prompt(task)

    # 로그 디렉토리 생성
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    log_file = LOGS_DIR / f"{task_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

    print(f"프롬프트:\n{prompt[:200]}...")
    print(f"\n실행 중... (로그: {log_file})")

    try:
        # Claude headless 실행
        result = subprocess.run(
            [
                "claude",
                "-p", prompt,
                "--allowedTools", "Read,Write,Edit,Bash,Glob,Grep"
            ],
            capture_output=True,
            text=True,
            cwd=str(PROJECT_ROOT),
            timeout=600  # 10분 타임아웃
        )

        # 로그 저장
        with open(log_file, "w", encoding="utf-8") as f:
            f.write(f"Task: {task_id}\n")
            f.write(f"Title: {title}\n")
            f.write(f"Timestamp: {datetime.now().isoformat()}\n")
            f.write(f"{'='*60}\n\n")
            f.write("PROMPT:\n")
            f.write(prompt)
            f.write(f"\n{'='*60}\n\n")
            f.write("STDOUT:\n")
            f.write(result.stdout)
            f.write(f"\n{'='*60}\n\n")
            f.write("STDERR:\n")
            f.write(result.stderr)
            f.write(f"\n{'='*60}\n")
            f.write(f"Return Code: {result.returncode}\n")

        if result.returncode == 0:
            print(f"완료: {task_id}")
            return True
        else:
            print(f"실패: {task_id} (return code: {result.returncode})")
            print(f"stderr: {result.stderr[:500]}")
            return False

    except subprocess.TimeoutExpired:
        print(f"타임아웃: {task_id}")
        return False
    except FileNotFoundError:
        print("오류: 'claude' CLI를 찾을 수 없습니다.")
        print("Claude Code가 설치되어 있는지 확인하세요.")
        return False
    except Exception as e:
        print(f"오류: {e}")
        return False


def run_single_task(task_id: str, dry_run: bool = False) -> bool:
    """특정 task 실행"""
    data = load_tasks()
    tasks = data["tasks"]

    task = get_task_by_id(tasks, task_id)
    if not task:
        print(f"오류: Task '{task_id}'를 찾을 수 없습니다.")
        return False

    # 의존성 체크
    deps_ok, missing = check_dependencies(task, tasks)
    if not deps_ok:
        print(f"오류: 의존성 미충족 - {missing}")
        return False

    if task["status"] == "completed":
        print(f"Task '{task_id}'는 이미 완료되었습니다.")
        return True

    return execute_task(task, dry_run)


def run_all_ready_tasks(limit: int = 0, dry_run: bool = False) -> tuple[int, int]:
    """모든 ready task 순차 실행. (성공, 실패) 카운트 반환"""
    data = load_tasks()
    tasks = data["tasks"]

    ready = get_ready_tasks(tasks)

    if not ready:
        print("실행할 수 있는 Task가 없습니다.")
        print("(모든 pending task의 의존성이 충족되지 않았거나, 남은 task가 없습니다)")
        return 0, 0

    if limit > 0:
        ready = ready[:limit]

    print(f"\n실행 예정 Task ({len(ready)}개):")
    for t in ready:
        deps = t.get("dependencies", [])
        deps_str = f" (deps: {', '.join(deps)})" if deps else ""
        print(f"  - {t['id']}: {t['title']}{deps_str}")

    if dry_run:
        print("\n[DRY RUN] 실제 실행하지 않음")
        return len(ready), 0

    print("\n" + "="*60)
    input("Enter를 눌러 실행 시작... (Ctrl+C로 취소)")
    print("="*60)

    success = 0
    failed = 0

    for task in ready:
        result = execute_task(task, dry_run=False)
        if result:
            success += 1
        else:
            failed += 1
            # 실패 시 중단 여부 확인
            try:
                cont = input("\n실패했습니다. 계속하시겠습니까? (y/N): ")
                if cont.lower() != 'y':
                    print("중단됨")
                    break
            except KeyboardInterrupt:
                print("\n중단됨")
                break

    return success, failed


def show_status():
    """현재 task 상태 요약 출력"""
    data = load_tasks()
    tasks = data["tasks"]

    stats = {"pending": 0, "in_progress": 0, "completed": 0, "blocked": 0}
    for t in tasks:
        stats[t["status"]] = stats.get(t["status"], 0) + 1

    ready = get_ready_tasks(tasks)

    print("\n" + "="*50)
    print("Task 현황")
    print("="*50)
    print(f"총: {len(tasks)}개")
    print(f"  - 완료: {stats['completed']}개")
    print(f"  - 진행중: {stats['in_progress']}개")
    print(f"  - 대기: {stats['pending']}개")
    print(f"  - 차단: {stats['blocked']}개")
    print(f"\n실행 가능 (의존성 충족): {len(ready)}개")

    if ready:
        print("\n다음 실행 대상:")
        for t in ready[:5]:
            print(f"  - {t['id']}: {t['title']}")
        if len(ready) > 5:
            print(f"  ... 외 {len(ready) - 5}개")


def main():
    parser = argparse.ArgumentParser(
        description="Task Runner - Claude Headless 자동 실행",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )

    parser.add_argument(
        "--task", "-t",
        help="특정 task ID만 실행"
    )
    parser.add_argument(
        "--dry-run", "-n",
        action="store_true",
        help="실행하지 않고 대상 task만 출력"
    )
    parser.add_argument(
        "--limit", "-l",
        type=int,
        default=0,
        help="최대 실행할 task 수 (0=무제한)"
    )
    parser.add_argument(
        "--status", "-s",
        action="store_true",
        help="현재 상태만 출력"
    )

    args = parser.parse_args()

    if not TASKS_FILE.exists():
        print(f"오류: {TASKS_FILE} 파일이 없습니다.")
        print("먼저 dev-planner로 task를 생성하세요.")
        return 1

    if args.status:
        show_status()
        return 0

    if args.task:
        success = run_single_task(args.task, args.dry_run)
        return 0 if success else 1
    else:
        success, failed = run_all_ready_tasks(args.limit, args.dry_run)
        print(f"\n완료: 성공 {success}개, 실패 {failed}개")
        return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main() or 0)
