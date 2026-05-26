# Design System Builder

`index.css`에서 디자인 토큰을 추출하여 6가지 Semantic State로 매핑하는 스킬.

## 사용법

```bash
# 스킬 실행
/design-system-builder

# 또는 스크립트 직접 실행
python .claude/skills/design-system-builder/scripts/generate_design_system.py
```

## 출력 파일

| 파일 | 용도 |
|------|------|
| `.claude/rules/design_system_rules.mdc` | 디자인 가이드라인 |
| `app/globals.css` | Semantic 유틸리티 클래스 |
| `docs/semantic_state_mappings.json` | 토큰 매핑 참조 |

## Semantic States

- **info**: 정보, 중립 (accent)
- **action**: 주요 액션 (primary)
- **success**: 성공 (secondary)
- **warning**: 경고 (chart-4)
- **danger**: 오류 (destructive)
- **frozen**: 비활성 (muted)

## 컴포넌트 사용 예시

```tsx
<button className="bg-action text-action-foreground">Submit</button>
<button className="bg-danger text-danger-foreground">Delete</button>
<div className="bg-success text-success-foreground border border-success">Success</div>
```

자세한 내용은 [SKILL.md](SKILL.md) 참조.
