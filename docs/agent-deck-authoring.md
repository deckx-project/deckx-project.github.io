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
2. Plan the slide sequence before writing HTML.
3. Create slide fragments under `slides/`.
4. Write speaker notes under `notes/`.
5. Keep images and other media under `assets/`.
6. Connect slides, notes, styles, and metadata through `manifest.json`.
7. Validate the package.
8. Open the resulting `.deckx` in DeckX Player.
9. Check preview, presenter view, slideshow view, notes, and motion controls.

## Slide Rules

- Use HTML fragments, not full HTML documents.
- Do not include `<script>` tags or inline event handlers.
- Keep external dependencies out of Safe Decks.
- Use package-local assets.
- Design for the declared aspect ratio.
- Avoid text overflow and tiny unreadable type.

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
- The deck opens in DeckX Player.
- Presenter view and slideshow view both render correctly.

## Related Links

- DeckX Package spec: https://deckx-project.github.io/docs/deckx-package.md
- Manifest schema: https://deckx-project.github.io/docs/deckx-manifest.schema.json
- Korean version: https://deckx-project.github.io/ko/docs/agent-deck-authoring.md
