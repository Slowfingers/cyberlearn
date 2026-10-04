import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Cpu, HardDrive, AlertTriangle, ShieldCheck, Trash2, RotateCcw, Activity } from 'lucide-react';

interface Process {
  id: number;
  name: string;
  isRogue: boolean;
  isCritical: boolean;
  cpu: number;
  ramMb: number;
  status: 'Работает' | 'Утечка памяти' | 'Завис' | 'Критический';
  description: string;
}

interface ProcessManagerGameProps {
  task: Task;
  onComplete: () => void;
}

const INITIAL_PROCESSES: Process[] = [
  { id: 101, name: 'system_kernel.sys', isRogue: false, isCritical: true, cpu: 2, ramMb: 128, status: 'Критический', description: 'Ядро операционной системы. Управляет драйверами и ресурсами.' },
  { id: 204, name: 'window_manager.srv', isRogue: false, isCritical: true, cpu: 4, ramMb: 96, status: 'Работает', description: 'Графическая оболочка рабочего стола.' },
  { id: 312, name: 'miner_stealth_x64.tmp', isRogue: true, isCritical: false, cpu: 48, ramMb: 210, status: 'Утечка памяти', description: 'Вредоносный фоновый скрипт майнинга. Нагружает процессор на максимум!' },
  { id: 405, name: 'infinite_loop_leak.exe', isRogue: true, isCritical: false, cpu: 35, ramMb: 180, status: 'Завис', description: 'Скрипт с бесконечным циклом без задержки. Пожирает оперативную память.' },
  { id: 510, name: 'zombie_crawler.bin', isRogue: true, isCritical: false, cpu: 25, ramMb: 140, status: 'Утечка памяти', description: 'Зомби-процесс сетевого сканера. Не отвечает на запросы пользователя.' },
  { id: 118, name: 'audio_engine.daemon', isRogue: false, isCritical: false, cpu: 1, ramMb: 32, status: 'Работает', description: 'Аудиодрайвер для воспроизведения звуков.' },
];

export const ProcessManagerGame: React.FC<ProcessManagerGameProps> = ({ task, onComplete }) => {
  const [processes, setProcesses] = useState<Process[]>(INITIAL_PROCESSES);
  const [warningMsg, setWarningMsg] = useState('');
  const [completed, setCompleted] = useState(false);

  // Calculate live resources
  const totalRamCapacity = 1024; // 1GB
  const usedRam = processes.reduce((acc, p) => acc + p.ramMb, 0);
  const usedCpu = Math.min(100, processes.reduce((acc, p) => acc + p.cpu, 0));
  const ramPercent = Math.round((usedRam / totalRamCapacity) * 100);

  const rogueCount = processes.filter(p => p.isRogue).length;

  useEffect(() => {
    resetGame();
  }, [task.id]);

  const resetGame = () => {
    setProcesses(INITIAL_PROCESSES);
    setWarningMsg('');
    setCompleted(false);
  };

  const handleKillProcess = (p: Process) => {
    if (completed) return;

    if (p.isCritical) {
      playSound('error');
      setWarningMsg(`⚠️ ОШИБКА: Завершение "${p.name}" приведет к синему экрану смерти (BSOD)! Это ядро системы.`);
      return;
    }

    if (!p.isRogue) {
      playSound('error');
      setWarningMsg(`⚠️ Внимание: Процесс "${p.name}" полезный и не потребляет лишних ресурсов.`);
    } else {
      playSound('success');
      setWarningMsg(`✅ Ликвидирован вредоносный процесс: "${p.name}". Память освобождена!`);
    }

    const updated = processes.filter(proc => proc.id !== p.id);
    setProcesses(updated);

    // Check if all rogue processes are killed
    const remainingRogues = updated.filter(proc => proc.isRogue).length;
    if (remainingRogues === 0 && !completed) {
      setCompleted(true);
      playSound('success');
      onComplete();
    }
  };

  return (
    <div className="workshop-legacy process-workshop flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto">
      {/* Title & Instructions */}
      <div className="workshop-banner flex flex-wrap items-center justify-between gap-4 p-4 bg-black/70 border border-cyber-neonBlue/30 rounded-xl mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-cyber-neonBlue/20 text-cyber-neonBlue border border-cyber-neonBlue/40">
            <Activity size={22} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">ДИСПЕТЧЕР ЗАДАЧ И ПРОЦЕССОВ OS</div>
            <h2 className="text-base md:text-lg font-bold text-white">Устранение перегрузки CPU и утечек RAM</h2>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 rounded text-xs font-mono transition-colors"
        >
          <RotateCcw size={14} /> Перезапуск
        </button>
      </div>

      {/* Real-time System Telemetry Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* CPU Gauge */}
        <div className="bg-black/80 border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
              <Cpu size={16} className={usedCpu > 70 ? 'text-red-500 animate-pulse' : 'text-cyber-neonGreen'} /> 
              ЗАГРУЗКА ПРОЦЕССОРА (CPU)
            </span>
            <span className={`text-base font-mono font-bold ${usedCpu > 70 ? 'text-red-400' : 'text-cyber-neonGreen'}`}>
              {usedCpu}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                usedCpu > 70 ? 'bg-gradient-to-r from-yellow-500 to-red-500' : 'bg-cyber-neonGreen'
              }`}
              style={{ width: `${usedCpu}%` }}
            />
          </div>
          <div className="text-[10px] text-gray-500 font-mono mt-1.5">
            {usedCpu > 70 ? '⚠️ Процессор перегревается из-за зависших потоков!' : '✓ Штатная нагрузка'}
          </div>
        </div>

        {/* RAM Gauge */}
        <div className="bg-black/80 border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
              <HardDrive size={16} className={ramPercent > 65 ? 'text-red-500 animate-pulse' : 'text-cyber-neonBlue'} /> 
              ОПЕРАТИВНАЯ ПАМЯТЬ (RAM)
            </span>
            <span className={`text-base font-mono font-bold ${ramPercent > 65 ? 'text-red-400' : 'text-cyber-neonBlue'}`}>
              {usedRam} MB / {totalRamCapacity} MB ({ramPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                ramPercent > 65 ? 'bg-gradient-to-r from-cyber-neonBlue to-red-500' : 'bg-cyber-neonBlue'
              }`}
              style={{ width: `${ramPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-gray-500 font-mono mt-1.5">
            Осталось нейтрализовать паразитных процессов: <span className="text-cyber-neonYellow font-bold">{rogueCount}</span>
          </div>
        </div>
      </div>

      {/* Warning/Status Box */}
      {warningMsg && (
        <div className="mb-4 p-3 bg-gray-900/90 border border-cyber-neonYellow/40 rounded-lg text-xs font-mono text-gray-200 flex items-center gap-2 animate-fade-in">
          <AlertTriangle size={16} className="text-cyber-neonYellow shrink-0" />
          <span>{warningMsg}</span>
        </div>
      )}

      {/* Process Table */}
      <div className="flex-1 bg-black border border-gray-800 rounded-xl overflow-hidden flex flex-col">
        <div className="process-table-heading px-4 py-2.5 bg-gray-900/80 border-b border-gray-800 text-[11px] font-mono text-gray-400 uppercase grid grid-cols-12 gap-2 items-center">
          <div className="col-span-2">PID</div>
          <div className="col-span-4">ИМЯ ПРОЦЕССА</div>
          <div className="col-span-2 text-right">CPU</div>
          <div className="col-span-2 text-right">RAM</div>
          <div className="col-span-2 text-center">ДЕЙСТВИЕ</div>
        </div>

        <div className="flex-1 divide-y divide-gray-900 overflow-y-auto">
          {processes.map(proc => {
            const isDanger = proc.isRogue;
            return (
              <div
                key={proc.id}
                className={`process-row px-4 py-3 grid grid-cols-12 gap-2 items-center text-xs font-mono hover:bg-gray-900/40 transition-colors ${
                  isDanger ? 'bg-red-950/15' : ''
                }`}
              >
                <div className="col-span-2 text-gray-500">#{proc.id}</div>
                <div className="col-span-4">
                  <div className="process-name font-bold text-white flex items-center gap-2">
                    {proc.name}
                    {proc.isCritical && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-blue-950 text-cyber-neonBlue rounded border border-cyber-neonBlue/30">
                        ОС
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-400 break-words" title={proc.description}>
                    {proc.description}
                  </div>
                </div>
                <div data-label="CPU" className={`col-span-2 text-right font-bold ${proc.cpu > 20 ? 'text-red-400' : 'text-gray-400'}`}>
                  {proc.cpu}%
                </div>
                <div data-label="RAM" className={`col-span-2 text-right font-bold ${proc.ramMb > 100 ? 'text-cyber-neonYellow' : 'text-gray-400'}`}>
                  {proc.ramMb} MB
                </div>
                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() => handleKillProcess(proc)}
                    disabled={proc.isCritical}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-all ${
                      proc.isCritical
                        ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800'
                        : 'bg-red-950/60 text-red-400 hover:bg-red-600 hover:text-white border border-red-800/60 shadow-[0_0_10px_rgba(255,0,60,0.2)]'
                    }`}
                  >
                    <Trash2 size={12} /> Завершить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Banner */}
      {completed && (
        <div className="mt-4 p-4 bg-cyber-neonGreen/15 border border-cyber-neonGreen rounded-xl flex items-center justify-between text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-cyber-neonGreen" size={28} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase">СИСТЕМА СТАБИЛИЗИРОВАНА!</div>
              <div className="text-xs text-gray-300">
                Все утечки памяти устранены. CPU и RAM вернулись к оптимальным показателям!
              </div>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-5 py-2 bg-cyber-neonGreen text-black font-bold uppercase rounded-lg text-xs hover:bg-white transition-colors"
          >
            ПРОТОКОЛ ВЫПОЛНЕН (+{task.xpReward} XP)
          </button>
        </div>
      )}
    </div>
  );
};
