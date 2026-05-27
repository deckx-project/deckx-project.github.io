# DeckX Samples

This document is the review contract for official DeckX samples. A sample is not only a pretty deck; it should teach a reusable authoring pattern, validate package behavior, or exercise a player capability in a natural presentation context.

## Quality Bar

- One main message per slide.
- Speaker notes for every slide.
- Package-local assets and styles.
- Safe Deck by default; Trusted Runtime only for explicit runtime samples.
- Clear `metadata.language`, `metadata.tags`, and sample purpose.
- Overflow-safe in presenter preview and slideshow.

## Language Groups

English samples are the default discovery surface for global users and AI agents. Korean samples are first-class examples for local users and Korean talks. The landing page groups official samples by deck content language, not by UI locale.

The current English public sample set is intentionally small: `deckx-pattern-library` and `deckx-sample-en`. Korean samples are the active expansion target before localization because they cover player dogfooding, PPT-style presets, motion presets, aspect ratio, assets, and long-deck stress cases.

## Sample Type Guide

| Type | Primary sample | Purpose |
| --- | --- | --- |
| Pattern reference | `examples/deckx-pattern-library` | Teaches reusable slide patterns before users design from a blank HTML canvas. |
| Developer talk | `examples/deckx-sample-en`, `examples/deckx-sample-ko` | Shows a normal technical presentation with notes, section flow, and validation-safe HTML. |
| PPT layout preset | `examples/deckx-template-ko` | Gives users copyable title, body, section, comparison, image, timeline, metric, quote, and closing pages. |
| Motion preset | `examples/deckx-motion-demo` | Provides reusable CSS motion pages for reveal, morph, path, kinetic type, and data transition. |
| Runtime/product dogfood | `examples/deckx-player-demo`, `examples/deckx-static-demo` | Explains DeckX with DeckX packages and exercises player entry points naturally. |
| Fixture/stress deck | `examples/deckx-classic-demo`, `examples/deckx-image-heavy-demo`, `examples/deckx-long-*` | Verifies aspect ratio, asset loading, long navigation, search, thumbnails, and overflow behavior. |

## Current Review

| Source | Language | Role | Review result |
| --- | --- | --- | --- |
| `examples/deckx-pattern-library` | English | Pattern reference | Keep as the canonical pattern-first sample. |
| `examples/deckx-sample-en` | English | Developer authoring sample | Use as the natural English deck to copy for technical talks. |
| `examples/deckx-starter-basic` | Korean | Minimal starter | Keep small; use for first-folder education rather than visual ambition. |
| `examples/deckx-sample-ko` | Korean | Developer authoring sample | Use as the Korean baseline for slide fundamentals and validation-ready structure. |
| `examples/deckx-template-ko` | Korean | PPT-style layout templates | Use as the reusable preset deck for common title, content, section, comparison, image, timeline, chart, quote, and closing pages. |
| `examples/deckx-player-demo` | Korean | Dogfood demo | Good runtime/package explanation; metadata now marks it as Korean. |
| `examples/deckx-static-demo` | Korean | Runtime explanation | Keep as a simple static runtime demo; metadata now marks it as Korean. |
| `examples/deckx-motion-demo` | Korean | CSS motion presets | Keep for motion controls and reusable motion pages: staged reveal, morph comparison, motion path, kinetic type, and data transition. |
| `examples/deckx-classic-demo` | Korean | 4:3 canvas fixture | Keep short and focused on aspect ratio behavior. |
| `examples/deckx-image-heavy-demo` | Korean | Asset stress fixture | Keep as an image-load stress deck, not a primary authoring sample. |
| `examples/deckx-long-120-demo` | Korean | Long-deck fixture | Reframed as a release runbook so 120 slides feel like a natural developer deck. |
| `examples/deckx-long-image-demo` | Korean | Long image fixture | Reframed as system snapshots so the image-heavy long deck has a natural reason to exist. |

## Korean Sample Targeting

| Source | Functional difference | Preset usefulness | Current judgment |
| --- | --- | --- | --- |
| `examples/deckx-starter-basic` | Teaches the minimum DeckX folder contract. | Useful as a first-copy scaffold, not a design preset. | Keep minimal. |
| `examples/deckx-sample-ko` | Shows a natural developer talk with notes and validation-ready structure. | Useful as a baseline technical talk. | Keep as the Korean authoring floor. |
| `examples/deckx-template-ko` | Provides common PPT-style slide layouts as DeckX HTML fragments. | High reuse value for everyday business and technical decks. | Primary Korean preset library. |
| `examples/deckx-motion-demo` | Exercises CSS motion under DeckX motion controls. | Useful as a motion preset library for reveal, morph, flow, kinetic text, and data transition pages. | Expand before English localization. |
| `examples/deckx-player-demo` | Dogfoods DeckX by explaining the player as a package. | Useful for product/runtime explanation, not a generic template. | Keep focused. |
| `examples/deckx-static-demo` | Explains runtime boundaries without visual complexity. | Useful as a plain technical explainer. | Keep simple. |
| `examples/deckx-classic-demo` | Verifies non-16:9 canvas support. | Useful as an aspect-ratio fixture. | Keep short. |
| `examples/deckx-image-heavy-demo` | Verifies package-local image asset loading. | Useful as an asset stress fixture. | Not a primary authoring preset. |
| `examples/deckx-long-120-demo` | Verifies long-deck navigation through a release runbook. | Useful for navigation/search stress with natural content. | Keep generated. |
| `examples/deckx-long-image-demo` | Verifies long-deck image loading through system snapshots. | Useful for thumbnail/object URL stress with natural content. | Keep generated. |

## Motion Preset Coverage

| Preset | Slide | Reuse target |
| --- | --- | --- |
| Runtime scene | `examples/deckx-motion-demo/slides/001-motion-intro.html` | Opening a motion-heavy technical demo. |
| Signal flow | `examples/deckx-motion-demo/slides/002-signal-flow.html` | Showing one-way data or state propagation. |
| Runtime metrics | `examples/deckx-motion-demo/slides/003-runtime-metrics.html` | Showing operational status dashboards. |
| Dual window sync | `examples/deckx-motion-demo/slides/004-dual-window.html` | Showing presenter/audience split behavior. |
| Framework proof | `examples/deckx-motion-demo/slides/005-framework-proof.html` | Showing interchangeable deck/runtime boundaries. |
| Staged reveal | `examples/deckx-motion-demo/slides/006-staged-reveal.html` | Replacing sequential bullet reveals. |
| Morph comparison | `examples/deckx-motion-demo/slides/007-morph-comparison.html` | Explaining before/after state change. |
| Motion path flow | `examples/deckx-motion-demo/slides/008-motion-path-flow.html` | Explaining process and journey flows. |
| Kinetic type | `examples/deckx-motion-demo/slides/009-kinetic-type.html` | Emphasizing a short product or section message. |
| Data transition | `examples/deckx-motion-demo/slides/010-data-transition.html` | Showing metric change as a state transition. |

## Maintenance Rule

When adding a new official sample, update:

- `examples/deckx-*` source folder.
- `scripts/pack-deckx-demos.mjs`.
- `scripts/validate-deckx-demos.mjs`.
- `scripts/check-overflow.mjs`.
- `src/main.ts` demo catalog and landing copy.
- `README.md` demo list.
