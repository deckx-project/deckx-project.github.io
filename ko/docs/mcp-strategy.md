# DeckX MCP 전략

이 저장소에는 `mcp/deckx-mcp-server.mjs`에 실험용 로컬 MCP 서버 프로토타입이 있다.

목표는 MCP 통합을 이미 완성된 제품 기능처럼 말하는 것이 아니다. 목표는 DeckX 작성과 검증이 agent에게 충분히 읽기 쉽고 실행 가능한지 확인한 뒤, 유지보수되는 MCP 서버로 제품화할 가치가 있는지 판단하는 것이다.

## 현재 프로토타입

저장소 루트에서 실행한다.

```bash
npm run mcp:server
```

서버는 stdio 기반 JSON-RPC로 동작하며 다음 도구를 제공한다.

- `get_deckx_authoring_context`: `docs/DECKX_PACKAGE.md`, `docs/AGENT_DECK_AUTHORING.md`에서 간결한 작성 컨텍스트를 반환한다.
- `list_official_deckx_examples`: `public/decks` 아래의 패키징된 데모를 나열한다.
- `validate_deckx_package`: `scripts/validate-deckx.mjs`를 호출해 DeckX source folder 또는 `.deckx` 파일을 검증한다.

## 제품화 전 확인할 것

- 일반적인 MCP 클라이언트에서 프로젝트별 shell 가정 없이 동작하는가.
- 도구 응답이 agent context window에 들어갈 만큼 충분히 작고 유용한가.
- 검증 실패 메시지가 DeckX authoring 수정을 직접 유도하는가.
- `llms.txt`와 공개 문서를 읽는 것보다 authoring workflow가 실제로 나은가.

## 랜딩에서의 표현

현재 랜딩은 MCP와 agent skill을 완성된 기능이 아니라 검토 중인 전략으로 표현해야 한다.

## 다음 단계

1. `/llms.txt`와 간결한 package docs를 공개한다.
2. 여러 agent로 DeckX 생성 결과를 비교한다.
3. 반복 가능한 작성 결과가 확인된 뒤 MCP/skill 지원을 제품 문구로 승격한다.

영문 버전: https://deckx-project.github.io/docs/mcp-strategy.md
