# DeckX MCP Strategy

This repository includes an experimental local MCP server prototype at `mcp/deckx-mcp-server.mjs`.

The goal is not to claim a production MCP integration yet. The goal is to make DeckX authoring and validation inspectable by agents, then decide whether a maintained MCP server is worth productizing.

## Current Prototype

Run from the repository root:

```bash
npm run mcp:server
```

The server speaks JSON-RPC over stdio and exposes three tools:

- `get_deckx_authoring_context`: returns concise authoring context from `docs/DECKX_PACKAGE.md` and `docs/AGENT_DECK_AUTHORING.md`.
- `list_official_deckx_examples`: lists packaged demos under `public/decks`.
- `validate_deckx_package`: validates a DeckX source folder or `.deckx` file by calling `scripts/validate-deckx.mjs`.

## Review Criteria

Before presenting MCP as a public product feature, verify:

- The server works from common MCP clients without project-specific shell assumptions.
- Tool responses are compact enough for agent context windows.
- Validation tool failures are clear and actionable.
- The authoring workflow is better than simply reading `llms.txt` and docs.
- Security boundaries are explicit. Validation should only inspect user-selected local files.

## Product Positioning

For now, the landing should say MCP and agent skills are under review, not available as a finished feature.

Possible product path:

1. Publish `/llms.txt` and concise package docs.
2. Keep the local MCP server prototype in the source repository.
3. Test DeckX creation with multiple agents.
4. Promote MCP/skill support only after repeatable authoring outcomes are proven.
