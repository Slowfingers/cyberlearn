import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Table, CheckCircle, Calculator, HelpCircle, Sparkles, RefreshCw } from 'lucide-react';

interface SpreadsheetGameProps {
  task: Task;
  onComplete: () => void;
}

export const SpreadsheetGame: React.FC<SpreadsheetGameProps> = ({ task, onComplete }) => {
  const isIfTask = task.spreadsheetConfig?.formulaType === 'if';
  const isGrade3 = task.courseId === 'course_grade3' || task.id.startsWith('g3_');

  // Initial table data
  const defaultRows = isIfTask ? [
    { id: 1, name: 'Нео (Студент #1)', score: 85, status: '' },
    { id: 2, name: 'Тринити (Студент #2)', score: 92, status: '' },
    { id: 3, name: 'Сайфер (Студент #3)', score: 45, status: '' },
  ] : isGrade3 ? [
    { id: 1, name: '💎 Кристаллы силы', cost: 100, qty: 3, total: 300 },
    { id: 2, name: '🧪 Зелья здоровья', cost: 50, qty: 4, total: 200 },
    { id: 3, name: '🗡️ Лазерный меч', cost: 500, qty: 1, total: 500 },
  ] : [
    { id: 1, name: 'Сенсоры дрона', cost: 120, qty: 3, total: 360 },
    { id: 2, name: 'Батареи питания', cost: 250, qty: 2, total: 500 },
    { id: 3, name: 'Квантовый чип', cost: 400, qty: 1, total: 400 },
  ];

  const [rows, setRows] = useState(defaultRows);
  const [selectedCell, setSelectedCell] = useState<string>(isIfTask ? 'C2' : 'D5');
  const [formulaInput, setFormulaInput] = useState<string>('');
  const [computedResult, setComputedResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    resetGame();
  }, [task.id]);

  const resetGame = () => {
    setRows(defaultRows);
    setSelectedCell(isIfTask ? 'C2' : 'D5');
    setFormulaInput('');
    setComputedResult(null);
    setErrorMessage('');
    setCompleted(false);
  };

  const evaluateFormula = () => {
    const raw = formulaInput.trim().toUpperCase();
    if (!raw.startsWith('=')) {
      setErrorMessage('Формула в таблицах ВСЕГДА должна начинаться со знака "=" (равно)!');
      playSound('error');
      return;
    }

    setErrorMessage('');

    if (isIfTask) {
      // Expecting IF formula: =IF(B2>=60; "СДАЛ"; "ПЕРЕСДАЧА") or Russian =ЕСЛИ(B2>=60; "СДАЛ"; "ПЕРЕСДАЧА")
      const ifRegex = /=(?:IF|ЕСЛИ)\s*\(\s*B(\d+)\s*(>=|>)\s*(\d+)\s*[,;]\s*["']?([^"']+)["']?\s*[,;]\s*["']?([^"']+)["']?\s*\)/i;
      const match = raw.match(ifRegex);

      if (match) {
        const threshold = parseInt(match[3], 10);
        const passText = match[4].trim();
        const failText = match[5].trim();

        // Calculate statuses for students
        const updated = rows.map((r: any) => ({
          ...r,
          status: r.score >= threshold ? passText : failText
        }));
        setRows(updated);
        setComputedResult('Формула IF успешно применена ко всем строкам!');
        playSound('success');
        setCompleted(true);
        onComplete();
      } else {
        setErrorMessage('Синтаксис неверен. Используй шаблон: =IF(B2>=60; "СДАЛ"; "ПЕРЕСДАЧА")');
        playSound('error');
      }
    } else {
      // Expecting SUM formula: =SUM(D2:D4) or =СУММ(D2:D4) or =D2+D3+D4
      const sumRegex = /=(?:SUM|СУММ)\s*\(\s*D2\s*[:;]\s*D4\s*\)/i;
      if (sumRegex.test(raw) || raw === '=D2+D3+D4' || raw.includes('D2') && raw.includes('D3') && raw.includes('D4')) {
        const totalSum = rows.reduce((acc, r: any) => acc + (r.total || 0), 0);
        setComputedResult(totalSum);
        playSound('success');
        setCompleted(true);
        onComplete();
      } else {
        setErrorMessage('Синтаксис неверен. Для сложения диапазона D2:D4 используй: =SUM(D2:D4)');
        playSound('error');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-black/70 border border-cyber-neonBlue/30 rounded-xl mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-cyber-neonBlue/20 text-cyber-neonBlue border border-cyber-neonBlue/40">
            <Table size={22} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">THE_SPREADSHEET // ИНЖЕНЕРНЫЕ ТАБЛИЦЫ</div>
            <h2 className="text-base md:text-lg font-bold text-white">
              {isIfTask ? 'Логические вычисления с функцией IF' : 'Автоматизация расчетов через формулу =SUM()'}
            </h2>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 rounded text-xs font-mono transition-colors"
        >
          <RefreshCw size={14} /> Сброс
        </button>
      </div>

      {/* Instructions & Goal Box */}
      <div className="bg-gray-900/80 border border-cyber-neonBlue/30 rounded-xl p-4 mb-4">
        <div className="text-xs font-mono text-cyber-neonBlue font-bold uppercase mb-1 flex items-center gap-2">
          <Calculator size={16} /> ЗАДАНИЕ ДЛЯ ЭЛЕКТРОННОЙ ТАБЛИЦЫ:
        </div>
        <p className="text-xs text-gray-300">
          {isIfTask 
            ? 'Введи формулу условия в строку fx, чтобы колонка "Статус" автоматически определяла, сдал ли студент зачет (порог: 60 баллов). Формула: =IF(B2>=60; "СДАЛ"; "ПЕРЕСДАЧА")'
            : 'Посчитай итоговый бюджет миссии в ячейке D5, сложив сумму строк D2, D3, D4 через функцию: =SUM(D2:D4)'
          }
        </p>
      </div>

      {/* Formula Bar (fx) */}
      <div className="flex items-center gap-2 bg-black border border-cyber-neonBlue/50 rounded-xl p-2.5 mb-4 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
        <div className="px-2.5 py-1 bg-gray-900 border border-gray-800 text-cyber-neonYellow font-mono font-bold text-xs rounded">
          {selectedCell}
        </div>
        <div className="text-cyber-neonBlue font-mono font-bold text-sm px-1 italic">
          fx
        </div>
        <input
          type="text"
          value={formulaInput}
          onChange={(e) => setFormulaInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') evaluateFormula();
          }}
          placeholder={isIfTask ? '=IF(B2>=60; "СДАЛ"; "ПЕРЕСДАЧА")' : '=SUM(D2:D4)'}
          className="flex-1 bg-gray-950 border border-gray-800 text-white font-mono px-3 py-1.5 rounded text-sm focus:outline-none focus:border-cyber-neonBlue"
        />
        <button
          onClick={evaluateFormula}
          className="px-4 py-1.5 bg-cyber-neonBlue text-black font-bold uppercase text-xs font-mono rounded hover:bg-white transition-colors"
        >
          Применить
        </button>
      </div>

      {/* Error / Hint display */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-950/40 border border-red-500 rounded-lg text-xs font-mono text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Spreadsheet Interactive Grid */}
      <div className="flex-1 bg-black border border-gray-800 rounded-xl overflow-hidden flex flex-col">
        {/* Column Headers */}
        <div className="grid grid-cols-12 bg-gray-900/90 border-b border-gray-800 text-center text-xs font-mono font-bold text-gray-400 select-none">
          <div className="col-span-1 py-2 border-r border-gray-800 bg-gray-950">#</div>
          <div className="col-span-5 py-2 border-r border-gray-800">A (Наименование)</div>
          <div className="col-span-3 py-2 border-r border-gray-800">{isIfTask ? 'B (Баллы)' : 'B (Цена / шт)'}</div>
          <div className="col-span-3 py-2">{isIfTask ? 'C (Статус)' : 'D (Итого)'}</div>
        </div>

        {/* Row 1 to N */}
        <div className="divide-y divide-gray-900 font-mono text-xs">
          {rows.map((row: any, idx) => {
            const rowNum = idx + 2; // header is 1
            const cellKey = isIfTask ? `C${rowNum}` : `D${rowNum}`;
            const isHighlight = !isIfTask && ['D2', 'D3', 'D4'].includes(cellKey);

            return (
              <div key={row.id} className="grid grid-cols-12 items-center hover:bg-gray-900/30 transition-colors">
                <div className="col-span-1 py-2.5 text-center text-gray-600 bg-gray-950 border-r border-gray-800 font-bold">
                  {rowNum}
                </div>
                <div className="col-span-5 px-4 py-2.5 text-gray-200 border-r border-gray-900 truncate">
                  {row.name}
                </div>
                <div className="col-span-3 px-4 py-2.5 text-right text-cyber-neonGreen border-r border-gray-900">
                  {isIfTask ? `${row.score} б.` : `${row.cost} ₭`}
                </div>
                <div className={`col-span-3 px-4 py-2.5 text-right font-bold transition-all ${
                  isHighlight ? 'bg-cyber-neonBlue/10 text-cyber-neonBlue border border-cyber-neonBlue/30' : ''
                } ${row.status === 'СДАЛ' ? 'text-cyber-neonGreen' : row.status === 'ПЕРЕСДАЧА' ? 'text-red-400' : 'text-gray-300'}`}>
                  {isIfTask ? (row.status || '—') : `${row.total} ₭`}
                </div>
              </div>
            );
          })}

          {/* Total row for SUM task */}
          {!isIfTask && (
            <div className="grid grid-cols-12 items-center bg-gray-950/90 border-t-2 border-gray-800 font-bold">
              <div className="col-span-1 py-2.5 text-center text-gray-600 bg-gray-950 border-r border-gray-800">
                5
              </div>
              <div className="col-span-8 px-4 py-2.5 text-right text-gray-400 uppercase text-[11px] border-r border-gray-900">
                ИТОГО (СУММА БЮДЖЕТА D2:D4):
              </div>
              <div
                onClick={() => {
                  setSelectedCell('D5');
                  setFormulaInput('=SUM(D2:D4)');
                }}
                className={`col-span-3 px-4 py-2.5 text-right cursor-pointer transition-all ${
                  completed ? 'text-cyber-neonGreen text-sm' : 'text-cyber-neonYellow border border-dashed border-cyber-neonYellow/60'
                }`}
              >
                {completed ? `${computedResult} ₭` : formulaInput || '=SUM(?)'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {completed && (
        <div className="mt-4 p-4 bg-cyber-neonGreen/15 border border-cyber-neonGreen rounded-xl flex items-center justify-between text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyber-neonGreen" size={26} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase">ФОРМУЛА ВЫЧИСЛЕНА БЕЗУПРЕЧНО!</div>
              <div className="text-xs text-gray-300">
                {isIfTask ? 'Функция IF успешно автоматизировала проверку данных!' : `Итоговая сумма: ${computedResult} ₭. Таблица полностью синхронизирована.`}
              </div>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-5 py-2 bg-cyber-neonGreen text-black font-bold uppercase rounded-lg text-xs hover:bg-white transition-colors"
          >
            ПРИНЯТЬ ОТЧЕТ (+{task.xpReward} XP)
          </button>
        </div>
      )}
    </div>
  );
};
