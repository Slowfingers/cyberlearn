# Комната: постеры и новая мебель

Ассеты отрисованы встроенным `image_gen.imagegen`. Базовые референсы: `public/art/avatar-room/sofa-v1.webp` для материалов и света; `building-v1.webp` для редактирования стены. Итоговые изображения находятся в `public/art/avatar-room/`, манифест исходных файлов — `docs/avatar-room-v4-art.json`. Повторная подготовка WebP: `node scripts/prepareRoomV4Art.mjs`.

## Итоговые файлы

`building-v2.webp` — чистая левая стена без встроенного изображения города; общий ракурс и регистрация исходного холста сохранены.

Новые прозрачные предметы: `poster_cosmos-v1.webp`, `poster_cat-v1.webp`, `poster_wave-v1.webp`, `poster_garden-v1.webp`, `wall_clock-v1.webp`, `wall_neon-v1.webp`, `gaming_chair-v1.webp`, `snack_cabinet-v1.webp`, `craft_desk-v1.webp`, `terrarium-v1.webp`, `robot_pet-v1.webp`, `cloud_lamp-v1.webp`.

Постеры, часы и неон крепятся на отдельную сетку стен: 8 столбцов × 3 ряда на каждой стене. Это не клетки пола. Выбор стены сохраняется в необязательном поле `wall` расстановки; старые напольные расстановки совместимы. Сервер проверяет принадлежность предметов, границы и пересечения на выбранной стене. Все прежние идентификаторы и цены сохранены.

## Промпт стены

> Edit the first image. Remove ONLY the large framed glowing city panorama on the LEFT INTERIOR WALL. Replace the whole framed mural, including its decorative picture border, with clean empty dark blue architectural wall panels matching the adjacent right interior wall, with subtle bevels and soft warm reflected light. This wall must be blank, spacious, usable for player posters. Preserve EXACTLY the cutaway building geometry, isometric camera, wooden floor and its four corner positions, central corner column, facade, outside windows, outside distant city, plants, cyan edge lighting and image framing. Do not add furniture, posters or objects. The apartment floor outline and its location must not shift. Preserve the original canvas aspect ratio.

## Общий промпт предметов

> Use case: stylized-concept. Production transparent game sprite asset for the cozy futuristic CyberLearn avatar apartment. The reference image is a STYLE reference for material quality and lighting, do not reproduce its sofa. Subject: [subject]. Entire isolated object fully visible and centered, generous clear padding, true transparent alpha background. High quality painted 3D-style game asset, detailed and polished. No floor tile, platform, cast ground shadow, scenery, words, watermark, labels or extra objects outside the requested item.

Для настенных объектов:

> Front-on orthographic view, completely flat vertical wall-mounted object, no isometric slant and no visible room. For posters, a finished portrait print with a slim cream/oak frame, crisp rectangular silhouette, ratio approximately 4:5, tiny teal metal details.

Для напольных объектов:

> Three-quarter isometric view from above, matching the reference cozy high-end game furniture illustration: top and front/right sides visible, consistent 30-degree isometric angle. Finely rendered materials, rounded forms, soft fabric and enamel highlights, subtle warm illumination with cool teal rim light.

## Subjects

- poster_cosmos: A framed wall poster: charming little exploration rocket passing a luminous ringed planet and stars, deep violet space, teal and amber accents. No lettering.
- poster_cat: A framed wall poster: charismatic friendly cyber cat wearing big teal headphones, purple and cyan city-night color accents, clean graphic composition. No lettering.
- poster_wave: A framed wall poster: luminous stylized turquoise ocean wave under a lavender moon with a small peach sun, dreamy synthwave art, graceful curves. No lettering.
- poster_garden: A framed wall poster: lush magical botanical leaves with soft glowing butterflies, emerald and jade foliage with lilac and amber details, calm cozy illustration. No lettering.
- wall_clock: A round contemporary wall clock, cream face, deep navy edge, small luminous turquoise hour marks and warm amber hands. No text or numbers, no pedestal or background.
- wall_neon: An elegant wall-mounted neon lightning bolt inside a thin incomplete circular orbit, layered teal and lavender glass tubes with subtle wall attachment pegs. No text.
- gaming_chair: A premium compact cozy gaming swivel chair, cream upholstery with lavender cushions and turquoise accent piping, rounded armrests, wooden-and-metal five-leg wheeled base, inviting ergonomic shape.
- snack_cabinet: A compact cream and warm oak snack cabinet with rounded corners, small glass door showing two cocoa mugs and a few colorful snack jars, teal handle, small lavender kettle on top, no readable text.
- craft_desk: A compact creative hobby workbench in pale wood and cream, neatly arranged tiny robot model, colored pencils and craft tools, teal task mat, two drawers with lavender handles, no writing.
- terrarium: A beautiful compact glass geometric terrarium on a low warm oak stand, layered soil and moss, tiny fern plants and glowing lilac crystal, delicate teal metal frame.
- robot_pet: An adorable small friendly companion robot pet shaped like a round puppy, cream enamel shell, teal glass face with kind simple cyan eyes, lavender ears, four stubby feet, small amber collar light.
- cloud_lamp: A sculptural floor lamp with a soft white luminous cloud shade, two tiny warm star pendants, slim turquoise stem, rounded cream base, gentle lavender details.

## Уточнение часов и неона

Часы дополнительно извлечены imagegen из первоначального результата:

> Remove the entire rectangular wooden frame AND the entire rectangular cream backing. Keep ONLY the circular clock, including its dark navy round outer rim, cream circular dial, turquoise hour markers and amber hands. Preserve the clock design and face details. Outside the ROUND rim must be truly transparent alpha everywhere. This is a round physical wall clock object, not a picture of a clock. Perfectly front-facing, square canvas, full round clock centered with 8% transparent padding. No rectangular shapes, no frame, no pedestal, no shadow, no lettering.

Неон:

> Remove the rectangular wooden frame and ALL solid rectangular white backing. Keep ONLY the turquoise/lavender glowing glass lightning bolt, incomplete circular neon orbit, and the tiny gold/teal mounting clips. Preserve their polished glass design. Everywhere between and around the tubes must have real transparent alpha, apart from subtle translucent neon bloom. It is a physical wall-mounted neon sculpture, NOT a framed poster. Perfect front view, square canvas, entire neon object centered with safe 10% transparent padding. No rectangle, no picture frame, no backing board, no writing, no cast shadow.
