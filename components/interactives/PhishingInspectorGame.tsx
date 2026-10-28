import {GameButton, WorkshopHeader, WorkshopBadge} from '../GameUI';
import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Mail, MailWarning, CheckCircle, Search, AlertTriangle, FileText, ExternalLink, UserRound, MessageSquareWarning, Link, Paperclip } from 'lucide-react';

const SLOT_META: Record<string, { title: string; icon: React.ReactNode }> = {
  sender: { title: 'Отправитель', icon: <UserRound size={18} /> },
  urgency: { title: 'Текст письма', icon: <MessageSquareWarning size={18} /> },
  hidden_link: { title: 'Ссылка', icon: <Link size={18} /> },
  attachment: { title: 'Вложение', icon: <Paperclip size={18} /> },
};

interface PhishingInspectorGameProps {
  task: Task;
  onComplete: () => void;
}

interface ThreatItem {
  id: string;
  label: string;
  found: boolean;
  explanation: string;
}

const DEFAULT_THREATS: ThreatItem[] = [
    {
      id: 'sender',
      label: 'Фальшивый домен отправителя',
      found: false,
      explanation: 'Домен "sber-security-check.cc" не является официальным! Мошенники используют созвучные имена.'
    },
    {
      id: 'urgency',
      label: 'Психологическое давление и срочность',
      found: false,
      explanation: 'Мошенники создают панику ("Срочно 15 минут!"), чтобы жертва не успела подумать логически.'
    },
    {
      id: 'hidden_link',
      label: 'Маскировка гиперссылки',
      found: false,
      explanation: 'Текст ссылки указывает на официальный сайт, но реальный адрес ведет на "http://evil-steal-creds.net/login".'
    },
    {
      id: 'attachment',
      label: 'Опасное расширение файла (.pdf.exe)',
      found: false,
      explanation: 'Двойное расширение! Под видом документа PDF скрывается исполняемый вирус .EXE.'
    }
];

export const PhishingInspectorGame: React.FC<PhishingInspectorGameProps> = ({ task, onComplete }) => {
  const cfg = task.phishingConfig;
  const initialThreats = cfg?.threats?.length
    ? cfg.threats.map(t => ({ ...t, found: false }))
    : DEFAULT_THREATS;
  const [threats, setThreats] = useState<ThreatItem[]>(initialThreats);

  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    resetGame();
  }, [task.id]);

  const resetGame = () => {
    setThreats(t => t.map(item => ({ ...item, found: false })));
    setActiveAnalysis(null);
    setCompleted(false);
  };

  const handleInspect = (threatId: string) => {
    if (completed) return;

    const threat = threats.find(t => t.id === threatId);
    if (!threat) return;

    if (!threat.found) {
      playSound('success');
      const updated = threats.map(t => t.id === threatId ? { ...t, found: true } : t);
      setThreats(updated);
      setActiveAnalysis(threat.explanation);

      const allFound = updated.every(t => t.found);
      if (allFound) {
        setCompleted(true);
        playSound('success');
        onComplete();
      }
    } else {
      setActiveAnalysis(threat.explanation);
    }
  };

  const foundCount = threats.filter(t => t.found).length;

  return (
    <div className="ui-trainer-family workshop-legacy phishing-workshop flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <WorkshopHeader icon={<MailWarning size={26}/>} eyebrow="Криминалистика фишинга" title="Расследование подозрительного письма" description={task.lesson?.goal} onReset={resetGame}
        badges={<WorkshopBadge label="Найдено угроз">{foundCount} / {threats.length}</WorkshopBadge>}/>

      {/* Detective Tip */}
      <div className="phishing-instructions bg-gray-900/80 border border-cyber-neonYellow/30 rounded-xl p-3.5 mb-4 text-xs font-mono text-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search size={16} className="text-cyber-neonYellow" />
          <span>Кликай по подозрительным деталям в письме (адрес, текст, ссылка, файл), чтобы разоблачить фишинговую атаку!</span>
        </div>
      </div>

      {/* Letter column + fixed findings column: the letter never moves when data arrives */}
      <div className="phishing-layout">
      <div className="phishing-main">

      {/* Simulated Email Client */}
      <div className="phishing-message mail-terminal bg-black border border-gray-800 rounded-xl p-5 flex flex-col shadow-xl">
        <div className="mail-terminal-bar" aria-hidden="true"><span /><span /><span /><strong>Входящие</strong></div>
        {/* Email Header Bar */}
        <div className="border-b border-gray-800 pb-4 mb-4 space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 w-20">От кого:</span>
            <div
              onClick={() => handleInspect('sender')} role="button" tabIndex={0} aria-label="Проверить отправителя"
              onKeyDown={event => {if(event.key === 'Enter' || event.key === ' '){event.preventDefault();handleInspect('sender');}}}
              className={`px-2 py-1 rounded cursor-pointer transition-all ${
                threats.find(t => t.id === 'sender')?.found
                  ? 'bg-red-950/80 text-red-400 border border-red-500 line-through'
                  : 'hover:bg-yellow-950/40 text-gray-300 hover:text-white border border-dashed border-gray-700'
              }`}
            >
              {cfg?.senderName || 'Служба Безопасности'} &lt;<span className="text-red-400 font-bold">{cfg?.sender || 'security-alert@sber-security-check.cc'}</span>&gt;
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 w-20">Кому:</span>
            <span className="text-gray-400">student@school.example</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 w-20">Тема:</span>
            <span className="text-white font-bold">{cfg?.subject || '[КРИТИЧЕСКИ] Ваша учетная запись заблокирована!'}</span>
          </div>
        </div>

        {/* Email Body */}
        <div className="flex-1 text-xs text-gray-300 space-y-4 leading-relaxed font-sans">
          {(cfg?.body || 'Здравствуйте, уважаемый пользователь!\nАвтоматическая система безопасности зафиксировала попытку несанкционированного входа в ваш личный профиль с неизвестного IP-адреса.')
            .split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}

          {/* Urgency Trigger */}
          <div
            onClick={() => handleInspect('urgency')} role="button" tabIndex={0} aria-label="Проверить срочную просьбу"
              onKeyDown={event => {if(event.key === 'Enter' || event.key === ' '){event.preventDefault();handleInspect('urgency');}}}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              threats.find(t => t.id === 'urgency')?.found
                ? 'bg-red-950/60 border border-red-500 text-red-300'
                : 'bg-gray-900/60 hover:bg-yellow-950/40 border border-dashed border-gray-700 text-gray-200'
            }`}
          >
            ⚠️ <span className="font-bold">ВНИМАНИЕ:</span> {cfg?.urgencyText || <>У вас есть ровно <span className="underline font-bold text-red-400">15 минут</span> для подтверждения владения, иначе аккаунт и все данные будут стерты без возможности восстановления!</>}
          </div>

          <p>
            Ссылка, которую предлагает письмо:
          </p>

          {/* Spoofed Hyperlink */}
          <div>
            <div
              onClick={() => handleInspect('hidden_link')} role="button" tabIndex={0} aria-label="Проверить ссылку"
              onKeyDown={event => {if(event.key === 'Enter' || event.key === ' '){event.preventDefault();handleInspect('hidden_link');}}}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                threats.find(t => t.id === 'hidden_link')?.found
                  ? 'bg-red-950/60 border border-red-500 text-red-400'
                  : 'bg-blue-950/40 text-cyber-neonBlue hover:bg-blue-900/60 border border-dashed border-cyber-neonBlue/40'
              }`}
            >
              <ExternalLink size={14} />
              <span className="underline font-mono text-xs">
                {cfg?.linkText || 'https://bank.ru/account/verify-identity'}
              </span>
              <span className="phishing-real-url">
                ↘ на самом деле ведёт на: {cfg?.linkReal || 'http://evil-steal-creds.net/login'}
              </span>
            </div>
          </div>

          {threats.some(t => t.id === 'attachment') && <><p className="text-gray-400 text-xs">
            Также обязательно запустите прикрепленный файл для обновления сертификата безопасности браузера.
          </p>

          {/* Dangerous Attachment */}
          <div className="pt-2">
            <div
              onClick={() => handleInspect('attachment')} role="button" tabIndex={0} aria-label="Проверить вложение"
              onKeyDown={event => {if(event.key === 'Enter' || event.key === ' '){event.preventDefault();handleInspect('attachment');}}}
              className={`inline-flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                threats.find(t => t.id === 'attachment')?.found
                  ? 'bg-red-950/80 border border-red-500 text-red-400'
                  : 'bg-gray-900 hover:bg-yellow-950/40 border border-dashed border-gray-700 text-white'
              }`}
            >
              <FileText size={20} className="text-red-500" />
              <div>
                <div className="font-mono text-xs font-bold">{cfg?.attachmentName || 'Инструкция_по_безопасности.pdf.exe'}</div>
                <div className="text-xs text-gray-400">Вложение письма • Проверь название и просьбу отправителя</div>
              </div>
            </div>
          </div></>}
        </div>
      </div>

      {/* Single fixed feedback area: the latest found threat replaces the previous text */}
      <div className="phishing-analysis mt-4 p-4 bg-cyber-neonBlue/10 border border-cyber-neonBlue/50 rounded-xl text-xs font-mono text-cyan-200 flex items-start gap-3" role="status">
        <AlertTriangle size={18} className="text-cyber-neonYellow shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-cyber-neonYellow uppercase mb-1">ОТЧЕТ КИБЕР-ЭКСПЕРТИЗЫ:</div>
          <p>{activeAnalysis ?? 'Нажми на подозрительную деталь письма — разбор появится здесь.'}</p>
        </div>
      </div>
      </div>

      {/* Threats Checklist / Success Banner */}
      {completed ? (
        <div className="phishing-success p-4 bg-cyber-neonGreen/15 border border-cyber-neonGreen rounded-xl flex items-center justify-between text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyber-neonGreen" size={26} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase">ФИШИНГОВАЯ АТАКА НЕЙТРАЛИЗОВАНА!</div>
              <div className="text-xs text-gray-300">
                Ты нашёл все признаки опасности в этом письме: {threats.map(t => t.label.toLowerCase()).join(", ")}.
              </div>
            </div>
          </div>
          <GameButton size="compact"
            onClick={onComplete}
            className="px-5 py-2 bg-cyber-neonGreen text-black font-bold uppercase rounded-lg text-xs hover:bg-white transition-colors"
          >
            ЗАКРЫТЬ КЕЙС (+{task.xpReward} XP)
          </GameButton>
        </div>
      ) : (
        <aside className="phishing-checklist flex flex-col gap-2" aria-label="Признаки опасности">
          {threats.map((t, idx) => {
            const slot = SLOT_META[t.id];
            return (
            <div
              key={t.id}
              className={`phishing-slot p-2.5 rounded-lg border font-mono text-xs transition-colors ${
                t.found
                  ? 'is-found bg-cyber-neonGreen/15 border-cyber-neonGreen text-cyber-neonGreen'
                  : 'bg-gray-900/40 border-gray-800 text-gray-500'
              }`}
            >
              <span className="phishing-slot-head">{slot?.icon ?? <Search size={18} />}<strong>{slot?.title ?? `Признак ${idx + 1}`}</strong></span>
              {t.found ? `✓ ${t.label}` : 'ещё не найден'}
            </div>);
          })}
        </aside>
      )}
      </div>
    </div>
  );
};
