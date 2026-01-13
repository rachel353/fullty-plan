# Claude Code 훅 시작하기

> 셸 명령어를 등록하여 Claude Code의 동작을 사용자 정의하고 확장하는 방법을 알아봅니다

Claude Code 훅은 Claude Code의 라이프사이클의 다양한 지점에서 실행되는 사용자 정의 셸 명령어입니다. 훅은 Claude Code의 동작에 대한 결정론적 제어를 제공하여 LLM이 실행하도록 선택하는 것에 의존하기보다는 특정 작업이 항상 발생하도록 보장합니다.

<Tip>
  훅에 대한 참고 문서는 [훅 참고](/ko/hooks)를 참조하세요.
</Tip>

훅의 예시 사용 사례는 다음과 같습니다:

* **알림**: Claude Code가 입력을 기다리거나 무언가를 실행할 권한을 기다릴 때 알림을 받는 방식을 사용자 정의합니다.
* **자동 포맷팅**: 모든 파일 편집 후 .ts 파일에 `prettier`를 실행하고, .go 파일에 `gofmt`를 실행하는 등의 작업을 수행합니다.
* **로깅**: 규정 준수 또는 디버깅을 위해 실행된 모든 명령어를 추적하고 계산합니다.
* **피드백**: Claude Code가 코드베이스 규칙을 따르지 않는 코드를 생성할 때 자동화된 피드백을 제공합니다.
* **사용자 정의 권한**: 프로덕션 파일 또는 민감한 디렉토리에 대한 수정을 차단합니다.

이러한 규칙을 프롬프트 지시사항이 아닌 훅으로 인코딩하면 제안을 매번 예상대로 실행되는 앱 수준의 코드로 변환합니다.

<Warning>
  훅을 추가할 때 훅의 보안 영향을 고려해야 합니다. 훅은 현재 환경의 자격 증명으로 에이전트 루프 중에 자동으로 실행되기 때문입니다.
  예를 들어, 악의적인 훅 코드는 데이터를 유출할 수 있습니다. 훅을 등록하기 전에 항상 훅 구현을 검토하세요.

  전체 보안 모범 사례는 훅 참고 문서의 [보안 고려사항](/ko/hooks#security-considerations)을 참조하세요.
</Warning>

## 훅 이벤트 개요

Claude Code는 워크플로우의 다양한 지점에서 실행되는 여러 훅 이벤트를 제공합니다:

* **PreToolUse**: 도구 호출 전에 실행됩니다(차단 가능).
* **PostToolUse**: 도구 호출 완료 후 실행됩니다.
* **UserPromptSubmit**: 사용자가 프롬프트를 제출할 때, Claude가 처리하기 전에 실행됩니다.
* **Notification**: Claude Code가 알림을 보낼 때 실행됩니다.
* **Stop**: Claude Code가 응답을 마칠 때 실행됩니다.
* **SubagentStop**: 서브에이전트 작업이 완료될 때 실행됩니다.
* **PreCompact**: Claude Code가 컴팩트 작업을 실행하려고 할 때 실행됩니다.
* **SessionStart**: Claude Code가 새 세션을 시작하거나 기존 세션을 재개할 때 실행됩니다.
* **SessionEnd**: Claude Code 세션이 종료될 때 실행됩니다.

각 이벤트는 다른 데이터를 수신하며 Claude의 동작을 다양한 방식으로 제어할 수 있습니다.

## 빠른 시작

이 빠른 시작에서는 Claude Code가 실행하는 셸 명령어를 기록하는 훅을 추가합니다.

### 필수 조건

명령줄에서 JSON 처리를 위해 `jq`를 설치합니다.

### 1단계: 훅 구성 열기

`/hooks` [슬래시 명령어](/ko/slash-commands)를 실행하고 `PreToolUse` 훅 이벤트를 선택합니다.

`PreToolUse` 훅은 도구 호출 전에 실행되며 Claude에 다르게 수행할 작업에 대한 피드백을 제공하면서 차단할 수 있습니다.

### 2단계: 매처 추가

`+ Add new matcher…`를 선택하여 Bash 도구 호출에서만 훅을 실행합니다.

매처에 `Bash`를 입력합니다.

<Note>모든 도구를 일치시키려면 `*`를 사용할 수 있습니다.</Note>

### 3단계: 훅 추가

`+ Add new hook…`를 선택하고 다음 명령어를 입력합니다:

```bash  theme={null}
jq -r '"\(.tool_input.command) - \(.tool_input.description // "No description")"' >> ~/.claude/bash-command-log.txt
```

### 4단계: 구성 저장

저장 위치로 `User settings`를 선택합니다. 홈 디렉토리에 로깅하고 있기 때문입니다. 이 훅은 현재 프로젝트뿐만 아니라 모든 프로젝트에 적용됩니다.

그런 다음 REPL로 돌아올 때까지 Esc를 누릅니다. 훅이 이제 등록되었습니다!

### 5단계: 훅 확인

`/hooks`를 다시 실행하거나 `~/.claude/settings.json`을 확인하여 구성을 봅니다:

```json  theme={null}
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '\"\\(.tool_input.command) - \\(.tool_input.description // \"No description\")\"' >> ~/.claude/bash-command-log.txt"
          }
        ]
      }
    ]
  }
}
```

### 6단계: 훅 테스트

Claude에 `ls`와 같은 간단한 명령어를 실행하도록 요청하고 로그 파일을 확인합니다:

```bash  theme={null}
cat ~/.claude/bash-command-log.txt
```

다음과 같은 항목이 표시되어야 합니다:

```
ls - Lists files and directories
```

## 더 많은 예제

<Note>
  완전한 예제 구현은 공개 코드베이스의 [bash 명령어 검증 예제](https://github.com/anthropics/claude-code/blob/main/examples/hooks/bash_command_validator_example.py)를 참조하세요.
</Note>

### 코드 포맷팅 훅

편집 후 TypeScript 파일을 자동으로 포맷팅합니다:

```json  theme={null}
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | { read file_path; if echo \"$file_path\" | grep -q '\\.ts$'; then npx prettier --write \"$file_path\"; fi; }"
          }
        ]
      }
    ]
  }
}
```

### 마크다운 포맷팅 훅

마크다운 파일의 누락된 언어 태그 및 포맷팅 문제를 자동으로 수정합니다:

```json  theme={null}
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/markdown_formatter.py"
          }
        ]
      }
    ]
  }
}
```

다음 내용으로 `.claude/hooks/markdown_formatter.py`를 만듭니다:

````python  theme={null}
#!/usr/bin/env python3
"""
Markdown formatter for Claude Code output.
Fixes missing language tags and spacing issues while preserving code content.
"""
import json
import sys
import re
import os

def detect_language(code):
    """Best-effort language detection from code content."""
    s = code.strip()
    
    # JSON detection
    if re.search(r'^\s*[{\[]', s):
        try:
            json.loads(s)
            return 'json'
        except:
            pass
    
    # Python detection
    if re.search(r'^\s*def\s+\w+\s*\(', s, re.M) or \
       re.search(r'^\s*(import|from)\s+\w+', s, re.M):
        return 'python'
    
    # JavaScript detection  
    if re.search(r'\b(function\s+\w+\s*\(|const\s+\w+\s*=)', s) or \
       re.search(r'=>|console\.(log|error)', s):
        return 'javascript'
    
    # Bash detection
    if re.search(r'^#!.*\b(bash|sh)\b', s, re.M) or \
       re.search(r'\b(if|then|fi|for|in|do|done)\b', s):
        return 'bash'
    
    # SQL detection
    if re.search(r'\b(SELECT|INSERT|UPDATE|DELETE|CREATE)\s+', s, re.I):
        return 'sql'
        
    return 'text'

def format_markdown(content):
    """Format markdown content with language detection."""
    # Fix unlabeled code fences
    def add_lang_to_fence(match):
        indent, info, body, closing = match.groups()
        if not info.strip():
            lang = detect_language(body)
            return f"{indent}```{lang}\n{body}{closing}\n"
        return match.group(0)
    
    fence_pattern = r'(?ms)^([ \t]{0,3})```([^\n]*)\n(.*?)(\n\1```)\s*$'
    content = re.sub(fence_pattern, add_lang_to_fence, content)
    
    # Fix excessive blank lines (only outside code fences)
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    return content.rstrip() + '\n'

# Main execution
try:
    input_data = json.load(sys.stdin)
    file_path = input_data.get('tool_input', {}).get('file_path', '')
    
    if not file_path.endswith(('.md', '.mdx')):
        sys.exit(0)  # Not a markdown file
    
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        formatted = format_markdown(content)
        
        if formatted != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(formatted)
            print(f"✓ Fixed markdown formatting in {file_path}")
    
except Exception as e:
    print(f"Error formatting markdown: {e}", file=sys.stderr)
    sys.exit(1)
````

스크립트를 실행 가능하게 만듭니다:

```bash  theme={null}
chmod +x .claude/hooks/markdown_formatter.py
```

이 훅은 자동으로:

* 레이블이 없는 코드 블록에서 프로그래밍 언어를 감지합니다
* 구문 강조를 위해 적절한 언어 태그를 추가합니다
* 코드 내용을 보존하면서 과도한 빈 줄을 수정합니다
* 마크다운 파일(`.md`, `.mdx`)만 처리합니다

### 사용자 정의 알림 훅

Claude가 입력이 필요할 때 데스크톱 알림을 받습니다:

```json  theme={null}
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' 'Awaiting your input'"
          }
        ]
      }
    ]
  }
}
```

### 파일 보호 훅

민감한 파일에 대한 편집을 차단합니다:

```json  theme={null}
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "python3 -c \"import json, sys; data=json.load(sys.stdin); path=data.get('tool_input',{}).get('file_path',''); sys.exit(2 if any(p in path for p in ['.env', 'package-lock.json', '.git/']) else 0)\""
          }
        ]
      }
    ]
  }
}
```

## 더 알아보기

* 훅에 대한 참고 문서는 [훅 참고](/ko/hooks)를 참조하세요.
* 포괄적인 보안 모범 사례 및 안전 지침은 훅 참고 문서의 [보안 고려사항](/ko/hooks#security-considerations)을 참조하세요.
* 문제 해결 단계 및 디버깅 기법은 훅 참고 문서의 [디버깅](/ko/hooks#debugging)을 참조하세요.


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://code.claude.com/docs/llms.txt