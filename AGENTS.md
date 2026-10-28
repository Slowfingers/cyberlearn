# Verification

- Typecheck: `npx tsc --noEmit -p .`
- Production build: `npm run build`
- Curriculum: `npm run validate:curriculum`
- Cosmetic catalog and SVG rendering: `npx tsx scripts/cosmetics.check.ts`
- Campaign, grid commands and mobile map: `npm run check:campaign`
- Integrated student navigation with mocked API: `node scripts/dashboard.browser.check.mjs`
- Trainer layout and explanation bounds: `npm run check:layout`
- Rebuild original raster city and trainer assets: `npm run art:city`
- Focused six-scene interactions and responsive screenshots: `node scripts/workshop.browser.check.mjs --scenes-only`
- Shared button and trainer styles are imported by `index.css`, not component modules, so Node-based trainer configuration checks can import the components.
- Browser checks start isolated Vite servers. Do not edit source or run the production build while they are active: HMR reloads invalidate their navigation state.
- Use the isolated audit fixtures for screenshots; never use real student accounts for UI automation.

# Cosmetics

`components/ShopAvatar.tsx` renders the shop and profile portraits and frames. Existing `av_1` through `av_11` IDs are retained to preserve purchased inventory. `avatarFrame` is an optional equipped field for compatibility with existing users. Do not remove or rename owned cosmetic IDs without an inventory migration.
