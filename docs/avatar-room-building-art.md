# Дом вокруг квартиры, v1

Источник: встроенный ImageGen, архитектурное расширение `public/art/avatar-room/sources/shell-v1.png`. Итоговый рисунок — единое здание, без наложения отдельной старой комнаты поверх фасада. Только наша квартира открыта в разрезе, соседние закрыты стенами и окнами.

PNG: `public/art/avatar-room/sources/building-v1.png`, 1483 × 1061. Рабочий WebP: `public/art/avatar-room/building-v1.webp`. Калибровка фасада и виды камеры: `components/RoomBuilding.tsx`. Сетка пола: `utils/avatarRoomGeometry.ts`. Координаты сохранённой мебели остаются логическими клетками 8 × 8; покупки и расстановка сохраняются.

Масштаб рисунка по осям 1.37/1.35, смещение -303/-125. Вертикали здания сохраняются вертикальными. Сетка вписана внутрь деревянного пола; в общем виде видны соседи сверху, по бокам и нижний жилой этаж. При обустройстве камера переключается на квартиру. Свет соседних окон слегка меняется; reduced-motion отключает анимацию.

## Промпт

+Use case: precise-object-edit / architectural outpainting. Reference is the EXACT CyberLearn empty isometric apartment. Create a beautiful production game environment of a futuristic residential building with this apartment exposed as a cutaway among closed neighboring flats. Landscape illustration, premium polished painted stylized 3D game art, same orthographic elevated isometric camera and SAME navy/pearl/wood/teal/lavender architectural language as reference. This is ONE COHERENT CONTINUOUS RESIDENTIAL BUILDING, not separate floating islands.

COMPOSITION AND GEOMETRY: imagine a world canvas from x=-240 to1776, y=-180 to1260 around the supplied original1536x1024 apartment. In final picture the ORIGINAL ROOM occupies central76% width, about71% height. Keep room geometry intact: large night-city window on left rear wall, solid navy right rear wall with thin cyan light bars, warm wood empty square floor. Original room's rear apex maps about final(768,140), left floor edge(210,575), right floor edge(1350,615), front tip(760,825) in a1536x1097 image. No furnishings, no people, no text inside this room.

AROUND IT: continue the exact load-bearing slab edges and wall thickness into adjoining closed apartments on LEFT and RIGHT, with opaque exterior navy facades and carefully detailed framed rectangular glass windows glowing soft warm amber/teal. A lower residential floor extends directly DOWN from the exposed apartment's two front slab edges, forming a convincing V-shaped facade in the SAME isometric planes, with3-4 broad windows on each face, architectural horizontal ribs and small cyan lights. Some lower windows dark, some warm, understated curtains behind glass. A quiet service band and neighboring wall shoulders behind upper room sides. Exterior architecture should physically JOIN the apartment walls and slab, with convincing contact shadows; central apartment must not look pasted onto unrelated background. Surrounding flats remain closed: ONLY wall and windows, no other cutaway interiors, no visible furniture. Frame buildings with a subtle atmospheric midnight skyline and very distant tiny window lights, no big extra towers competing with home. Calm, elegant, crafted, cohesive facade, restrained detail, low visual noise. Keep the central apartment light and warm and slightly brighter than exterior, all neighbors darker. NO facade panel or scenery overlaps the usable central wood floor. No roof covers our open apartment. Full building crop may continue out of frame at left/right/bottom. No typography, numbers, logos, UI, signage, characters, flying vehicles. Preserve reference aesthetics.

## Текущий вид

По запросу пользователя оставлен только приближённый вид квартиры. Общий вид дома и кнопка переключения удалены из интерфейса; фасад остаётся частью окружения по краям комнаты.
