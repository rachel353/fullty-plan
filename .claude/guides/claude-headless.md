# 헤드리스 모드

> 대화형 UI 없이 프로그래밍 방식으로 Claude Code 실행

## 개요

헤드리스 모드를 사용하면 대화형 UI 없이 명령줄 스크립트 및 자동화 도구에서 프로그래밍 방식으로 Claude Code를 실행할 수 있습니다.

## 기본 사용법

Claude Code의 주요 명령줄 인터페이스는 `claude` 명령입니다. `--print`(또는 `-p`) 플래그를 사용하여 비대화형 모드에서 실행하고 최종 결과를 출력합니다:

```bash  theme={null}
claude -p "Stage my changes and write a set of commits for them" \
  --allowedTools "Bash,Read" \
  --permission-mode acceptEdits
```

## 구성 옵션

헤드리스 모드는 Claude Code에서 사용 가능한 모든 CLI 옵션을 활용합니다. 자동화 및 스크립팅을 위한 주요 옵션은 다음과 같습니다:

| 플래그                        | 설명                                                     | 예제                                                                                                                        |
| :------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `--print`, `-p`            | 비대화형 모드에서 실행                                           | `claude -p "query"`                                                                                                       |
| `--output-format`          | 출력 형식 지정 (`text`, `json`, `stream-json`)               | `claude -p --output-format json`                                                                                          |
| `--resume`, `-r`           | 세션 ID로 대화 재개                                           | `claude --resume abc123`                                                                                                  |
| `--continue`, `-c`         | 가장 최근 대화 계속                                            | `claude --continue`                                                                                                       |
| `--verbose`                | 상세 로깅 활성화                                              | `claude --verbose`                                                                                                        |
| `--append-system-prompt`   | 시스템 프롬프트에 추가 (`--print`만 사용 가능)                        | `claude --append-system-prompt "Custom instruction"`                                                                      |
| `--allowedTools`           | 공백으로 구분된 허용 도구 목록 또는 <br /><br /> 쉼표로 구분된 허용 도구 목록 문자열 | `claude --allowedTools mcp__slack mcp__filesystem`<br /><br />`claude --allowedTools "Bash(npm install),mcp__filesystem"` |
| `--disallowedTools`        | 공백으로 구분된 거부 도구 목록 또는 <br /><br /> 쉼표로 구분된 거부 도구 목록 문자열 | `claude --disallowedTools mcp__splunk mcp__github`<br /><br />`claude --disallowedTools "Bash(git commit),mcp__github"`   |
| `--mcp-config`             | JSON 파일에서 MCP 서버 로드                                    | `claude --mcp-config servers.json`                                                                                        |
| `--permission-prompt-tool` | 권한 프롬프트 처리를 위한 MCP 도구 (`--print`만 사용 가능)               | `claude --permission-prompt-tool mcp__auth__prompt`                                                                       |

전체 CLI 옵션 및 기능 목록은 [CLI 참조](/ko/cli-reference) 문서를 참조하세요.

## 다중 턴 대화

다중 턴 대화의 경우 대화를 재개하거나 가장 최근 세션에서 계속할 수 있습니다:

```bash  theme={null}
# 가장 최근 대화 계속
claude --continue "Now refactor this for better performance"

# 세션 ID로 특정 대화 재개
claude --resume 550e8400-e29b-41d4-a716-446655440000 "Update the tests"

# 비대화형 모드에서 재개
claude --resume 550e8400-e29b-41d4-a716-446655440000 "Fix all linting issues" --no-interactive
```

## 출력 형식

### 텍스트 출력 (기본값)

```bash  theme={null}
claude -p "Explain file src/components/Header.tsx"
# Output: This is a React component showing...
```

### JSON 출력

메타데이터를 포함한 구조화된 데이터를 반환합니다:

```bash  theme={null}
claude -p "How does the data layer work?" --output-format json
```

응답 형식:

```json  theme={null}
{
  "type": "result",
  "subtype": "success",
  "total_cost_usd": 0.003,
  "is_error": false,
  "duration_ms": 1234,
  "duration_api_ms": 800,
  "num_turns": 6,
  "result": "The response text here...",
  "session_id": "abc123"
}
```

### 스트리밍 JSON 출력

수신되는 각 메시지를 스트리밍합니다:

```bash  theme={null}
claude -p "Build an application" --output-format stream-json
```

각 대화는 초기 `init` 시스템 메시지로 시작하고, 사용자 및 어시스턴트 메시지 목록이 뒤따르며, 통계가 포함된 최종 `result` 시스템 메시지로 끝납니다. 각 메시지는 별도의 JSON 객체로 내보내집니다.

## 입력 형식

### 텍스트 입력 (기본값)

```bash  theme={null}
# 직접 인수
claude -p "Explain this code"

# stdin에서
echo "Explain this code" | claude -p
```

### 스트리밍 JSON 입력

`stdin`을 통해 제공되는 메시지 스트림으로, 각 메시지는 사용자 턴을 나타냅니다. 이를 통해 `claude` 바이너리를 다시 시작하지 않고도 여러 턴의 대화가 가능하며, 모델이 요청을 처리하는 동안 지침을 제공할 수 있습니다.

각 메시지는 JSON '사용자 메시지' 객체이며, 출력 메시지 스키마와 동일한 형식을 따릅니다. 메시지는 [jsonl](https://jsonlines.org/) 형식을 사용하여 포맷되며, 입력의 각 줄은 완전한 JSON 객체입니다. 스트리밍 JSON 입력에는 `-p` 및 `--output-format stream-json`이 필요합니다.

```bash  theme={null}
echo '{"type":"user","message":{"role":"user","content":[{"type":"text","text":"Explain this code"}]}}' | claude -p --output-format=stream-json --input-format=stream-json --verbose
```

## 에이전트 통합 예제

### SRE 인시던트 대응 봇

```bash  theme={null}
#!/bin/bash

# 자동화된 인시던트 대응 에이전트
investigate_incident() {
    local incident_description="$1"
    local severity="${2:-medium}"

    claude -p "Incident: $incident_description (Severity: $severity)" \
      --append-system-prompt "You are an SRE expert. Diagnose the issue, assess impact, and provide immediate action items." \
      --output-format json \
      --allowedTools "Bash,Read,WebSearch,mcp__datadog" \
      --mcp-config monitoring-tools.json
}

# 사용법
investigate_incident "Payment API returning 500 errors" "high"
```

### 자동화된 보안 검토

```bash  theme={null}
# 풀 요청에 대한 보안 감사 에이전트
audit_pr() {
    local pr_number="$1"

    gh pr diff "$pr_number" | claude -p \
      --append-system-prompt "You are a security engineer. Review this PR for vulnerabilities, insecure patterns, and compliance issues." \
      --output-format json \
      --allowedTools "Read,Grep,WebSearch"
}

# 사용법 및 파일에 저장
audit_pr 123 > security-report.json
```

### 다중 턴 법률 어시스턴트

```bash  theme={null}
# 세션 지속성이 있는 법률 문서 검토
session_id=$(claude -p "Start legal review session" --output-format json | jq -r '.session_id')

# 여러 단계에서 계약 검토
claude -p --resume "$session_id" "Review contract.pdf for liability clauses"
claude -p --resume "$session_id" "Check compliance with GDPR requirements"
claude -p --resume "$session_id" "Generate executive summary of risks"
```

## 모범 사례

* **JSON 출력 형식 사용** 응답의 프로그래밍 방식 파싱:

  ```bash  theme={null}
  # jq를 사용하여 JSON 응답 파싱
  result=$(claude -p "Generate code" --output-format json)
  code=$(echo "$result" | jq -r '.result')
  cost=$(echo "$result" | jq -r '.cost_usd')
  ```

* **오류를 우아하게 처리** - 종료 코드 및 stderr 확인:

  ```bash  theme={null}
  if ! claude -p "$prompt" 2>error.log; then
      echo "Error occurred:" >&2
      cat error.log >&2
      exit 1
  fi
  ```

* **세션 관리 사용** 다중 턴 대화에서 컨텍스트 유지

* **장시간 실행되는 작업에 대한 타임아웃 고려**:

  ```bash  theme={null}
  timeout 300 claude -p "$complex_prompt" || echo "Timed out after 5 minutes"
  ```

* **여러 요청을 할 때 속도 제한 준수** 호출 간에 지연 추가

## 관련 리소스

* [CLI 사용 및 제어](/ko/cli-reference) - 완전한 CLI 문서
* [일반적인 워크플로우](/ko/common-workflows) - 일반적인 사용 사례에 대한 단계별 가이드


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://code.claude.com/docs/llms.txt