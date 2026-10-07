import React, {useEffect, useRef, useId} from 'react';
import {X} from 'lucide-react';
import '../styles/game-ui.css';

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
