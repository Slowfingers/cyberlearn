import React, { useId } from 'react';
import { SpriteStrip } from './SpriteStrip';
import { SPRITE_SILHOUETTES } from './spriteSilhouettes';

export const AVATAR_NAMES = ['Орион', 'Киберлиса', 'Байт', 'Луна', 'Полярный кот', 'Пиксель', 'Нова', 'Неоновый волк', 'Спутник', 'Вега', 'Панда', 'Кварк', 'Комета', 'Рысь', 'Атлас', 'Аврора', 'Дракон', 'Импульс', 'Солярис', 'Фенек', 'Титан', 'Зенит', 'Сова', 'Космо'];
export const STREET_AVATARS = [
    { value: 'street_frost', name: 'Фрост', role: 'Ледяной райдер', cost: 200, unlockLevel: 1 },
    { value: 'street_akira', name: 'Акира', role: 'Гонщица мегаполиса', cost: 300, unlockLevel: 2 },
    { value: 'street_rex', name: 'Рекс', role: 'Король танцпола', cost: 400, unlockLevel: 3 },
    { value: 'street_jade', name: 'Джейд', role: 'Изобретательница', cost: 500, unlockLevel: 4 },
    { value: 'street_onyx', name: 'Оникс', role: 'Ночной ниндзя', cost: 650, unlockLevel: 5 },
    { value: 'street_sunny', name: 'Санни', role: 'Художник улиц', cost: 250, unlockLevel: 2 },
    { value: 'street_volt', name: 'Вольт', role: 'Техно-бегун', cost: 150, unlockLevel: 1 },
    { value: 'street_nova', name: 'Нова Рэй', role: 'Мастер кода', cost: 250, unlockLevel: 2 },
    { value: 'street_echo', name: 'Эхо', role: 'Неоновый диджей', cost: 350, unlockLevel: 3 },
    { value: 'street_blaze', name: 'Блейз', role: 'Королева скейта', cost: 450, unlockLevel: 4 },
];
export const FRAME_NAMES = ['Контур', 'Орбита', 'Микросхема', 'Кристалл', 'Затмение', 'Северное сияние', 'Солнечная корона', 'Портал', 'Звёздная карта', 'Титановый щит', 'Сверхновая', 'Галактика'];
const PALETTES = [['#67e8f9', '#2563eb'], ['#fdba74', '#ea580c'], ['#c4b5fd', '#7c3aed'], ['#f9a8d4', '#db2777'], ['#a7f3d0', '#059669'], ['#fde68a', '#d97706'], ['#a5b4fc', '#4f46e5'], ['#fda4af', '#be123c']];

export default function ShopAvatar({ avatarId = '2', frameId, scale = 2, className = '', animation = 'Idle', fullBody = false }: { avatarId?: string; frameId?: string; scale?: number; className?: string; animation?: string; fps?: number; fullBody?: boolean }) {
    const street = STREET_AVATARS.find(item => item.value === avatarId);
    const uid = useId().replace(/:/g, '');
    const index = Math.max(0, Math.min(23, (Number(avatarId) || 2) - 2));
    const family = index % 3;
    const variant = Math.floor(index / 3);
    const [light, dark] = PALETTES[variant];
    const frame = Math.max(0, Math.min(12, Number(frameId?.replace('frame_', '')) || 0));
    const [rim, rimDark] = PALETTES[(Math.max(1, frame) - 1) % PALETTES.length];
    const fill = (name: string) => `url(#${uid}-${name})`;
    return <svg viewBox="0 0 160 160" width={48 * scale} height={48 * scale} role="img" aria-label={`${street?.name || AVATAR_NAMES[index]}${frame ? `, рамка ${FRAME_NAMES[frame - 1]}` : ''}`} className={`shrink-0 ${className}`}>
        <defs>
            <radialGradient id={`${uid}-bg`} cx="35%" cy="20%" r="90%"><stop stopColor={dark} /><stop offset="1" stopColor="#080e20" /></radialGradient>
            <linearGradient id={`${uid}-shell`} x2="0.8" y2="1"><stop stopColor="#f8fafc" /><stop offset="0.4" stopColor={light} /><stop offset="1" stopColor={dark} /></linearGradient>
            <linearGradient id={`${uid}-visor`} x2="0.7" y2="1"><stop stopColor="#334155" /><stop offset="0.55" stopColor="#111827" /><stop offset="1" stopColor="#020617" /></linearGradient>
            <linearGradient id={`${uid}-rim`} x2="1" y2="1"><stop stopColor={rim} /><stop offset="0.5" stopColor={rimDark} /><stop offset="1" stopColor={rim} /></linearGradient>
            <clipPath id={`${uid}-clip`}><circle cx="80" cy="80" r="65" /></clipPath>
        </defs>
        <circle cx="80" cy="80" r="68" fill="#080e20" />
        <g clipPath={fill('clip')}>
            <circle cx="80" cy="80" r="65" fill={fill('bg')} />
            <circle cx="111" cy="42" r="30" fill="none" stroke={light} strokeOpacity="0.16" strokeWidth="12" />
            <path d="M12 112 144 38M18 130 150 56" stroke={light} strokeOpacity="0.1" strokeWidth="2" />
            {street ? <svg x={fullBody ? 43 : 18} y={fullBody ? 12 : 17} width={fullBody ? 74 : 124} height={fullBody ? 136 : 130} viewBox={fullBody ? '0 0 362 724' : '0 0 362 380'} overflow="hidden" preserveAspectRatio="xMidYMin meet">
                <SpriteStrip skin={street.value.replace('street_', '') as keyof typeof SPRITE_SILHOUETTES} className="street-avatar-strip" href={`/avatar/street/${street.value.replace('street_', '')}.png`}/>

            </svg> : <>
            <path d="M28 150Q30 112 61 110H99Q130 112 132 150" fill={fill('shell')} stroke="#0f172a" strokeWidth="3" />
            <path d="m58 113 22 22 22-22 12 37H46Z" fill="#172036" />
            <path d="m72 133 8-7 8 7-8 12Z" fill={light} />
            {family === 0 && <>
                <rect x="36" y="60" width="15" height="34" rx="7" fill={dark} stroke={light} strokeWidth="2" />
                <rect x="109" y="60" width="15" height="34" rx="7" fill={dark} stroke={light} strokeWidth="2" />
                <path d="M43 78Q39 32 80 29Q121 32 117 78L111 105Q80 132 49 105Z" fill={fill('shell')} stroke="#0f172a" strokeWidth="3" />
                <path d="M49 69Q80 49 111 69L108 91Q80 108 52 91Z" fill={fill('visor')} />
                <path d="M56 70Q75 60 94 65" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
                <path d="M59 85h13m16 0h13" stroke={light} strokeWidth="4" strokeLinecap="round" />
                <path d={variant % 2 ? 'M70 38 80 47 90 38' : 'M76 34h8v17h-8Z'} fill={dark} stroke={dark} strokeWidth="3" />
                <path d="M64 110h32" stroke={dark} strokeWidth="4" strokeLinecap="round" />
            </>}
            {family === 1 && <>
                <path d={variant === 4 ? 'M41 76Q23 24 56 37L80 50 104 37Q137 24 119 76' : variant === 6 ? 'M43 74 32 28 70 48 90 48 128 28 117 74' : 'M42 76 40 25 72 49 88 49 120 25 118 76'} fill={fill('shell')} stroke="#0f172a" strokeWidth="3" />
                <path d="m48 43 4 25 14-12m46-13-4 25-14-12" fill={dark} />
                <path d="M42 68Q80 40 118 68L119 94Q107 113 80 122Q53 113 41 94Z" fill={fill('shell')} stroke="#0f172a" strokeWidth="3" />
                <path d="m45 83 28 9 7 17 7-17 28-9-11 24-24 11-24-11Z" fill="#f1f5f9" fillOpacity="0.85" />
                <path d="m52 77 18 5-7 9-11-4m56-10-18 5 7 9 11-4" fill="#0f172a" />
                <path d="m74 99 6-3 6 3-6 6Z" fill="#172036" />
                <path d="M80 105v5m-30-15-15-3m15 10-15 3m75-10 15-3m-15 10 15 3" stroke={dark} strokeWidth="2" strokeLinecap="round" />
                {variant === 4 && <g fill="#172036"><ellipse cx="59" cy="80" rx="13" ry="16" /><ellipse cx="101" cy="80" rx="13" ry="16" /><circle cx="60" cy="78" r="4" fill="white" /><circle cx="100" cy="78" r="4" fill="white" /></g>}
                {variant === 5 && <><path d="m47 53 2-29 15 20m49 9-2-29-15 20M72 57l8-14 8 14-8 9Z" fill="#fde68a" stroke={dark} strokeWidth="2" /><path d="m58 105 5 8 4-7m26 0 4 7 5-8" fill="white" /></>}
                {variant === 7 && <><path d="M45 73 62 59 78 75 98 59 115 73" fill="none" stroke={dark} strokeWidth="6" /><g fill="#fef3c7" stroke={dark} strokeWidth="3"><circle cx="61" cy="83" r="14" /><circle cx="99" cy="83" r="14" /></g><g fill="#172036"><circle cx="62" cy="83" r="6" /><circle cx="98" cy="83" r="6" /></g><path d="m74 99 6-6 6 6-6 10Z" fill="#f59e0b" /></>}
            </>}
            {family === 2 && <>
                <path d="M80 45V28m-5 0h10" stroke={light} strokeWidth="4" strokeLinecap="round" />
                <circle cx="80" cy="24" r="6" fill={light} />
                <rect x="33" y="70" width="15" height="24" rx="5" fill={dark} />
                <rect x="112" y="70" width="15" height="24" rx="5" fill={dark} />
                <rect x="42" y="43" width="76" height="72" rx={variant % 2 ? 28 : 18} fill={fill('shell')} stroke="#0f172a" strokeWidth="3" />
                <rect x="49" y="57" width="62" height="43" rx="14" fill={fill('visor')} />
                <path d="M57 64h24" stroke="white" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
                {variant % 2 ? <path d="m58 81 7-5 7 5m16 0 7-5 7 5" fill="none" stroke={light} strokeWidth="4" strokeLinecap="round" /> : <g fill={light}><rect x="59" y="74" width="10" height="13" rx="5" /><rect x="91" y="74" width="10" height="13" rx="5" /></g>}
                <path d="M73 92h14m-19 15h24" stroke={dark} strokeWidth="3" strokeLinecap="round" />
            </>}
            </>}
            <path d="m27 47 2-5 2 5 5 2-5 2-2 5-2-5-5-2Z" fill={light} />
            <circle cx="127" cy="106" r="2" fill={light} />
            {animation !== 'Idle' && <path d="m121 30-7 13h9l-7 15 19-20h-10l7-8Z" fill="#fef08a" />}
        </g>
        <circle cx="80" cy="80" r="67" fill="none" stroke={frame ? fill('rim') : '#475569'} strokeWidth={frame ? 4 : 1.5} />
        {frame > 0 && <g fill="none" stroke={fill('rim')} strokeWidth="2">
            {frame % 4 === 1 && <><circle cx="80" cy="80" r="73" strokeDasharray="85 14 12 14" /><path d="m70 9 10-5 10 5m-20 142 10 5 10-5" /></>}
            {frame % 4 === 2 && <><path d="M40 17 17 40v25M120 17l23 23v25M17 95v25l23 23m103-48v25l-23 23" strokeWidth="4" /><path d="M25 59v42m110-42v42" /></>}
            {frame % 4 === 3 && <><path d="m80 3 54 23 23 54-23 54-54 23-54-23L3 80l23-54Z" /><path d="m80 8 6 8-6 8-6-8Zm0 128 6 8-6 8-6-8Z" fill={rim} /></>}
            {frame % 4 === 0 && <><circle cx="80" cy="80" r="74" strokeDasharray="2 9" strokeWidth="3" /><path d="m17 80-9-8v16Zm126 0 9-8v16ZM72 8h16m-16 144h16" fill={rim} /></>}
            {frame > 8 && <path d="m63 16 5-12 12 8L92 4l5 12M63 144l5 12 12-8 12 8 5-12" fill={rimDark} />}
        </g>}
    </svg>;
}
