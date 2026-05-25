# Packaging Strategy

DeckX Player is a presentation runtime, not a deck editor. Packaging therefore needs to separate two concerns:

- Software distribution: how the player is deployed and updated.
- Deck distribution: how a presentation package is shared and opened.

## Recommendation

The default model is **hosted player + `.deckx` deck URL**.

```text
https://deckx-project.github.io/player
  -> open deck.deckx
```

This keeps the player update path independent from deck distribution. A deck can be shared as one `.deckx` file or URL, while the runtime remains hosted and updateable.

## Why Not Bundle Everything Together

Bundling the player and every deck into one zip is convenient for demos, but it strongly couples runtime updates and deck delivery. That makes fixes, accessibility improvements, analytics, and security changes harder to roll out.

## Hosted Player Model

Benefits:

- One player URL can open many DeckX packages.
- Bug fixes and runtime improvements ship once.
- Deck authors can share a package URL without rebuilding the player.
- SEO, GEO, analytics, and public docs stay centralized.

Tradeoffs:

- The deck package must be reachable by the browser.
- Offline events need a separate export story.
- Large assets need careful package and loading behavior.

## Portable Show Package

For offline presentation rooms, DeckX can later provide a portable show package. That should be a separate export mode, not the default model.

Potential portable output:

```text
deckx-show/
  index.html
  player-assets/
  deck.deckx
```

## Public Discovery

Search engines and AI answer engines should read the hosted landing, `llms.txt`, public package docs, and sitemap. The canonical discovery surface is English, with Korean equivalents published under `/ko/`.

## Related Links

- DeckX Package spec: https://deckx-project.github.io/docs/deckx-package.md
- MCP strategy: https://deckx-project.github.io/docs/mcp-strategy.md
- Korean version: https://deckx-project.github.io/ko/docs/packaging-strategy.md
