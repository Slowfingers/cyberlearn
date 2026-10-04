import React from 'react';
import { PixelSprite } from '../PixelSprite';

/** Pixel objects for the practice workbench; no external assets required. */
export function WorkshopArt({ kind = 'bot', className = '' }: { kind?: string; className?: string }) {
  const type = kind.replace('folder-', '');
  const color = type === 'music' ? '#b98aff' : type === 'doc' ? '#7cf0b4' : type === 'danger' ? '#ff947e' : '#58dfff';
  const glyph = type === 'music' ? <path d="M12 11H17V17H15V12H13V19H10V17H12Z" fill="#142a49"/> : type === 'image' ? <><rect x="15" y="11" width="3" height="3" fill="#ffe16a"/><path d="M7 19V17H9V15H11V17H13V18H15V16H17V18H19V20H7Z" fill="#174264"/></> : type === 'danger' ? <><path d="M11 10H14V12H16V15H18V19H7V15H9V12H11Z" fill="#23324e"/><path d="M11 12H13V15H11ZM11 17H13V19H11Z" fill="#ffe16a"/></> : <path d="M8 11H17V13H8ZM8 15H17V17H8ZM8 19H14V21H8Z" fill="#24516a"/>;
  return <svg className={className} viewBox="0 0 26 26" fill="none" aria-hidden="true" shapeRendering="crispEdges">
    {kind === 'bot' ? <PixelSprite kind="bot" x={1} y={1} size={24}/> : kind.startsWith('bulb-') ? <>
      <path d="M9 3H17V5H20V8H22V14H20V17H17V20H9V17H6V14H4V8H6V5H9Z" fill={kind === 'bulb-on' ? '#ffe16a' : '#6687aa'}/>
      <path d="M9 6H13V8H8V12H6V8H9Z" fill={kind === 'bulb-on' ? '#fff6c6' : '#98b3d0'}/><path d="M9 20H17V22H9ZM10 23H16V25H10Z" fill="#bdd0e8"/><path d="M10 12H12V16H14V12H16V17H14V20H12V17H10Z" fill="#815e34"/>
      {kind === 'bulb-on' && <path d="M12 0H14V2H12ZM0 9H2V11H0ZM24 9H26V11H24ZM2 2H4V4H2ZM22 2H24V4H22Z" fill="#ffe16a"/>}
    </> : kind.startsWith('folder-') ? <>
      <path d="M2 6H4V3H11V5H22V7H24V22H22V24H4V22H2Z" fill="#15334d"/><path d="M4 5H10V7H22V10H4Z" fill={color}/><path d="M3 10H23V21H21V23H5V21H3Z" fill={color}/><path d="M4 10H22V12H4Z" fill="#fff" opacity=".35"/><g transform="translate(0 1) scale(1 .85)">{glyph}</g>
    </> : <>
      <path d="M5 1H16V3H18V5H20V7H22V24H4V3H5Z" fill="#17364f"/><path d="M6 3H15V9H20V22H6Z" fill={color}/><path d="M15 3V9H20V7H18V5H16V3Z" fill="#d7faff"/>{glyph}
    </>}
  </svg>;
}
export function WorkshopHeader({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return <header className="workshop-header"><WorkshopArt /><div><span className="workshop-eyebrow">Твоя игровая мастерская</span><h2>{title}</h2><p>{description}</p></div><div className="workshop-tools">{children}</div></header>;
}
export function WorkshopProgress({ value, total }: { value: number; total: number }) {
  return <div className="workshop-progress"><span>Готово {value} из {total}</span><div role="progressbar" aria-label="Прогресс задания" aria-valuenow={value} aria-valuemin={0} aria-valuemax={total}><i style={{ width: `${total ? value / total * 100 : 0}%` }} /></div></div>;
}
