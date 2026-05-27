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
- `aspectRatio`: usually `16:9`, but `4:3` and custom canvas sizes such as `{ "width": 1920, "height": 1080 }` can be supported.
- `metadata.language`: BCP 47 language code such as `en` or `ko`.
- `metadata.authors`, `metadata.tags`, `metadata.license`, `metadata.generator`: useful for discovery, provenance, and agent workflows.

Each slide entry should include:

- `id`: stable slide id.
- `title`: human-readable title.
- `source`: HTML fragment path under `slides/`.
- `notes`: optional Markdown notes path under `notes/`.

## Canvas Contract

`aspectRatio` defines the player canvas, not just the mathematical ratio. The built-in `16:9` canvas is `1280x720`, and `4:3` is `1024x768`. If a deck is authored against fixed `1920x1080` coordinates, declare `{ "width": 1920, "height": 1080 }` or keep a package-local `1920x1080` inner canvas that scales from its actual slide container.

The player can place the same slide inside different host boxes, including presenter previews, thumbnails, and fullscreen slideshow. Fixed slide layouts should use declared canvas pixels or container queries; they should not depend on viewport units or `window.innerWidth`/`window.innerHeight` for sizing.

## Slide Contract

Slides are HTML fragments, not full documents. They should not include `<html>`, `<head>`, `<body>`, `<script>`, or inline event handlers. CSS can live in package styles or in safe inline style attributes. Asset references must point to package-local files.

Asset references inside slide HTML and CSS can be written relative to the slide or CSS file, such as `../assets/hero.png`. Deck-root references are also supported for package-level assets, such as `assets/hero.png` or `/assets/hero.png`. When both a slide-local file and a deck-root file match, the slide-relative file wins.

DeckX does not require a slide schema beyond HTML fragments, but the recommended authoring path is pattern-first. Pick a pattern such as `one-message`, `assertion-evidence`, `comparison`, `timeline`, `chart-focus`, `quote`, or `code-focus` before writing markup. The pattern library sample at `examples/deckx-pattern-library` shows safe default structures without changing the package format.

## CSS Ownership

The player owns runtime frame selectors and `deckx-*` classes such as `deckx-slide`, `deckx-slide-page`, and `deckx-default-*`. Package HTML is otherwise author-owned. The player must not style package elements by common author classes such as `slide`, `slide-body`, `content`, `card`, or semantic tags like `li`; default template styling is scoped to player-generated default slides only.

Package CSS should be scoped to a package-specific class, usually the manifest-derived `deckx-package-<deck-id>` root class or a unique class inside the slide fragment. Avoid styling player runtime surfaces such as `.presenter`, `.slideshow-stage`, `.topbar`, `body`, or global controls.

## Speaker Notes

Speaker notes are Markdown files. They are visible in presenter view and excluded from slideshow view. Notes should contain talk-track cues, pacing reminders, and recovery notes rather than duplicating slide text.

## Safe Deck Rules

Safe Decks allow HTML, CSS, Markdown notes, and package-local assets. They do not allow executable JavaScript, inline event handlers, or external asset references. This keeps AI-authored decks easier to inspect and safer to share.

## Trusted Runtime

Some controlled decks can declare package-local JavaScript in `metadata.custom.runtime`:

```json
{
  "metadata": {
    "custom": {
      "runtime": ["runtime/deck-runtime.js"]
    }
  }
}
```

The player must not run these scripts in the default Safe Deck path. A user has to opt in with Trusted Runtime, such as `?trusted=1` or the player option. Runtime paths must be package-local `.js` files and must not point to external URLs.

Trusted runtimes can expose `window.DECKX_RUNTIME` with optional `mount(root)` and `cleanup()` methods. `mount(root)` runs after the current slide is rendered. `cleanup()` runs before the next render and when the deck is closed.

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
