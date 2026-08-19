# Harbor design system

This file is authoritative for Harbor visual work. Harbor evokes a quiet alpine harbor at sunrise: cold air, snow, deep water, calm, precision, and trust. The atmosphere comes from colour, spacing, surface depth, and typography—not illustration or decorative noise.

## Brand and mark

The finalized Harbor mark contains exactly two flowing lines: an upper mountain ridge and a lower harbor wave. The transparent 160:100 master uses the approved geometry in `public/branding/harbor-mark.svg`. Do not add an H, boat, anchor, finance symbol, sun, enclosing shape, or extra line. On Deep Ocean use the white master; on light surfaces use the identical Deep Ocean derivative. Minimum displayed width is 24px; retain at least 18% clear space for icon treatments. The wordmark uses Geist 600 and is never custom lettered.

Asset manifest:

- `harbor-mark.svg`: canonical transparent white master.
- `harbor-mark-deep-ocean.svg`: identical geometry for light surfaces.
- `harbor-favicon.svg`: Deep Ocean favicon with generous safe area.
- `harbor-app-icon.svg`: scalable Deep Ocean application icon.
- `/favicon.svg`: compatibility alias retained for older cached metadata.

## Alpine palette and semantic tokens

Approved anchors are Snow `#CDFDFF`, Glacier `#9AFCFF`, Harbor Ocean `#2D7F92`, Deep Ocean `#0F2134`, raised Deep Ocean `#173149`, Secondary Accent `#1C3482`, Glacier Blue `#284AB9`, and white `#FFFFFF`. Components use semantic roles, never these names directly.

Snow maps the canvas to derived mist `#EDF9FA`, base surfaces to `#F5FBFB`, elevated surfaces to white, primary text and primary actions to Deep Ocean, and focus to Secondary Accent. Deep Ocean uses `#0F2134` for the canvas, `#173149` for elevation, white primary type, Glacier for primary actions/focus, and cool navy borders. Positive, warning, destructive, inputs, muted text, and three chart series have explicit accessible theme mappings in `app/globals.css`.

## Typography and numerals

Geist is the single family. Display values use 500 weight, tight tracking, and tabular lining figures. Page titles use 600; section titles 500–600; body 400; labels 500; metadata and captions remain quiet but meet AA contrast. Use `.financial-value`, `.text-display`, `.text-section`, and `.text-meta` where their semantic roles apply. Long identity, institution, merchant, and localized strings must truncate or wrap without shifting comparable financial columns.

## Layout, surfaces, and controls

The content width is 1380px with responsive `--space-page` padding. Sections use 20px rhythm and cards use 20–28px padding. Radius tokens are 6, 10, 18, and 22px. Cards use one cool border and a very light theme-aware shadow; nested regions generally use the subtle surface without another shadow. Inputs use the semantic input/border/focus roles. Touch controls reach 44px on coarse pointers.

The sidebar uses Lucide outline icons at 17px and 1.7 stroke, a slim active rail, restrained Glacier selection, and no mixed emoji/fill styles. Mobile uses an accessible horizontally scrollable workspace navigation without changing information architecture.

## Charts and status

Charts use `--chart-1..3`, `--chart-grid`, and semantic surface tokens. Lines are 2px, fills are restrained, grids are quiet, and financial/date formatting remains the domain formatter’s responsibility. Direction and risk must include text or shape—not colour alone. Status colours are reserved for meaning, never decoration.

## Motion and themes

Micro feedback is 150ms, navigation 200ms, charts approximately 250ms, and theme transitions no more than 280ms. Prefer colour, opacity, and small transforms. `prefers-reduced-motion` removes nonessential animation. Snow, Deep Ocean, and System remain the persisted profile choices. An inline theme bootstrap uses the local preference mirror to prevent a wrong-theme flash; the repository profile remains authoritative after loading.

## Avatars and accessibility

Avatars are circular, private to the workspace, and use at most two initials when no image exists. Empty identity is “User”. All controls require visible focus and an accessible name; dialog titles, form labels, live save/error states, landmarks, current-page semantics, keyboard operation, and WCAG 2.2 AA contrast are release requirements.
