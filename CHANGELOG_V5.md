# v5 · Automatic landscape device + CV PDF

- Added screenshot aspect-ratio detection for every selected archive gallery image.
- Landscape images display in a horizontal phone mockup; portrait images use the original vertical device.
- Both use `object-fit: contain` to avoid cropping and scrolling inside the screenshot.
- Added About CV link with bilingual copy and disabled placeholder when no PDF has been uploaded.
- Added editable `about.cv` field and PDF upload in `/create → Site & About`.
- Added localhost-only `/__editor/upload-cv` endpoint with 15 MB limit and file signature validation.
- Uploaded PDFs stored in `public/assets/uploads/`, source JSON stores the link after Save.
- Archive, featured projects, game data and visual theme preserved from v4.
