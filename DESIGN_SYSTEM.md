# Harbor design system

## Brand foundation

Harbor is a personal financial operating system. Its visual idea is Snow × Mountain × Ocean × Harbor: calm alpine light above deep, dependable water. The product uses atmosphere through tone, depth, spacing, and contrast—not literal scenery. Canonical positioning: **Understand where your money stands. See where it is going. Make better financial decisions.** The optional brand line is **A harbor for your financial life.**

## Logo

The Harbor mark combines an H-shaped sheltered basin, two mountain ridges, a horizon, and one water line. Use the lockup in navigation and the mark alone for favicons or constrained spaces. Light and dark monochrome assets live in `public/`; preserve clear space equal to one quarter of the mark width. It is an intentionally polished RC mark and may be professionally refined later without changing its core geometry.

## Colour

| Role | Light reference | Purpose |
|---|---:|---|
| Snow | `#f7f9f8` | calm base surface |
| Frost | `#eef3f4` | secondary surface |
| Mist | `#dce4e6` | boundaries |
| Glacier | `#b9d3d6` | restrained highlight |
| Harbor Blue | `#326775` | interactive emphasis |
| Deep Ocean | `#123744` | brand and strong typography |
| Midnight Ocean | `#09242f` | deepest tone |
| Mountain Slate | `#5f6f75` | secondary copy |
| Pine | `#286451` | positive status |
| Amber | `#a56f31` | attention |
| Risk | `#9a4f4b` | genuine critical state only |

Components consume semantic variables such as `--surface-elevated`, `--text-primary`, and `--border-subtle`; raw palette values are reference primitives. The dark theme uses deep navy canvas `#081f29`, elevated ocean `#102f3b`, snow text `#edf5f5`, and cool borders `#20414b`. Pure white and pure black are avoided as dominant surfaces.

## Typography

Geist is the single product family. Display and page titles use restrained 600 weight and tight tracking; section titles use 500; body uses 400; labels and metadata use smaller sizes with limited uppercase tracking. Financial values use `.financial-value` for tabular lining numerals. Avoid more than three weights within one composition.

## Layout and surfaces

The page container is 1380px. Page spacing is 20/32/40px by breakpoint; sections usually separate by 16–32px. Card padding is 20–32px. Radius tokens are 6, 10, 16, and 22px. Use one subtle border and atmospheric shadow; elevation should clarify hierarchy rather than make every region float independently.

## Icons, avatars, and motion

Icons are simple, geometric, single-colour, and recognisable at small sizes. Avoid illustrative nautical or financial motifs. Avatars are circular, use a private uploaded image when present, and otherwise derive at most two initials from the display name. Empty identity uses “Harbor user”, never an invented person. Motion is 140–220ms, functional, and disabled under reduced-motion preference.

## Accessibility

Primary text and controls must maintain WCAG AA contrast in both themes. Every control needs a visible label or accessible name, keyboard focus uses the semantic focus token, upload errors use live readable copy, and theme selection must work without pointer input. Atmospheric styling never overrides legibility.
