import React from 'react';
import { PixelSprite } from './PixelSprite';

/** Original pixel scenes: cyber city, companions and a distinct object per course. */
export function AcademyArt({ variant = 0 }: { variant?: number }) {
  const accent = ['#43eaff','#8cffbe','#ffd85d','#ae8bff','#ff8fd5'][variant % 5];
  const kind = ['computer','bot','rocket','shield','trophy'][variant % 5];
  return <svg className="academy-art" viewBox="0 0 160 96" fill="none" aria-hidden="true" shapeRendering="crispEdges">
    <path d="M14 69V41H19V36H30V41H35V69H41V25H48V20H59V25H65V69H105V36H112V30H126V36H132V69H139V48H151V69" fill="#192c48"/>
    <path d="M17 69V49H32V69M44 69V34H62V69M110 69V44H129V69M141 69V56H148V69" fill="#101c33"/>
    {[22,28,48,56,115,123,143].map((x,i)=><g key={x} fill={i%2 ? '#bc76ff' : accent} opacity=".6"><rect x={x} y={i<4 ? 47:57} width="2" height="3"/><rect x={x} y={i<4 ? 56:64} width="2" height="3"/></g>)}
    <path d="M17 75H29V71H131V75H143V82H131V87H29V82H17Z" fill="#071220"/>
    <path d="M25 73H135V77H143V81H17V77H25Z" fill="#294c69"/>
    <path d="M29 74H131V77H29Z" fill={accent}/><path d="M34 82H127V85H34Z" fill={accent} opacity=".3"/>
    <rect x="52" y="7" width="2" height="2" fill="#77bdd1"/><rect x="103" y="13" width="2" height="2" fill="#77bdd1"/><rect x="23" y="20" width="3" height="3" fill="#af8eff"/><rect x="137" y="20" width="3" height="3" fill="#af8eff"/>
    <path d="M80 4H83V7H86V10H83V13H80V10H77V7H80Z" fill="#ffd85d"/>
    <PixelSprite kind={kind} x={53} y={15} size={62} accent={accent}/>
    <PixelSprite kind="coin" x={21} y={46} size={20}/><path d="M126 45H129V48H132V51H129V54H126V51H123V48H126Z" fill={accent}/>
  </svg>;
}
