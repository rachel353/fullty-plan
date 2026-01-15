# File Priority & Context Rules

## Source Priority Order

항상 다음 우선순위로 소스 파일을 읽고 처리:

```
1. note.md (최우선)
2. 이전 미팅 outputs (summary.md, requirements.md)
3. script.md (현재 미팅 스크립트)
4. appendix/*.md (부록 자료)
```

## note.md Handling

### When note.md Exists
- **반드시 먼저 읽기**
- script.md 내용보다 우선 적용
- 수정사항, override 지시, 특별 처리 사항 포함
- 모든 sub-workflow에 note.md 컨텍스트 유지

### note.md Use Cases
- 스크립트 인식 오류 수정
- 특정 내용 override 지시
- 추가 컨텍스트 제공
- 처리 방식 특별 지시

## Prior Meetings Context

### Loading Strategy
1. `meeting_scripts/` 하위 폴더 목록 확인
2. 현재 미팅 이전 날짜의 폴더들 식별
3. 각 폴더에서 `summary.md`, `requirements.md` 로드
4. 시간순 정렬하여 컨텍스트 구축

### Context Use
- 기존 합의사항 파악
- REQ ID 연속성 유지
- 용어/개념 일관성 유지
- 변경사항 추적

## Appendix Files

### Location
`appendix/*.md` - 클라이언트 폴더 루트

### Use Cases
- 기술 문서
- 기존 시스템 정보
- 참고 자료
- 보충 설명

### Priority
- note.md, prior meetings, script.md 이후 참조
- 명확화 목적으로만 사용
- 주요 결정사항 소스로 사용 금지

## Best Practices

1. **교차 검증**: 스크립트 인식 오류 가능성 → 이전 미팅과 비교
2. **클라이언트 발언 우선**: 개발자 제안보다 클라이언트 동의 내용 우선
3. **명시적 합의만**: "~할 것 같다", "~검토해보자" 등 불확실 표현 제외
4. **수동 노트 보존**: 재실행 시 덮어쓰기 → 수동 수정은 note.md에 유지
