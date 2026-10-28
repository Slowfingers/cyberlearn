# Apartment game interface

The apartment uses one full-window scene. A floating HUD opens the in-scene furniture shop, owned collection, rug palette and placement controls. Choosing an item closes the shop and shows a floor preview; buying and placing remain separate from saving the complete layout. Cleanup, authoritative prices, ownership and revision checks retain their existing domain behavior.

The floor grid uses a projective transform through four inner floor corners in `utils/avatarRoomGeometry.ts`. Pointer coordinates use the exact inverse transform. Furniture and the avatar scale with local depth; solid furniture and the avatar sort by projected floor depth. Existing logical 8 × 8 coordinates remain unchanged.

The shop is a horizontal drawer with categories and search. Changing categories, searching or reopening returns to the start of the list. Mobile placement supports a closer scene view with horizontal panning and an optional top-down floor plan. Speech remains above the avatar, stays within the visible viewport and hides while its speaker is offscreen.

This change reuses the existing building and furniture art; no new raster assets were generated.

Verification:
- `npx tsc --noEmit -p .`
- `node --import tsx scripts/avatarRoomGeometry.check.ts`
- `node scripts/avatarRoom.browser.check.mjs`
- `node scripts/avatarRoomColors.browser.check.mjs`
- `npm run build`

Browser checks use isolated Vite servers and mocked student fixtures at desktop and phone widths. They cover cleanup, walking, collision, footprints, placement, rotation, purchasing, failed saves, reopening, inventory, rug pixel differences and search.
