
import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, X, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
    id: string;
    text: string;
    type: ToastType;
}

interface CyberToastProps {
    toasts: ToastMessage[];
    onDismiss: (id: string) => void;
}

const typeConfig: Record<ToastType, { icon: React.ReactNode; border: string; text: string; bg: string }> = {
    success: {
        icon: <CheckCircle size={18} />,
        border: 'border-cyber-neonGreen',
        text: 'text-cyber-neonGreen',
        bg: 'bg-cyber-neonGreen/10',
    },
    error: {
        icon: <AlertTriangle size={18} />,
        border: 'border-red-500',
        text: 'text-red-400',
        bg: 'bg-red-500/10',
    },
    info: {
        icon: <Info size={18} />,
        border: 'border-cyber-neonBlue',
        text: 'text-cyber-neonBlue',
        bg: 'bg-cyber-neonBlue/10',
    },
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
    const [exiting, setExiting] = useState(false);
    const cfg = typeConfig[toast.type];

    useEffect(() => {
        const timer = setTimeout(() => {
            setExiting(true);
            setTimeout(() => onDismiss(toast.id), 300);
        }, 3000);
        return () => clearTimeout(timer);
    }, [toast.id, onDismiss]);

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 border rounded-lg shadow-lg backdrop-blur-md transition-all duration-300 ${cfg.border} ${cfg.bg} ${
                exiting ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
            }`}
            style={{ animation: exiting ? 'none' : 'slideInFromRight 0.3s ease-out' }}
        >
            <span className={cfg.text}>{cfg.icon}</span>
            <span className="text-sm text-gray-200 font-mono flex-1 leading-tight break-words">{toast.text}</span>
            <button onClick={() => { setExiting(true); setTimeout(() => onDismiss(toast.id), 300); }} className="text-gray-500 hover:text-white p-1 shrink-0">
                <X size={14} />
            </button>
        </div>
    );
};

const CyberToast: React.FC<CyberToastProps> = ({ toasts, onDismiss }) => {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-20 right-4 z-[999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
            {toasts.map(t => (
                <div key={t.id} className="pointer-events-auto">
                    <ToastItem toast={t} onDismiss={onDismiss} />
                </div>
            ))}
        </div>
    );
};

export default CyberToast;
