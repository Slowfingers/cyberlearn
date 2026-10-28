# Перерисованные герои Street

Использован встроенный `image_gen.imagegen`, прозрачный фон. Референсы стиля и шестикадровой раскладки: `public/avatar/street/frost.png`, `public/avatar/street/akira.png`. Векторные варианты Элли, Кая, Миры и Акселя удалены. Орион остаётся единственным редактируемым персонажем на ModularCharacter. Идентификаторы `av_street_elli`, `av_street_kai`, `av_street_mira`, `av_street_axel` сохранены, чтобы не ломать уже выбранное снаряжение.

## Итоговые ассеты

- `public/avatar/street/elli.png` — Элли, бирюзовая куртка, медный хвост, наушники.
- `public/avatar/street/kai.png` — Кай, янтарная куртка, серебристые волосы, инструмент на запястье.
- `public/avatar/street/mira.png` — Мира, фиолетовая коса, куртка и голограмма.
- `public/avatar/street/axel.png` — Аксель, серебристо-синяя куртка, оранжевый шарф, инструмент.

Атласы 2172×724, RGBA, шесть кадров в строке. Нормализованы без потери качества PNG. Шестикадровая мимика используется в ожидании; отдельные слои ног и головы — в движении. Маски альфа-канала обновляются командой `node scripts/prepareStreetAvatars.mjs docs/street-avatars-v2.json`. В манифесте сохранены пути исходных результатов imagegen. При переносе проекта достаточно итоговых PNG и готовых масок в `components/spriteSilhouettes.ts`.

## Промпты генерации

Общий промпт (к нему добавляется описание героя ниже):

> Use case: stylized-concept. Asset: production game character PNG sprite strip for CyberLearn. The two inputs are STYLE AND LAYOUT REFERENCES ONLY, not characters to modify. Create a NEW ORIGINAL character: [description]. Match reference quality EXACTLY: polished detailed hand-painted 2D mobile adventure/arena game art, bold dark navy outlines, rich multi-step cel shading and small fabric/metal highlights, large expressive head with compact full body, appealing confident teen streetwear, carefully drawn hands and sneakers. Absolutely no flat geometric vector avatar, no simple Orion-style mannequin. Layout: exactly SIX complete full-body frames in ONE HORIZONTAL ROW, total canvas aspect ratio 3:1. Six equal cells, identical outfit and scale in all cells, same three-quarter front standing pose, fixed feet baseline 96% cell height, head near 4%, hips near 65%, comfortable safe side padding. Frames: neutral, subtle inhale, friendly smile, half blink, eyes closed, neutral. Only breathing and expression variation, no position drift. Character legs separated, feet fully visible. Real transparent alpha background; no ground, shadows, lettering, labels, panels, borders or watermark. Keep each full figure entirely inside its own equal cell. This is a finished usable sprite asset, not a concept sheet.

### Элли

> Confident female cyber courier, auburn high ponytail with teal streak, chunky teal headphones, cropped mint bomber over dark shirt, charcoal utility trousers, mint and white high-top sneakers, compact cross-body messenger pouch, warm expressive face.

### Кай

> Clever young male neon-city engineer, textured silver undercut, warm tan skin, amber AR glasses worn above eyebrows, rich amber technical jacket, dark navy tapered cargo trousers, amber-white chunky sneakers, compact holographic wrist tool.

### Мира

> Charismatic dark-skinned female world-builder, long violet braid with cyan bands, cobalt and violet asymmetric varsity jacket over dark full-length top, charcoal cargo trousers with violet panels, substantial violet-white sneakers, small geometric hologram floating above open palm.

### Аксель

> Energetic male urban mechanic, tousled dark navy curly hair with electric blue front streak, silver-and-cobalt oversized bomber jacket, orange utility scarf, charcoal cargo trousers with blue straps, cobalt-white chunky sneakers, small friendly magnetic tool puck in hand.
