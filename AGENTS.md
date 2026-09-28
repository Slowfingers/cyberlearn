# Verification

- Typecheck: `npx tsc --noEmit -p .`
- Production build: `npm run build`
- Curriculum: `npm run validate:curriculum`
- Cosmetic catalog and SVG rendering: `npx tsx scripts/cosmetics.check.ts`

# Cosmetics

`components/ShopAvatar.tsx` renders the shop and profile portraits and frames. Existing `av_1` through `av_11` IDs are retained to preserve purchased inventory. `avatarFrame` is an optional equipped field for compatibility with existing users. Do not remove or rename owned cosmetic IDs without an inventory migration.
