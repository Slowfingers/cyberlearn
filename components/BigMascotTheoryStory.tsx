import { ComputerMissionLesson } from './ComputerMissionLesson';
import { FirstStepsMission } from './FirstStepsMission';
import { FileTypeLesson } from './FileTypeLesson';
import { FileArchiveLesson } from './FileArchiveLesson';
import {GameButton} from './GameUI';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, Check, Lightbulb, MessageCircle, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { LessonCharacter as BigCharacter3D, useLessonCharacterName, LessonPlayerContext } from './LessonCharacter';
import { LessonWorkedExample } from './LessonWorkedExample';
import { Grade3WorkedExample } from './Grade3WorkedExample';
import { GRADE3_WORKED_EXAMPLES } from '../curriculum/grade3WorkedExamples';
import { MentorExperiment } from './MentorExperiment';
import { LessonDemo } from './LessonDemo';
import { getMentorQuestion } from '../curriculum/mentorActivities';
import { Task } from '../types';
import { extractTheoryBlocks, cleanLessonTitle, stripStandardsPrefix, TheoryBlock } from '../utils/theoryText';

interface Props {
  user?: import('../types').User | null;
  task: Task;
  onStartPractice: () => void;
  onCompleteTheory?: () => void;
  mascotSkinItemId?: string;
  practiceGoal?: string;
}
export interface StoryContent { title: string; intro: string; theoryGroups: TheoryBlock[][] }
const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export function getStoryContent(task: Task): StoryContent {
  const lesson = task.lesson;
  return {
    title: cleanLessonTitle(task.title),
    intro: lesson?.goal ?? stripStandardsPrefix(task.description),
    theoryGroups: lesson
      ? [lesson.explanation, lesson.example].map(text => [{ text, html: `<p>${escapeHtml(text)}</p>` }])
      : extractTheoryBlocks(task.theory).map(block => [block]),
  };
}

const STAGES = ['Объяснение', 'Разбор примера', 'Проверь понимание', 'Твоё задание'];

export const BigMascotTheoryStory: React.FC<Props> = (props) => <LessonPlayerContext.Provider value={props.user ?? null}><PlayerTheoryStory {...props}/></LessonPlayerContext.Provider>;

const PlayerTheoryStory: React.FC<Props> = ({ task, onStartPractice, practiceGoal, mascotSkinItemId }) => {
  const lesson = task.lesson;
  const story = getStoryContent(task);
  const mentorName = useLessonCharacterName();
  const sentences = (lesson?.explanation ?? story.theoryGroups.flat().map(block => block.text).join(' ')).split(/(?<=[.!?])\s+(?=[А-ЯЁA-Z])/).filter(Boolean);
  const paragraphs = (lesson?.explanation ?? '').split(/\n\s*\n/).filter(Boolean);
  const chunks = paragraphs.length > 1 ? paragraphs : ['course_grade3','course_grade4','course_grade5'].includes(task.courseId) ? sentences.reduce<string[]>((blocks,sentence,i)=>{if(i%2===0)blocks.push(sentence);else blocks[blocks.length-1]+=' '+sentence;return blocks;},[]) : sentences;
  const [stage, setStage] = useState(0);
  const [chunk, setChunk] = useState(0);
  const [exampleStep, setExampleStep] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [reactionKey, setReactionKey] = useState(0);
  const [answer, setAnswer] = useState<number>();
  const panelRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const question = getMentorQuestion(task);
  const grade3Example = GRADE3_WORKED_EXAMPLES[task.id];
  // Stable permutation prevents the correct choice always occupying the same position.
  const shift = [...task.id].reduce((sum, letter) => sum + letter.charCodeAt(0), 0) % 3;
  const order = question ? question.options.map((_, i) => (i + shift) % question.options.length) : [];
  const correct = question && answer === question.correct;
  const goal = practiceGoal ?? lesson?.goal ?? story.intro;
  const mentorSpeech = stage === 0 ? chunks[chunk] || story.intro
    : stage === 1 ? grade3Example?.[exampleStep].join('. ') ?? lesson?.example ?? story.intro
    : stage === 2 ? (answer !== undefined && question ? question.options[answer].feedback : question?.prompt ?? lesson?.reflection ?? `Как ты объяснишь тему «${story.title}» своими словами?`)
    : `Теперь твоя очередь. ${goal} ${lesson?.success ?? ''}`;
  const cancelSpeech = () => {
    if (speechRef.current) { speechRef.current.onend = null; speechRef.current.onerror = null; }
    window.speechSynthesis?.cancel();
    speechRef.current = null;
    setSpeaking(false);
  };
  useEffect(() => {
    setStage(0); setChunk(0); setExampleStep(0); setShowSteps(false); setAnswer(undefined);
    return () => { if (speechRef.current) { speechRef.current.onend = null; speechRef.current.onerror = null; } window.speechSynthesis?.cancel(); };
  }, [task.id]);
  useEffect(() => { cancelSpeech(); }, [stage, chunk, exampleStep, answer, task.id]);
  const move = (next: number) => {
    setStage(next);
    requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
  };
  const narrate = () => {
    if (speaking) { cancelSpeech(); return; }
    const utterance = new SpeechSynthesisUtterance(mentorSpeech);
    utterance.lang = 'ru-RU'; utterance.rate = 0.9;
    utterance.onend = utterance.onerror = () => { setSpeaking(false); speechRef.current = null; };
    window.speechSynthesis.cancel(); speechRef.current = utterance;
    window.speechSynthesis.speak(utterance); setSpeaking(true);
  };
  const startPractice = () => { cancelSpeech(); onStartPractice(); };
  if (/^g3_m2_l[1-7]$/.test(task.id)) return <ComputerMissionLesson key={task.id} task={task} skin={mascotSkinItemId} goal={goal} onStart={startPractice}/>;
  if (/^g3_m1_l[3-7]$/.test(task.id)) return <FirstStepsMission key={task.id} task={task} skin={mascotSkinItemId} goal={goal} onStart={startPractice}/>;
  if (task.id === 'g3_m1_l1') return <FileTypeLesson key={task.id} skin={mascotSkinItemId} goal={goal} onStart={startPractice}/>;
  if (task.id === 'g3_m1_l2') return <FileArchiveLesson key={task.id} skin={mascotSkinItemId} goal={goal} onStart={startPractice}/>;
  return <article className="academy-theory mentor-lesson" aria-label="Объяснение урока">
    <header className="mentor-lesson-header"><div><span>Разбираем с твоим героем</span><h1>{lesson?.concept ?? story.title}</h1></div>
      {typeof window !== 'undefined' && 'speechSynthesis' in window && <GameButton size="compact" className="mentor-listen" onClick={narrate} aria-pressed={speaking}>{speaking ? <VolumeX size={17}/> : <Volume2 size={17}/>} {speaking ? 'Остановить озвучку' : 'Озвучить текст'}</GameButton>}
    </header>
    <nav className="mentor-stage-nav" aria-label="Шаги объяснения">{STAGES.map((label, i) => <GameButton size="compact" key={label} aria-current={stage === i ? 'step' : undefined} onClick={() => move(i)}><span>{i + 1}</span><small>{label}</small></GameButton>)}</nav>
    <div className="mentor-classroom">
      <aside className="mentor-teacher"><div className="mentor-teacher-halo"/><BigCharacter3D skin={mascotSkinItemId} isSpeaking={speaking} reactionKey={reactionKey} mood={stage === 2 && answer !== undefined ? correct ? 'celebrate' : 'thinking' : 'idle'}/><strong>{mentorName}</strong><span>{speaking ? 'Объясняю…' : correct && stage === 2 ? 'Отлично разобрались!' : 'Давай разберём вместе'}</span></aside>
      <div className="mentor-board" ref={panelRef} tabIndex={-1} aria-label={STAGES[stage]}>
        {!(stage === 1 && grade3Example) && <div className="mentor-bubble"><div className="mentor-bubble-label"><MessageCircle size={15}/>{mentorName}</div>
          {stage === 0 && <p key={chunk} className="mentor-main-speech" aria-live="polite">{chunks[chunk] || story.intro}</p>}
          {stage === 1 && <p className="mentor-example-text">{lesson?.example ?? story.intro}</p>}
          {stage === 2 && <><p className="mentor-opening">Теперь рассуждаем вместе. Здесь можно пробовать и исправляться.</p><h2 className="mentor-main-speech">{question?.prompt ?? lesson?.reflection ?? `Как ты объяснишь тему «${story.title}» своими словами?`}</h2></>}
          {stage === 3 && <><p className="mentor-main-speech">Теперь ты готов попробовать сам!</p><p>{goal}</p></>}
        </div>}
        {stage === 0 && <div className="mentor-explanation-progress" aria-label={`Идея ${chunk + 1} из ${Math.max(chunks.length, 1)}`}>{chunks.map((_, i) => <GameButton size="compact" key={i} aria-label={`Показать часть ${i + 1}`} aria-current={chunk === i ? 'step' : undefined} onClick={() => setChunk(i)}>{i+1}</GameButton>)}</div>}
        {stage === 1 && (grade3Example
          ? <Grade3WorkedExample taskId={task.id} step={exampleStep} onStep={setExampleStep}/>
          : lesson?.demo ? <LessonDemo key={task.id} task={task}/>
          : /^g3_m1_l[1-7]$/.test(task.id) ? <LessonWorkedExample taskId={task.id}/>
          : <MentorExperiment key={task.id} topic={lesson?.topic}/>)}
        {stage === 2 && <>
          <div className="mentor-answer-list">{order.map(index => <GameButton size="compact" key={index} disabled={!!correct} onClick={() => {setAnswer(index);setReactionKey(key=>key+1);}} className={answer === index ? correct ? 'is-correct' : 'is-retry' : ''} aria-pressed={answer === index}>{question.options[index].text}{answer === index && correct && <Check size={20}/>}</GameButton>)}</div>
          {answer !== undefined && <div className={`mentor-feedback ${correct ? 'is-correct' : ''}`} role="status"><strong>{correct ? 'Да, ты понял!' : 'Давай проверим мысль.'}</strong><p>{question.options[answer].feedback}</p>{!correct && <small>Можно выбрать другой вариант.</small>}</div>}
        </>}
        {stage === 3 && <div className="mentor-practice-brief"><h2><Check size={18}/> Как поймём, что получилось</h2><p>{lesson?.success ?? 'Сравни результат с условием задания.'}</p>
          <GameButton size="compact" className="mentor-question-link" onClick={() => setShowSteps(!showSteps)} aria-expanded={showSteps}><Lightbulb size={16}/>{showSteps ? 'Скрыть шаги задания' : 'Показать шаги задания'}</GameButton>
          {showSteps && <><ol>{(lesson?.steps ?? ['Прочитай условие.', 'Попробуй и проверь результат.']).map(step => <li key={step}>{step}</li>)}</ol>{lesson?.commands && <dl className="mentor-command-list">{lesson.commands.map(({ code, meaning }) => <div key={code}><dt><code>{code}</code></dt><dd>{meaning}</dd></div>)}</dl>}</>}
        </div>}
        <div className="mentor-dialog-actions">
          {stage > 0 && <GameButton size="compact" className="mentor-back" onClick={() => move(stage - 1)}><ChevronLeft size={17}/> {`Вернуться: ${STAGES[stage - 1].toLowerCase()}`}</GameButton>}
          {stage === 0 ? <GameButton variant="primary" className="mentor-primary" onClick={() => { if (chunk < chunks.length - 1) { setChunk(chunk + 1); } else move(1); }}>{chunk < chunks.length - 1 ? 'Продолжить объяснение' : 'Разобрать пример'}<ArrowRight size={18}/></GameButton>
            : stage < 3 ? <GameButton variant="primary" className="mentor-primary" disabled={stage === 2 && !correct} onClick={() => move(stage + 1)}>{stage === 1 ? 'Проверить понимание' : 'Прочитать задание'}<ArrowRight size={18}/></GameButton>
            : <GameButton variant="primary" className="mentor-primary" onClick={startPractice}>{task.type === 'theory' ? 'Завершить урок' : 'Начать задание'}<ArrowRight size={18}/></GameButton>}
        </div>
      </div>
    </div>
    <footer className="mentor-lesson-footer"><GameButton size="compact" onClick={() => { setChunk(0); setExampleStep(0); setAnswer(undefined); move(0); }}><RotateCcw size={15}/> Повторить объяснение</GameButton>{stage < 3 && <GameButton size="compact" onClick={() => move(3)}>Пропустить объяснение<ArrowRight size={15}/></GameButton>}</footer>
  </article>;
};
