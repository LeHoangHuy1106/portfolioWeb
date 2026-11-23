# BNA Dev Portfolio 2026 — Bilingual interactive redesign

**A working React / Vite / TypeScript source project** inspired by the approved black–white cinematic mockup. Built around separate clickable pages, not one endlessly scrolling landing page.

## v5 · Automatic phone rotation and CV PDF

- In **Projects → Archive**, every image in a phone-frame gallery is examined individually. Portrait images stay in portrait phones; a **landscape screenshot automatically switches the phone frame into landscape orientation**, preserving the entire image with `object-fit: contain` and no clipping. Switching images recomputes the orientation, so mixed galleries work. Landscape screenshots aren't physically rotated; the **device frame** turns sideways to match the game's screen.
- In **About**, a **Xem CV / View CV** button appears beside Experience. It opens your PDF in a new browser tab when configured; while the CV is missing, it remains visible but disabled, with no broken link.
- On local **`/create` → Site & About**, use **Upload CV (PDF)**, then **Save to source**. The upload verifies the PDF filename, MIME type, PDF header, and 15 MB limit, storing the file at `public/assets/uploads/cv-...pdf`. The JSON field `about.cv` holds its path. The PDF is publicly accessible after deployment, so remove personal details you don't want published.
- Existing JSON backups without `about.cv` remain compatible. Deleting the CV field in `/create` removes its link but does **not** physically delete previously uploaded PDFs; remove unused files manually before publishing.

## 1. Run on Windows

Requirements: Node.js 20.19+ or 22.12+ (Node 22 LTS recommended), npm.

```bash
npm install
npm run dev
```

Open **http://127.0.0.1:5173/**. The browser uses the Vietnamese language by default and can switch to English using EN / VI at the top right.

For the static production build:

```bash
npm run build
npm run preview
```

Upload the output **dist/** to your host. If you deploy to Netlify, the provided `public/_redirects` enables navigation to `/projects`, `/skills`, `/about` and `/contact`. Vercel equivalent is in `vercel.json`. Other hosts need SPA fallback to `/index.html`.

## 2. The local editor `/create`

Open **http://127.0.0.1:5173/create** while `npm run dev` is running. This is a **local development content editor**, not a public CMS. No online accounts or database are required.

- Add, edit and delete **independent flagship projects** and projects in the **archive**.
- Manage **implemented systems** nested in each flagship project, with bilingual text, thumbnails, and image-type labels. (Historical miniGame data remains in JSON but is intentionally not shown.)
- Edit project titles, summaries, descriptions in English and Vietnamese, tech tags, external links, cover and gallery.
- Edit separate Game Development / Frontend / Backend / Databases / AI / Tools groups.
- Update the homepage headline, brand, logo image, background artwork, About, work history, email and social profiles (GitHub, LinkedIn, Facebook, YouTube, Telegram, Zalo, TikTok, etc.).
- Upload local PNG, JPG, WEBP, GIF or AVIF files (up to **10 MB each**), upload CV PDFs (up to **15 MB**), or paste an asset path.
- Import and export the entire JSON to transfer/back up data.
- **Save to source** writes directly to `src/data/portfolio.json`, and uploaded images are written to `public/assets/uploads/`. HMR will update Vite automatically. Commit these files along with the project source to publish the changes.

### Security of `/create`

The editor API is registered only by Vite's **development server**, and only accepts connections from the loopback interface (`127.0.0.1` or `::1`). `vite.config.ts` binds dev to `127.0.0.1`. The `/create` route displays a disabled page in the production build, and production builds **do not contain the editor API**. It is not a password-protected online dashboard. Do not expose your Vite development server to the internet.

An in-browser editor cannot directly modify files on your computer from a public static website. The included Vite local-only API is what makes the Save operation really write the changes to source.

## 3. Original assets folder

Your uploaded older site ZIP did **not** contain `assets`. Restore it by copying its complete contents into:

```
public/assets/
  Images/logo.png      <-- Your BNA Dev official logo
  Banners/...          <-- Previous portfolio game banners
  Games/...            <-- Previous portfolio screenshots
  Icons/...
```

The logo references **`/assets/Images/logo.png`** exactly. Until the file exists, the site uses a typographic BNA DEV fallback. Historical game images use the original `/assets/Banners/...` and `/assets/Games/...` paths; missing images have an intentional visual fallback instead of browser broken-image icons. New uploads are stored under `/assets/uploads/`.

The approved monochrome creative-studio artwork is included as `public/art/studio-hero.webp`. You can swap that image from `/create` as well.

## 4. Project detail presentation (v4)

**The public project page no longer displays a mini-game list.**

- **Flagship projects:** An optional `features` array powers a visual **Implemented systems** section. Each card contains a Vietnamese/English title, Vietnamese/English description, an image, and its actual image type. The default view shows **four cards**; the **View all** control reveals the rest. A click opens an image + descriptive modal (supports Escape and outside-click dismissal).
- **Game Challenge Festival:** Initial implemented-system entries are Challenge Rooms, Map & Journey, Missions & Achievements, Pets & Collection, Economy & Rewards, and Rankings & Profiles. Their six included monochrome **SVG diagrams are explicitly concept illustrations, NOT screenshots**. Replace each one with real screenshots in `/create` whenever available.
- **Archive games:** Portrait gameplay images appear inside a small responsive **phone mockup** (landscape screenshots automatically turn it sideways), with `object-fit: contain` so the entire screenshot is visible without stretching or vertical scrolling inside the image. Gallery arrows cycle through screenshots. The original archive banner is appended after gallery images, so the first visual is an actual screenshot if the assets exist.
- **Media presentation in `/create`:** Select `Phone frame` (default for archives) or `Wide canvas` for landscape games. Every independent project can have its own implemented-system cards and images.
- **Old miniGames data is preserved in JSON only** for compatibility with the original GCF source. It is no longer rendered on the portfolio Projects page or exposed as a separate list in `/create`.
- **Archive:** the original 25 portfolio games remain, with original asset paths. Copy the omitted original folder to `public/assets/`; image placeholders are shown until then.

The standalone `preview-projects-v4.html` is a static before-launch design reference with tabs for **GCF Systems / Archive Phone**. It does not replace the actual React app, and its phone screen is intentionally generic preview art.

## Local content workflow

1. Run `npm install && npm run dev` and open `http://127.0.0.1:5173/create`.
2. Choose **Projects** → select a flagship project → **Implemented systems** → edit title/description in EN/VI and upload real screenshots.
3. Set the correct **Image type** to Real screenshot, and choose **Media presentation** for the project (Phone or Wide).
4. Click **Save to source**. It writes to `src/data/portfolio.json`; uploaded files are saved under `public/assets/uploads/`.

Don't deploy `/create` as an online admin dashboard: its editor API exists only on the loopback-bound Vite development server. See section 2 for details.

## 5. AI content

Skill categories distinguish AI-assisted development, visual content workflows, exploration of TTS/local models, and MCP workflows. They don't imply employment as a machine-learning engineer or undocumented skills. Review/correct the editable entries before the public launch.

## 6. React Bits

Interactive home tiles use **SpotlightCard-style pointer interaction**, and the hero uses **BlurText-style text animation**. These are lightweight, locally maintained adaptations from the previous portfolio version, inspired by React Bits. They are **not purchased React Bits Pro templates** and don't depend on a Pro license.

For exact official free components you can use the registry after `npm install`:

```bash
npx shadcn@latest add @react-bits/SpotlightCard-TS-CSS
npx shadcn@latest add @react-bits/BlurText-TS-CSS
```

Website: https://reactbits.dev / source: https://github.com/DavidHDev/react-bits. Replacing the local adaptations with official source is optional; current UI works without running the registry.

## 7. Files

- `src/App.tsx` — actual interactive UI and page navigation.
- `src/styles.css` — responsive BNA Dev visual language.
- `src/data/portfolio.json` — editable portfolio data (EN/VI).
- `src/data/types.ts` — data contract.
- `src/editor/Editor.tsx` — the local dashboard at `/create`.
- `plugins/localEditor.ts` — restricted Vite write/upload middleware.
- `public/art/studio-hero.webp` — hero artwork derived from the approved mockup.
- `design-preview.html` — **static** homepage design reference (not the React app).
- `preview-projects-v4.html` — **static** design reference for the new Systems gallery and Phone mockup.
- `public/art/features/*.svg` — six neutral **concept illustration placeholders** to be replaced by actual game screenshots.
- `design-reference.png` — approved target screenshot (for visual comparison).

## Validation status

- Data JSON and all TS/TSX files passed syntax/transpilation checks using the locally installed TypeScript compiler. The v5 local editor API was additionally tested with a loopback HTTP server for valid PDF uploads, invalid PDF rejection, filename/MIME checks, and persisting `about.cv` into JSON.
- The production `npm run build` could **not** be completed inside the file creation environment: `npm install` returned `EAI_AGAIN` for the npm registry, and React/Vite dependencies are not preinstalled. Run `npm install && npm run build` on your local Windows machine before publishing.
- Automated browser screenshot testing was also blocked in this environment. The static `design-preview.html` and target design PNG are supplied as visual references, not proof of runtime testing.

## Publishing checklist

1. Restore your official logo and game assets.
2. Check your old social contact links and all 25 legacy game URLs; remove obsolete items via `/create`.
3. Add your remaining independent flagship projects in `/create` and verify each project's public-release status.
4. Use Save to source; back up/export JSON and commit `src/data/portfolio.json` and `public/assets/uploads`.
5. Run `npm run build` and test desktop/mobile interactions before deployment.
