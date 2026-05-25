# DeckX Package

DeckX Package is the presentation file format opened by DeckX Player. The project is a player, not a deck editor, so the package spec gives humans and agents a stable contract for creating presentations that can be opened, validated, shared, and presented.

DeckX means **Deck eXchange Package**. The point is to keep the expressive power of HTML presentations while treating a deck as an exchangeable file instead of runtime-specific source code.

## Principles

- Keep the source folder as the authoring source of truth.
- Freeze the presentation/shareable version as a zip-based `.deckx` file.
- Normal `.deckx` decks are script-free Safe Decks.
- `manifest.json` is the package contract.
- The player reads the package and converts it into the internal Deck model.
- Demo source folders live under `examples/deckx-*/`, but deployed and shared demos should enter through `.deckx` files or `.deckx` URLs.

## Authoring Folder

```text
my-talk/
  manifest.json
  slides/
    001-intro.html
    002-demo.html
  notes/
    001-intro.md
  styles/
    theme.css
  assets/
    hero.png
```

## Package File

A `.deckx` file is a zip archive containing the authoring folder contents. The zip can keep the files at the archive root or inside one top-level folder. The player locates a single `manifest.json`.

## Manifest Contract

Required fields:

- `id`: stable deck id.
- `title`: display title.
- `slides`: ordered slide list.

Recommended fields:

- `description`: short summary for library and search surfaces.
- `version`: package version.
- `aspectRatio`: usually `16:9`, but `4:3` and custom ratios can be supported.
- `metadata.language`: BCP 47 language code such as `en` or `ko`.
- `metadata.authors`, `metadata.tags`, `metadata.license`, `metadata.generator`: useful for discovery, provenance, and agent workflows.

Each slide entry should include:

- `id`: stable slide id.
- `title`: human-readable title.
- `source`: HTML fragment path under `slides/`.
- `notes`: optional Markdown notes path under `notes/`.

## Slide Contract

Slides are HTML fragments, not full documents. They should not include `<html>`, `<head>`, `<body>`, `<script>`, or inline event handlers. CSS can live in package styles or in safe inline style attributes. Asset references must point to package-local files.

## Speaker Notes

Speaker notes are Markdown files. They are visible in presenter view and excluded from slideshow view. Notes should contain talk-track cues, pacing reminders, and recovery notes rather than duplicating slide text.

## Safe Deck Rules

Safe Decks allow HTML, CSS, Markdown notes, and package-local assets. They do not allow executable JavaScript, inline event handlers, or external asset references. This keeps AI-authored decks easier to inspect and safer to share.

## Validation Targets

Before presenting, validate:

- `manifest.json` shape and required fields.
- Slide source paths and note paths.
- Package-local asset references.
- Safe Deck restrictions.
- Notes coverage.
- Visual overflow in representative viewports.

## Related Links

- Agent authoring guide: https://deckx-project.github.io/docs/agent-deck-authoring.md
- Manifest schema: https://deckx-project.github.io/docs/deckx-manifest.schema.json
- Korean version: https://deckx-project.github.io/ko/docs/deckx-package.md
