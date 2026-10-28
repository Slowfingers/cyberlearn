import React, {useEffect, useRef, useId} from 'react';
import {X, RotateCcw} from 'lucide-react';

/** Unified trainer header: icon tile, title, one-line instruction, badges and reset. */
export function WorkshopHeader({icon, eyebrow='Твоя игровая мастерская', title, description, badges, onReset, children}: {icon?:React.ReactNode;eyebrow?:string;title:string;description?:string;badges?:React.ReactNode;onReset?:()=>void;children?:React.ReactNode}) {
  return <header className="workshop-header workshop-banner">
    {icon && <div className="workshop-icon" aria-hidden="true">{icon}</div>}
    <div className="workshop-header-text"><span className="workshop-eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>
    <div className="workshop-tools">{badges}{children}{onReset && <GameButton variant="secondary" size="icon" className="workshop-icon-button" onClick={onReset} aria-label="Начать заново"><RotateCcw size={19}/></GameButton>}</div>
  </header>;
}

/** Monospace stat chip used inside WorkshopHeader badges. */
export function WorkshopBadge({label, children}: {label:string;children:React.ReactNode}) {
  return <span className="workshop-badge"><i>{label}</i><b>{children}</b></span>;
}

export function GameButton({variant='secondary', size='regular', className='', ...props}: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?:'primary'|'secondary'|'danger';size?:'regular'|'compact'|'icon'}) {
 return <button type="button" {...props} className={`ui-button ui-button--${variant} ui-button--${size} ${className}`}/>;
}

/** Shared dialog: modal focus, Escape, restore focus, one surface and button family. */
export function GameDialog({title, onClose, children, size='regular', headerExtra}: {title:string;onClose:()=>void;children:React.ReactNode;size?:'regular'|'wide';headerExtra?:React.ReactNode}) {
 const ref=useRef<HTMLDialogElement>(null);
 const titleId=useId();
 useEffect(()=>{const dialog=ref.current;const previous=document.activeElement as HTMLElement|null;dialog?.showModal();return()=>{dialog?.close();previous?.focus();};},[]);
 return <dialog ref={ref} className={`ui-dialog ui-dialog--${size}`} aria-labelledby={titleId} onCancel={e=>{e.preventDefault();onClose();}}><header><h2 id={titleId}>{title}</h2>{headerExtra}<GameButton size="icon" aria-label="Закрыть окно" onClick={onClose}><X size={20}/></GameButton></header><div className="ui-dialog-body">{children}</div></dialog>;
}
