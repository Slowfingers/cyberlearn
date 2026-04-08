
import React, { useState } from 'react';
import { Terminal, Battery, Wifi, Cpu, LogOut, Volume2, VolumeX } from 'lucide-react';
import { Role } from '../types';
import { isSoundMuted, toggleSound, playSound } from '../utils/sound';

interface LayoutProps {
  children: React.ReactNode;
  role: Role;
  onLogout: () => void;
  title?: string;
}

const CyberLayout: React.FC<LayoutProps> = ({ children, role, onLogout, title }) => {
  const roleLabel = role === 'teacher' ? 'Куратор' : 'Нетраннер';
  const [muted, setMuted] = useState(isSoundMuted());
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleToggleSound = () => {
      const newMuted = toggleSound();
      setMuted(newMuted);
      if (!newMuted) playSound('click');
  };

  const handleLogoutClick = () => {
      setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
      setShowLogoutConfirm(false);
      onLogout();
  };

  return (
    <div className="h-[100dvh] w-screen bg-cyber-black text-cyber-neonBlue font-sans selection:bg-cyber-neonPink selection:text-white overflow-hidden flex flex-col relative supports-[height:100svh]:h-[100svh]">
      
      {/* GLOBAL BACKGROUND LAYERS */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             backgroundPosition: 'center center'
           }}>
      </div>
      <div className="absolute inset-0 pointer-events-none z-50 crt-overlay opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* HEADER */}
      <header className="relative z-30 h-14 md:h-16 shrink-0 bg-cyber-dark/95 border-b border-cyber-neonBlue/30 backdrop-blur-md flex items-center justify-between px-3 md:px-6 shadow-[0_0_20px_rgba(0,243,255,0.1)] pt-[env(safe-area-inset-top)]">
        
        {/* Logo Area */}
        <div className="flex items-center gap-2 md:gap-3 group cursor-default min-w-0">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-cyber-neonPink blur opacity-50 animate-pulse"></div>
            <Terminal className="w-5 h-5 md:w-8 md:h-8 text-cyber-neonPink relative z-10" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl font-bold tracking-widest uppercase text-white leading-none group-hover:text-cyber-neonBlue transition-colors whitespace-nowrap">
              CYBER<span className="text-cyber-neonBlue">LEARN</span>
            </h1>
            <div className="hidden sm:block text-[8px] md:text-[10px] text-cyber-neonGreen tracking-[0.2em] md:tracking-[0.3em] font-mono leading-none mt-1 whitespace-nowrap">
              SYSTEM_ONLINE_V2.5
            </div>
          </div>
        </div>
        
        {/* Title / Breadcrumb (Desktop) */}
        {title && (
          <div className="hidden md:flex items-center gap-2 max-w-[30%]">
            <div className="w-2 h-2 shrink-0 bg-cyber-neonYellow animate-ping"></div>
            <span className="text-cyber-neonYellow font-mono text-xs md:text-sm tracking-wider uppercase drop-shadow-[0_0_5px_rgba(252,238,10,0.5)] leading-tight break-words">
              // {title}
            </span>
          </div>
        )}

        {/* Status & Actions */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button
            onClick={handleToggleSound}
            className={`p-2 transition-colors ${muted ? 'text-gray-600 hover:text-red-400' : 'text-cyber-neonGreen hover:text-white'}`}
            title={muted ? 'Включить звук' : 'Выключить звук'}
          >
            {muted ? <VolumeX size={16} className="md:w-[18px] md:h-[18px]" /> : <Volume2 size={16} className="md:w-[18px] md:h-[18px]" />}
          </button>
          <button 
            onClick={handleLogoutClick}
            className="flex items-center gap-1.5 md:gap-2 text-red-400 hover:text-red-300 transition-colors group p-2 md:p-0 border border-red-500/30 md:border-0 rounded-md"
            title="Отключиться от Матрицы"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase group-hover:underline decoration-red-400 underline-offset-4">
              ВЫХОД
            </span>
            <LogOut size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* LOGOUT CONFIRMATION */}
      {showLogoutConfirm && (
          <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#0c0c10] border border-red-500/50 rounded-lg p-6 max-w-sm w-full shadow-[0_0_40px_rgba(255,0,0,0.1)] animate-in zoom-in-95 duration-200">
                  <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-widest">Отключение</h3>
                  <p className="text-gray-400 text-sm mb-6 font-mono">Вы уверены, что хотите выйти из системы?</p>
                  <div className="flex gap-3">
                      <button
                          onClick={() => setShowLogoutConfirm(false)}
                          className="flex-1 py-3 border border-gray-700 text-gray-400 hover:text-white font-bold uppercase text-sm transition-colors rounded"
                      >
                          Отмена
                      </button>
                      <button
                          onClick={confirmLogout}
                          className="flex-1 py-3 bg-red-500 text-white font-bold uppercase text-sm hover:bg-red-400 transition-colors rounded"
                      >
                          Выйти
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-1 overflow-hidden flex flex-col pb-[env(safe-area-inset-bottom)]">
        {children}
      </main>
    </div>
  );
};

export default CyberLayout;
