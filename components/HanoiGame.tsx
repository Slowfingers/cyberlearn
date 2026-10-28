import {WorkshopHeader, WorkshopBadge} from './GameUI';

import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../types';
import { playSound } from '../utils/sound';
import { Layers, Trophy, AlertTriangle } from 'lucide-react';

interface HanoiGameProps {
    task: Task;
    onComplete: () => void;
}

const HanoiGame: React.FC<HanoiGameProps> = ({ task, onComplete }) => {
    const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
    useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
    const numDisks = task.hanoiConfig?.disks || 3;
    const [pegs, setPegs] = useState<number[][]>(()=>[Array.from({length:numDisks},(_,i)=>numDisks-i),[],[]]);
    const [selectedPeg, setSelectedPeg] = useState<number | null>(null);
    const [moves, setMoves] = useState(0);
    const [isSolved, setIsSolved] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Colors for disks (Gradient from Neon Pink to Neon Blue)
    const diskColors = [
        '#ff00ff', // Pink
        '#d900ff',
        '#b200ff',
        '#8c00ff',
        '#6600ff',
        '#4000ff',
        '#1900ff',
        '#00f3ff'  // Blue
    ];

    useEffect(() => {
        resetGame();
    }, [numDisks]);

    const resetGame = () => {
        if(timer.current)clearTimeout(timer.current);
        const initialPeg: number[] = [];
        for (let i = numDisks; i >= 1; i--) {
            initialPeg.push(i);
        }
        setPegs([initialPeg, [], []]);
        setSelectedPeg(null);
        setMoves(0);
        setIsSolved(false);
        setErrorMsg('');
        playSound('open');
    };

    const handlePegClick = (pegIndex: number) => {
        if (isSolved) return;
        setErrorMsg('');

        if (selectedPeg === null) {
            // Selecting source
            if (pegs[pegIndex].length === 0) {
                return; // Cannot select empty peg
            }
            setSelectedPeg(pegIndex);
            playSound('click');
        } else {
            // Selecting destination
            if (selectedPeg === pegIndex) {
                // Deselect
                setSelectedPeg(null);
                return;
            }

            const sourcePeg = [...pegs[selectedPeg]];
            const destPeg = [...pegs[pegIndex]];

            const diskToMove = sourcePeg[sourcePeg.length - 1];
            const topDestDisk = destPeg.length > 0 ? destPeg[destPeg.length - 1] : Infinity;

            if (diskToMove < topDestDisk) {
                // Valid Move
                sourcePeg.pop();
                destPeg.push(diskToMove);

                const newPegs = [...pegs];
                newPegs[selectedPeg] = sourcePeg;
                newPegs[pegIndex] = destPeg;

                setPegs(newPegs);
                setMoves(prev => prev + 1);
                setSelectedPeg(null);
                playSound('move');

                // Check Win
                if (destPeg.length === numDisks && pegIndex === 2) { // Usually target is last peg
                    setIsSolved(true);
                    playSound('success');
                    timer.current=setTimeout(onComplete, 1500);
                }
            } else {
                // Invalid Move
                setErrorMsg('ОШИБКА ПРОТОКОЛА: Нельзя класть большой блок на меньший.');
                playSound('error');
                setSelectedPeg(null);
            }
        }
    };

    return (
        <div className="ui-trainer-family hanoi-workshop workshop-legacy w-full min-h-[460px] flex flex-col items-center justify-start bg-[#050508] relative p-4">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                 style={{backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
            </div>

            <div className="relative z-10 w-full">
                <WorkshopHeader icon={<Layers size={26}/>} title="Станция переноса модулей" description="Перенеси все диски с башни 1 на башню 3. За ход бери только верхний диск. Большой диск нельзя класть на маленький. Нажми на башню с диском, затем на башню назначения." onReset={resetGame}
                    badges={<><WorkshopBadge label="Ходов">{moves}</WorkshopBadge><WorkshopBadge label="Минимум">{Math.pow(2, numDisks) - 1}</WorkshopBadge></>}/>
            </div>

            {/* ERROR MESSAGE */}
            {errorMsg && (
                <div role="alert" className="workshop-feedback workshop-feedback--error relative w-full z-20 font-mono">
                    <AlertTriangle size={18}/>{errorMsg}
                </div>
            )}

            {/* Game Area */}
            <div className="hanoi-deck flex items-end justify-center gap-2 md:gap-12 w-full max-w-2xl h-64 md:h-80 relative z-10 mt-4 shrink-0">
                {pegs.map((peg, pegIndex) => (
                    <div
                        key={pegIndex}
                        role="button"
                        tabIndex={isSolved ? -1 : 0}
                        aria-label={`Башня ${pegIndex + 1}`}
                        aria-pressed={selectedPeg === pegIndex} aria-disabled={isSolved} data-peg={pegIndex}
                        onKeyDown={event => { if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handlePegClick(pegIndex); } }}
                        onClick={() => handlePegClick(pegIndex)}
                        className={`
                            hanoi-peg relative flex flex-col-reverse items-center justify-start flex-1 min-w-0 h-full cursor-pointer group transition-all duration-300
                            ${selectedPeg === pegIndex ? 'bg-cyber-neonBlue/10 shadow-[0_0_20px_rgba(0,243,255,0.2)]' : 'hover:bg-white/5'}
                            rounded-lg border-b-4 ${selectedPeg === pegIndex ? 'border-cyber-neonBlue' : 'border-gray-700'}
                        `}
                    >
                        {/* Pole */}
                        <div className={`absolute bottom-0 w-2 h-4/5 rounded-t-full transition-colors ${selectedPeg === pegIndex ? 'bg-cyber-neonBlue' : 'bg-gray-800 group-hover:bg-gray-700'}`}></div>

                        {/* Disks */}
                        {peg.map((diskSize, i) => {
                            const widthPercent = 30 + (diskSize / numDisks) * 70; // 30% to 100%
                            const color = diskColors[(diskSize - 1) % diskColors.length];

                            // Check if this disk is currently selected (top of selected peg)
                            const isSelected = selectedPeg === pegIndex && i === peg.length - 1;

                            return (
                                <div
                                    key={i}
                                    data-disk={diskSize} data-selected={isSelected}
                                    className={`
                                        hanoi-disk h-6 md:h-8 rounded-sm mb-1 z-10 shadow-[0_0_10px] transition-all duration-300
                                        ${isSelected ? 'translate-y-[-20px] shadow-[0_0_20px_white]' : ''}
                                    `}
                                    style={{
                                        width: `${widthPercent}%`,
                                        borderBottom: `3px solid ${color}`,
                                        boxShadow: isSelected ? '0 0 12px #b9f2ef' : '0 3px 4px #0008'
                                    }}
                                >
                                    <div className="hanoi-rank">{diskSize}</div>
                                </div>
                            );
                        })}

                        {/* Click Hint */}
                        <div className="absolute -bottom-8 text-xs text-gray-600 font-mono uppercase tracking-widest group-hover:text-cyber-neonBlue transition-colors">
                            Башня {pegIndex + 1}{pegIndex === 2 ? ' · цель' : ''}
                        </div>
                    </div>
                ))}
            </div>

            {/* Win Overlay */}
            {isSolved && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-500">
                    <Trophy size={64} className="text-cyber-neonYellow mb-4 animate-bounce" />
                    <h2 className="text-3xl font-bold text-white uppercase tracking-widest mb-2">Башня собрана</h2>
                    <div className="text-cyber-neonBlue font-mono">Ходов: {moves}</div>
                </div>
            )}
        </div>
    );
};

export default HanoiGame;
