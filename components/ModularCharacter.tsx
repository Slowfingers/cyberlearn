import React, { useId } from 'react';
import type { CharacterParts } from '../types';
export type CharacterMotion = 'idle' | 'walk' | 'jump' | 'success' | 'retry' | 'thinking' | 'speaking' | 'wave';

/** Layered Orion: all saved parts remain independent; limbs share a walk rig. */
export function ModularCharacter({parts,stage=false,className='',scale=2,frameId,motion='idle',ariaLabel='Орион в выбранном образе'}: {parts:CharacterParts;stage?:boolean;className?:string;scale?:number;frameId?:string;motion?:CharacterMotion;ariaLabel?:string}) {
 const uid=useId().replace(/[^a-zA-Z0-9]/g,'');
 const fill=(name:string)=>`url(#${uid}-${name})`;
 const frame=Math.max(0,Math.min(12,Number(frameId?.replace('frame_',''))||0));
 const palette=[['#67e8f9','#2563eb'],['#fdba74','#ea580c'],['#c4b5fd','#7c3aed'],['#f9a8d4','#db2777'],['#a7f3d0','#059669'],['#fde68a','#d97706'],['#a5b4fc','#4f46e5'],['#fda4af','#be123c']];
 const [rim,rimDark]=palette[(Math.max(1,frame)-1)%palette.length];
 const extraOutfits:Record<string,string[]>={skirt_suit:['#6048a5','#c7b5ff','#31294e'],dress:['#316b92','#9beaff','#183b59'],long_hoodie:['#a04b80','#ffd0ec','#522b4b'],mint:['#257568','#91f2c9','#153f3b'],rose:['#a34e7d','#ffc5e6','#512a50'],silver:['#8295af','#e5f3ff','#37465f']};
 const hairColors:Record<string,string[]>={navy:['#7485a4','#35415f','#101e39'],violet:['#c5a0f8','#7541b2','#352050'],copper:['#f6c38c','#a55738','#522b28'],silver:['#faf3df','#c7bcaa','#777d91']};
 const skinColors:Record<string,string[]>={warm:['#ffe1bb','#e9b28f','#ad6b66'],light:['#fff0d9','#f7d4bb','#cc9b92'],tan:['#edbd8c','#bd865e','#7e4d43'],deep:['#bb896a','#84563f','#51352d']};
 const hc=hairColors[parts.hairColor??'navy']??hairColors.navy;
 const sc=skinColors[parts.skinTone??'warm']??skinColors.warm;
 const emotion=motion==='success'?'happy':motion==='thinking'?'focused':parts.emotion;
 const [cloth,light,dark]=extraOutfits[parts.outfit] ?? (parts.outfit==='violet'?['#7253ad','#d29cff','#352750']:parts.outfit==='orange'?['#b77139','#ffdc8f','#674127']:['#276f91','#8becff','#173c5c']);
 const longHair=['long','bob','ponytail','braid'].includes(parts.hair);
 const hair=longHair?'M43 74Q30 27 73 23 112 19 120 54L116 81 105 65 100 43Q81 65 53 59L48 80Z':parts.hair==='curls'?'M43 72Q25 55 41 44 32 25 54 24 63 8 79 22 99 9 110 29 132 28 122 49 135 64 116 74L103 59 88 63 75 52 59 64Z':parts.hair==='undercut'?'M43 71 44 46Q54 20 91 24L115 38 119 68 107 57 104 41 62 49 51 72Z':parts.hair==='spikes'?'M44 71 36 50 49 43 48 25 67 35 80 17 92 35 109 25 114 45 124 57 118 74 107 62 94 66 83 48 70 61 55 57Z':parts.hair==='sweep'?'M43 72Q31 32 62 25 100 13 119 44L120 73 108 58 100 43Q85 69 48 60Z':'M44 72 38 50 49 36 61 38 68 23 83 32 100 29 116 46 120 71 108 58 95 61 84 48 72 60 57 57Z';
 return <svg viewBox={stage?'0 0 160 260':'0 0 160 160'} width={48*scale} height={stage?78*scale:48*scale} role="img" aria-label={ariaLabel} data-character="orion" data-motion={motion} data-pose={parts.animation} data-hair-color={parts.hairColor??'navy'} data-skin-tone={parts.skinTone??'warm'} data-emblem={parts.emblem??'bolt'} data-outfit={parts.outfit} data-hair={parts.hair} data-accessory={parts.accessory} className={`modular-character character-rig ${className}`}>
  <defs>
   <linearGradient id={`${uid}-rim`} x2=".8" y2="1"><stop stopColor={rim}/><stop offset=".5" stopColor={rimDark}/><stop offset="1" stopColor={rim}/></linearGradient>
   <linearGradient id={`${uid}-cloth`} x1="0" y1="0" x2="1" y2=".8"><stop stopColor={light}/><stop offset=".2" stopColor={cloth}/><stop offset=".65" stopColor={dark}/><stop offset="1" stopColor={cloth}/></linearGradient>
   <linearGradient id={`${uid}-skin`} x1=".2" x2=".9" y2="1"><stop stopColor={sc[0]}/><stop offset=".5" stopColor={sc[1]}/><stop offset="1" stopColor={sc[2]}/></linearGradient>
   <linearGradient id={`${uid}-hair`} x1=".2" x2=".8" y2="1"><stop stopColor={hc[0]}/><stop offset=".35" stopColor={hc[1]}/><stop offset=".8" stopColor={hc[2]}/><stop offset="1" stopColor="#607ba2"/></linearGradient>
   <linearGradient id={`${uid}-pants`} x1="0" x2="1" y2=".4"><stop stopColor="#52627d"/><stop offset=".4" stopColor="#27344f"/><stop offset="1" stopColor="#121f37"/></linearGradient>
   <linearGradient id={`${uid}-shoe`} x1="0" x2=".7" y2="1"><stop stopColor="#ecf6ff"/><stop offset=".55" stopColor="#8ba6bf"/><stop offset="1" stopColor="#344c70"/></linearGradient>
   <linearGradient id={`${uid}-glass`} x1="0" x2=".7" y2="1"><stop stopColor="#447da0"/><stop offset=".4" stopColor="#102c48"/><stop offset="1" stopColor="#080f25"/></linearGradient>
   <radialGradient id={`${uid}-portrait`}><stop stopColor={dark}/><stop offset="1" stopColor="#0a1429"/></radialGradient>
   <clipPath id={`${uid}-clip`}><circle cx="80" cy="80" r="65"/></clipPath>
  </defs>
  {!stage&&<circle cx="80" cy="80" r="75" fill={fill('portrait')}/>}
  <g clipPath={stage?undefined:fill('clip')} stroke="#101b31" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
   <g className="character-body avatar-motion-body">
    {longHair&&<g className="character-hair-back" fill={fill('hair')}>
     {parts.hair==='long'&&<><path d="M44 64Q23 87 31 145L44 166 59 151 58 91Zm68-4q27 24 19 89l-15 17-13-20 1-59Z"/><path d="M39 85q-8 40 6 65m73-65q10 39-2 67" fill="none" stroke={hc[0]} strokeWidth="2" strokeOpacity=".55"/></>}
     {parts.hair==='bob'&&<><path d="M43 56q-18 25-7 58l23 10 6-27-9-40Zm65-5q25 18 17 61l-24 12-6-26 8-40Z"/><path d="m42 81 2 26m73-26-2 26" fill="none" stroke={hc[0]} strokeWidth="2"/></>}
     {parts.hair==='ponytail'&&<><path d="M108 34q36-13 35 26l-10 31q-8 36 5 62-26-12-28-39l6-46-13-17Z"/><path d="m122 52q9 17-1 44t7 40" fill="none" stroke={hc[0]} strokeWidth="2"/><path d="m107 42 14 7" fill="none" stroke={light} strokeWidth="6"/></>}
     {parts.hair==='braid'&&<><path d="M104 52q28 13 18 47l-12 4-9-38Z"/>{[0,1,2,3,4].map(i=><path key={i} d={`M${111+i} ${90+i*14}q19 4 9 15l-9 5-5-13Z`} stroke={hc[0]} strokeWidth="1.2"/>)}<path d="m114 163 15 1-7 16-9-5Z"/><path d="M115 163h13" stroke={light} strokeWidth="4"/></>}
    </g>}
    {stage&&<>
     <g className="character-leg character-leg--far" style={{transformOrigin:'94px 150px'}}>
      <path d="m83 142 26 3-3 46-2 29-18-2-6-40Z" fill={fill('pants')}/><path d="m96 155 5 26-5 25" fill="none" stroke="#7392aa" strokeOpacity=".4"/>
      <path d="m85 213 20 1 3 12 15 7-1 14-39 1-2-12Z" fill={fill('shoe')}/><path d="m83 239 39-1v10H83Z" fill="#15263b"/><path d="M87 243h30" stroke={light} strokeWidth="3"/><path d="m89 224 12 2m-13 3 16 2" stroke="#fff" strokeWidth="1.5"/>
     </g>
     <g className="character-leg character-leg--near" style={{transformOrigin:'65px 150px'}}>
      <path d="m52 143 30 1-6 45-2 31-22-1-3-37Z" fill={fill('pants')}/><path d="m56 161 3 34 12 3m-18-13 19 1" fill="none" stroke="#7a94b1" strokeWidth="1.5" strokeOpacity=".5"/>
      <path d="m51 212 22 2 3 17-1 17H37l-1-13 12-9Z" fill={fill('shoe')}/><path d="M37 239h38v10H37Z" fill="#17283d"/><path d="M41 244h29" stroke={light} strokeWidth="3"/><path d="m53 225 14 2m-17 3 18 2" stroke="#fff" strokeWidth="1.5"/>
     </g>
    </>}
    <g className={`character-arm character-arm--far ${(parts.animation==='wave'||motion==='wave')&&motion!=='walk'?'character-wave-arm':''}`} style={{transformOrigin:'106px 119px'}}>
     <path d="m105 109 15 13 7 31-7 21-15-4 3-26-12-20Z" fill={fill('cloth')}/><path d="m116 129 4 22-7 12" fill="none" stroke={light} strokeWidth="2"/>
     <path d="m108 165 15 4-1 13-8 6-10-5Z" fill={fill('skin')}/><path d="m107 167 16 4-2 7-15-3Z" fill="#1a2b41"/><path d="m111 179 6 2" stroke="#b47d71"/>
    </g>
    {parts.outfit==='dress'?<g className="character-outfit-dress">
     <path d="m61 105 19 12 18-12 15 16-18 27 19 45q-33 12-69 0l18-45-19-27Z" fill={fill('cloth')}/>
     <path d="m63 149 30 1m-37 39q25 8 47-1" fill="none" stroke={light} strokeWidth="3"/>
     <path d="m78 158-3 30m12-30 7 29" fill="none" stroke={dark} strokeWidth="2"/>
     <path d="m69 109 11 12 12-12" fill="none" stroke={light} strokeWidth="2"/><path d="m78 132 5-5 5 5-5 7Z" fill={light}/>
    </g>:parts.outfit==='long_hoodie'?<g className="character-outfit-hoodie">
     <path d="m60 104 20 10 18-10 18 17-13 61q-24 8-48 0l-13-61Z" fill={fill('cloth')}/>
     <path d="m58 105 22 17 20-17-3 18-17 8-19-8Z" fill={dark}/>
     <path d="m69 129-1 16m23-16 1 16m-30 15 36 1-4 12-29-1Z" fill="none" stroke={light} strokeWidth="2"/>
     <path d="M57 178q22 5 44 0" fill="none" stroke={light} strokeWidth="3"/>
    </g>:<>
    <path d="M60 103h39l18 17-11 39-19 8-32-6-14-40Z" fill={fill('cloth')}/>
    <path d="m60 108 20 16 19-16 2 51-42-1Z" fill="#101d34"/><path d="m68 114 12 8 11-9-3 45H72Z" fill="#29415c"/>
    <path d="m59 106-14 14 11 29 8-15-3-13 11 9 8-7Z" fill={cloth}/><path d="m99 106 17 15-11 30-9-18 4-14-12 12-8-8Z" fill={cloth}/>
    <path d="m46 121 10 5 6 23m48-27-10 6-5 21" fill="none" stroke={light} strokeWidth="2.5"/>
    <path d="M79 126v33" stroke="#a5c9db" strokeWidth="1.5"/><path d="M78 137h4v8h-4Z" fill="#bce7ef" strokeWidth=".8"/>
    <path d="m46 146 14 7 13-2m25-1 9-4M56 160l20 3 24-4" fill="none" stroke={light} strokeOpacity=".5"/>
    <path d="m101 130 9 2-2 9-9-2Z" fill="#ffcb77"/><path d="m102 132 5 1-1 3" fill="none" stroke="#fff0b5" strokeWidth="1"/>
    {parts.outfit==='skirt_suit'&&<g className="character-outfit-skirt"><path d="M56 156h47l12 34q-33 10-71 0Z" fill={fill('cloth')}/><path d="m62 164-5 25m18-25-1 29m14-29 4 28m7-28 7 26" fill="none" stroke={light} strokeOpacity=".55" strokeWidth="2"/><path d="M55 159h49" stroke={dark} strokeWidth="5"/></g>}
    </>}
    <g className="character-arm character-arm--near" style={{transformOrigin:'48px 119px'}}>
     <path d="m45 111-14 17-7 29 5 20 16-5 3-28 11-19Z" fill={fill('cloth')}/><path d="m38 129-7 24 6 14" fill="none" stroke={light} strokeWidth="2"/>
     <path d="m28 168 16 1 3 14-7 8-12-4-3-9Z" fill={fill('skin')}/><path d="m26 168 18 1 1 7-18 1Z" fill="#152b43"/><path d="m32 182 8 1m-10-6v7" stroke="#b87e6f" strokeWidth="1"/>
    </g>
    <g className="character-head">
     <path d="m66 99 1 13 13 9 15-10-2-14Z" fill={fill('skin')}/><path d="m67 108 13 7 14-8" fill="none" stroke="#9c625e"/>
     <path d="M45 67Q38 29 79 28q40 0 38 42l-6 27q-10 20-31 22-24-3-32-24Z" fill={fill('skin')}/>
     <path d="M48 78q-14-9-9 9l10 8m65-16q13-8 9 8l-10 8" fill={fill('skin')}/>
     <path d="M53 96q10 16 27 17 16-1 27-16" fill="none" stroke="#ffc9a7" strokeWidth="2"/>
     <path d={hair} fill={fill('hair')}/><path d={parts.hair==='sweep'?'M48 46q26-27 56-6L91 49':'M48 49l13-5 6-10 15 8 16-4 9 12'} fill="none" stroke="#a8b8d0" strokeWidth="2" strokeOpacity=".6"/>
     <path d="m43 58 5 12m67-16 3 12" fill="none" stroke={light} strokeOpacity=".7"/>
     {parts.accessory==='visor'?<>
      <path d="m45 72 70-2-3 23q-32 11-64-1Z" fill={fill('glass')} stroke="#1a273f" strokeWidth="3"/><path d="m49 74 62-1" stroke="#9aeaff" strokeWidth="1.5"/>
      <path d={emotion==='wink'?'m53 81 17-1m20 2 15-4':'m53 81 17-1m20 0 15 1'} stroke="#7ef2ff" strokeWidth="4"/><path d="m51 75 15 16" stroke="#c6f8ff" strokeOpacity=".2" strokeWidth="3"/>
     </>:<>
      <path d="m56 73 11-2m26 0 12 2" stroke="#3a3448" strokeWidth="3"/>
      <path d="M58 81h7" stroke="#1b283d" strokeWidth="4"/>{emotion==='wink'?<path d="m94 81 9 2" stroke="#1b283d" strokeWidth="3"/>:<path d="M96 81h7" stroke="#1b283d" strokeWidth="4"/>}
      <path d="M60 79h1m37 0h1" stroke="#fff" strokeWidth="1.5"/>
     </>}
     <path d="m80 88-3 8 6 1" fill="none" stroke="#c98c79" strokeWidth="1.5"/>
     <path d={emotion==='happy'?'M69 102q11 16 23-1Z':emotion==='focused'?'M72 105h17':emotion==='wink'?'M72 105q10 7 20-4':'M72 105q9 5 17-1'} fill={emotion==='happy'?'#fff1df':'none'} stroke="#9a5b5c" strokeWidth="1.5"/>
     {parts.accessory==='glasses'&&<g fill="#385673" fillOpacity=".4" stroke="#14283e" strokeWidth="3"><rect x="49" y="73" width="25" height="19" rx="6"/><rect x="87" y="73" width="25" height="19" rx="6"/><path d="M74 80h13"/></g>}
     {parts.accessory==='cap'&&<><path d="M41 57q0-37 39-37 38 0 38 37Z" fill={fill('cloth')}/><path d="M41 57q38-10 77 0l-7 10q-30-6-70 0Z" fill={dark}/><path d="m73 30 7-4 7 4v12H73Z" fill={light}/></>}
     {parts.accessory==='scarf'&&<><path d="m60 105 20 10 19-10 5 10-23 12-25-12Z" fill={light}/><path d="m88 119 12 5 5 28-14-3Z" fill={cloth}/></>}
     {parts.accessory==='headphones'&&<><path d="M39 76Q35 23 80 24q45 0 42 52" fill="none" stroke="#17283e" strokeWidth="8"/><path d="M40 69h9v25H39Zm72 0h10v25h-10Z" fill={fill('cloth')}/><path d="M42 74v14m75-14v14" stroke={light} strokeWidth="2"/></>}
    </g>
   </g>
  </g>
  {!stage&&<><circle cx="80" cy="80" r="67" fill="none" stroke={frame?fill('rim'):'#49637c'} strokeWidth={frame?4:1.5}/>{frame>0&&<g fill="none" stroke={fill('rim')} strokeWidth="2"><circle cx="80" cy="80" r="74" strokeDasharray={frame%2?'34 8 4 8':'2 8'} strokeWidth="3"/><path d="m69 10 11-5 11 5m-22 140 11 5 11-5"/>{frame>8&&<path d="m60 16 7-12 13 8L93 4l7 12" fill={rimDark}/>}</g>}</>}
 </svg>;
}
