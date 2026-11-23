# Portfolio redesign notes

- Migrated from 2024-era sidebar-oriented CRA deployment to Vite + React + TypeScript single-page architecture.
- Recovered 25 original project records from source maps, including descriptions, tags and original asset links.
- Added bilingual EN/VI editorial content with persistent language setting.
- Added responsive header, hero, visual project case study, current mini-game prototypes, searchable/filtered archive, keyboard-dismissable details dialog, About, Expertise, AI Lab, Experience, Process, Contact and footer.
- Added fallback illustrations so no missing-image placeholder is exposed when the original asset folder is not present.
- Added reduced-motion support and lightweight pointer/scroll animations inspired by React Bits.
- Kept private future game/business concepts out of the public portfolio.
- Presented AI competence with evidence-based labels, not arbitrary self-rating percentages.
- Added concise Vietnamese descriptions for all 25 archived games while keeping source English descriptions unchanged.
- Added six currently explored mini-game prototypes separately from the archived 25.
- Added an optional resume download that only becomes visible after an updated `public/assets/pdf/CV.pdf` is restored.
