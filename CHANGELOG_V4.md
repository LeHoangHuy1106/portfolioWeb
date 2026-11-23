# BNA Dev Portfolio v4.0 — Projects visual redesign

- Removed the **public mini-game list** from project details. GCF mini-games remain nested in data for compatibility, not displayed on the website.
- Added the bilingual `ProjectFeature` model and `features` array for every flagship project.
- GCF now lists six relevant implemented systems, with four image cards initially visible and an expandable gallery.
- Added image-detail modal with Escape/outside-click controls.
- Added six original grayscale schematic SVG *illustrations*, clearly distinguishable from real screenshots.
- Archived game screenshots now display **inside a portrait phone mockup**, scaling to fit. Gallery order is screenshots first, banner last.
- `/create` now edits implemented systems (title/description in both languages, image upload, image type), and media presentation (phone/wide).
- Updated local editor input validation to recognize the new data fields.
- Included a standalone static Projects design preview for visual reference.
- Original 25 archived games and existing project data remain intact.

Validation: TypeScript/TSX syntax parsed using globally installed TypeScript; JSON and SVG validated. Production build cannot be executed here due to npm registry DNS failure (`EAI_AGAIN`).
