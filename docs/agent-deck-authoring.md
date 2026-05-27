# Agent Deck Authoring Guide

This guide explains how humans and AI agents should create DeckX Package source folders. The goal is not to generate one impressive HTML screen; the goal is to produce a presentation package that DeckX Player can reliably preview, present, validate, and share.

## Authoring Goal

A good DeckX package has:

- A clear talk flow for the presenter.
- Audience slides separated from speaker notes.
- All required assets inside the package.
- No dependency on runtime code changes.
- Meaningful search, pacing, validation, and recovery signals in presenter view.

## Required Output

```text
deck-folder/
  manifest.json
  slides/
    001-intro.html
  notes/
    001-intro.md
  styles/
    theme.css
  assets/
    image.png
```

Package that folder into a `.deckx` zip after validation.

## Recommended Agent Workflow

1. Read the package spec and manifest schema.
2. Clarify the audience, purpose, duration, and expected slide count.
3. Plan the slide sequence before writing HTML.
4. Choose one slide pattern for every slide.
5. Create slide fragments under `slides/`.
6. Write speaker notes under `notes/`.
7. Keep images and other media under `assets/`.
8. Connect slides, notes, styles, and metadata through `manifest.json`.
9. Validate the package.
10. Open the resulting `.deckx` in DeckX Player.
11. Check preview, presenter view, slideshow view, notes, and motion controls.

## Pattern-First Authoring

Do not start from arbitrary HTML. Start from the job of the slide, choose a pattern, then write the HTML fragment. Use `examples/deckx-pattern-library` as the local reference deck.

Recommended patterns:

- `cover`: title, promise, and context.
- `section`: reset attention before a new topic.
- `one-message`: one conclusion with minimal support.
- `assertion-evidence`: a sentence claim plus visual proof.
- `comparison`: two or three balanced alternatives.
- `timeline`: three to five named steps.
- `chart-focus`: one chart, one takeaway, one caption.
- `quote`: memorable phrasing with minimal context.
- `code-focus`: one code concept with notes for setup and caveats.

## Slide Rules

- Use HTML fragments, not full HTML documents.
- Do not include `<script>` tags or inline event handlers.
- Keep external dependencies out of Safe Decks.
- Use package-local assets.
- Design for the declared aspect ratio.
- Use the declared canvas pixels or container queries for fixed slide layouts; do not size slide content from viewport units or `window.innerWidth`/`window.innerHeight`.
- Scope package CSS to a unique deck class; do not rely on player default classes such as `slide-body`, and do not style runtime `deckx-*` classes.
- Avoid text overflow and tiny unreadable type.
- Keep one main message per slide.
- Prefer three to five bullets or steps; split the slide when it needs more.
- Use speaker notes for setup, caveats, and transitions instead of crowding the audience slide.
- Keep text/background contrast high enough for projector use.

## Notes Rules

Speaker notes should help the presenter speak. They can include:

- Opening line and transition cues.
- Emphasis points.
- Timing and pacing reminders.
- Demo recovery notes.
- Questions to ask the audience.

Do not put notes-only content into slideshow slides.

## Metadata Rules

Fill out metadata when possible:

- `metadata.language`
- `metadata.authors`
- `metadata.tags`
- `metadata.license`
- `metadata.generator`

This information helps player libraries, future uploads, search surfaces, and AI-generated provenance.

## Agent Checklist

Before marking the deck complete, confirm:

- `manifest.json` is valid.
- Every slide source exists.
- Speaker notes are linked where expected.
- Asset references resolve inside the package.
- Slides do not include scripts or inline event handlers.
- Every slide has a declared pattern and one main message.
- The deck opens in DeckX Player.
- Presenter view and slideshow view both render correctly.

## Related Links

- DeckX Package spec: https://deckx-project.github.io/docs/deckx-package.md
- Manifest schema: https://deckx-project.github.io/docs/deckx-manifest.schema.json
- Korean version: https://deckx-project.github.io/ko/docs/agent-deck-authoring.md
