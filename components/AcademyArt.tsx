import React, { useId } from 'react';
import { PixelSprite } from './PixelSprite';

/** Original pixel scenes: cyber city, companions and a distinct object per course. */
export function AcademyArt({ variant = 0, hero = false }: { variant?: number; hero?: boolean }) {
  const screenId = useId();
  const accent = ['#43eaff','#8cffbe','#ffd85d','#ae8bff','#ff8fd5'][variant % 5];
  const kind = ['computer','bot','rocket','shield','trophy'][variant % 5];
  return <svg className={hero ? 'academy-art academy-art-hero' : 'academy-art'} viewBox="0 0 160 96" fill="none" aria-hidden="true" shapeRendering="crispEdges">
    <path d="M14 69V41H19V36H30V41H35V69H41V25H48V20H59V25H65V69H105V36H112V30H126V36H132V69H139V48H151V69" fill="#192c48"/>
    <path d="M17 69V49H32V69M44 69V34H62V69M110 69V44H129V69M141 69V56H148V69" fill="#101c33"/>
    {[22,28,48,56,115,123,143].map((x,i)=><g key={x} fill={i%2 ? '#bc76ff' : accent} opacity=".6"><rect x={x} y={i<4 ? 47:57} width="2" height="3"/><rect x={x} y={i<4 ? 56:64} width="2" height="3"/></g>)}
    <path d="M17 75H29V71H131V75H143V82H131V87H29V82H17Z" fill="#071220"/>
    <path d="M25 73H135V77H143V81H17V77H25Z" fill="#294c69"/>
    <path d="M29 74H131V77H29Z" fill={accent}/><path d="M34 82H127V85H34Z" fill={accent} opacity=".3"/>
    <rect x="52" y="7" width="2" height="2" fill="#77bdd1"/><rect x="103" y="13" width="2" height="2" fill="#77bdd1"/><rect x="23" y="20" width="3" height="3" fill="#af8eff"/><rect x="137" y="20" width="3" height="3" fill="#af8eff"/>
    <path d="M80 4H83V7H86V10H83V13H80V10H77V7H80Z" fill="#ffd85d"/>
    <g className={hero ? 'academy-computer-float' : undefined}><PixelSprite kind={kind} x={hero ? 71 : 53} y={15} size={hero ? 64 : 62} accent={accent}/>
    {hero && <><defs><clipPath id={screenId}><rect x="84" y="26" width="38" height="25"/></clipPath></defs><g clipPath={`url(#${screenId})`}><rect x="84" y="26" width="38" height="25" fill="#071421"/><g className="academy-screen-code">{['level = 1','print("Hello!")','move_right()','score += 10','if done:','  celebrate()','next_mission()','>>> ready','level = 1','print("Hello!")','move_right()','score += 10','if done:'].map((line,index)=><text key={index} x="86" y={31+index*6} fill={index%3===0?'#62eafa':index%3===1?'#bc95ff':'#9bffc1'} fontFamily="monospace" fontSize="3.2" shapeRendering="auto">{line}</text>)}</g><rect className="academy-screen-cursor" x="116" y="47" width="2" height="3" fill="#b4ffcf"/></g></>}

    </g>
    {hero ? <><g className="academy-welcome-bot"><PixelSprite kind="bot" x={22} y={35} size={43}/></g><g className="academy-welcome-coin"><PixelSprite kind="coin" x={130} y={34} size={18}/></g><rect x="68" y="86" width="22" height="2" fill="#43eaff"/></> : <><PixelSprite kind="coin" x={21} y={46} size={20}/><path d="M126 45H129V48H132V51H129V54H126V51H123V48H126Z" fill={accent}/></>}
  </svg>;
}
