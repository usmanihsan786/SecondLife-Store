# Design system: IKEA Used Furniture storefront

Original design for an independent reseller. It does not use IKEA's logo, typeface, blue-and-yellow colours or
other brand assets. The house-and-lamp mark is the store's own.

All tokens live in `src/app/globals.css` (`@theme`). Components use them as Tailwind classes (`bg-surface`,
`text-muted`, `border-line`…). Never hard-code a colour in a component.

## Colour

| Token | Value | Use | Contrast on white |
|---|---|---|---|
| `canvas` | `#ffffff` | Page background | — |
| `paper` | `#ffffff` | Cards, sheets, inputs | — |
| `surface` | `#f7f7f4` | Warm section bands, page headers, footer | — |
| `surface-2` | `#efeee8` | Image wells, chips, subtle fills | — |
| `line` | `#e6e5e0` | Dividers, soft borders | — |
| `line-strong` | `#d3d1c9` | Control borders (buttons, inputs, options) | — |
| `ink` | `#202320` | Headings, body text, focus ring | 15.9 : 1 |
| `muted` | `#666b66` | Secondary text | 5.4 : 1 |
| `accent` | `#a28b6c` | Oak accent: dots, underlines, step numbers. **Decorative only** | 3.3 : 1 |
| `accent-strong` | `#7a6548` | Accent text: eyebrows, icons, series labels | 5.6 : 1 |
| `action` / `action-hover` | `#202320` / `#3a3f3a` | Primary buttons | white text 15.9 : 1 |
| `ok` / `ok-soft` | `#3e6b4c` / `#e8f0ea` | Available | 6.2 : 1 |
| `sold` / `sold-soft` | `#686c68` / `#efefec` | Sold out / unavailable (neutral, not alarming) | 5.3 : 1 |

The only saturated colour is WhatsApp green on the floating button, because customers recognise it.

## Typography

Two font files, self-hosted by `next/font` (no request to Google from the visitor's browser):

- **Instrument Serif** (one weight, 400) as `font-display`: page titles, section titles, collection names. Never bold
  (the CSS turns off fake bold).
- **Instrument Sans** (variable) as `font-sans`: everything else. 400 for text, 500 for product names, labels and buttons.

| Role | Size (phone → desktop) | Line height |
|---|---|---|
| Homepage H1 | 46 → 80 px | 0.98 |
| Page H1 (`PageHeader`) | 36 → 52 px | 1.06 |
| Section H2 (`SectionHeading`) | 30 → 38 px | 1.08 |
| Content H2 (guides, FAQs) | 28 → 32 px | 1.2 |
| Body | 15 → 16 px | 1.6–1.7 |
| Eyebrow | 12 px, uppercase, 0.16em tracking | — |

## Layout and spacing

- One content width: `Container`, max 1320 px, gutters 16 / 24 / 40 px.
- Section rhythm: `py-14` (56 px) on phones, `py-20` (80 px) from `sm`.
- Bands alternate white and `surface`, separated by a 1 px `line`.
- Grids: products 2 columns on phones, 3 next to filters, 4 full width. Category tiles 2 → 4. Series and guides are a
  swipeable row on phones.
- Image ratios: product cards 1:1, category tiles 4:5, series 3:4, guides 3:2, product gallery 1:1 with the
  photo shown whole (`object-contain`).

## Shape, depth and motion

- `--radius-card` 8 px (photos, panels), `--radius-control` 6 px (buttons, inputs). Pills only for filter shortcuts and
  status chips.
- No card borders or drop shadows on product, category or collection cards: the photo is the card.
  `--shadow-card` is used only for floating controls.
- Motion: 200 ms colour transitions; a slow 700 ms 1.04× photo zoom on hover; drawers slide in 280 ms. No looping
  animations, no autoplay, no parallax. Everything is turned off with `prefers-reduced-motion`.

## Components

| Component | File | Notes |
|---|---|---|
| Buttons | `components/ui/button.ts` | `primary`, `secondary`, `ghost`, `light`, `outline-light`; sizes `sm` / `md` / `lg` (min 40 / 44 / 48 px tall) |
| WhatsApp button | `components/ui/WhatsAppButton.tsx` | Any button variant, prefilled message |
| Section heading + arrow link | `components/ui/SectionHeading.tsx` | Eyebrow, serif title, intro, "View all" link |
| Page header | `components/ui/PageHeader.tsx` | Breadcrumbs, eyebrow, the page's H1, intro, actions |
| Product card / grid | `components/product/ProductCard.tsx`, `ProductGrid.tsx` | Photo-first, whole card is one link |
| Badges | `components/product/Badges.tsx` | Sold out label, availability dot |
| Gallery | `components/product/ProductGallery.tsx` | Swipe, arrows, counter, thumbnails, full-screen viewer |
| Variant options | `components/product/OptionGroup.tsx` | Radio group with arrow keys; sold-out and unavailable states |
| Filters | `components/catalog/FilterOptions.tsx` | Checkbox rows, colour swatches, size chips; shared by sidebar and drawer |
| Category tiles, collections, trust, steps, guides, CTA | `components/home/Sections.tsx` | Content and counts come from the data files |
| FAQ, link list, breadcrumbs, prose | `components/content/ContentBlocks.tsx` | Native `<details>` accordions, work without JavaScript |
| Empty state | `components/ui/EmptyState.tsx` | Used when filters match nothing |

## Accessibility rules

- Text contrast at least 4.5 : 1. `accent` is never used for text.
- Visible 2 px ink focus ring on everything focusable.
- Tap targets at least 44 px for controls; links inside sentences are the only exception.
- One H1 per page; headings in order.
- Respect `prefers-reduced-motion` and safe-area insets (sticky bar, menus, floating button).
