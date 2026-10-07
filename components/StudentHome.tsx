import React, { useRef } from 'react';
import { ArrowRight, BookOpen, Flag, ShoppingBag, UserRound, Lock, CheckCircle2 } from 'lucide-react';
import { Course, Task, User } from '../types';
import { AcademyArt } from './AcademyArt';
import { PixelIcon } from './PixelSprite';
import ShopAvatar, { STREET_AVATARS, AVATAR_NAMES } from './ShopAvatar';
import { COSMETICS } from '../constants';
import {GameButton} from './GameUI';

type HomeCourse = Course & { progress: number; totalTasks: number };
interface Props {
  user: User; courses: HomeCourse[]; tasks: Task[]; progress: number; today: number;
  onCourse: (id: string, resume?: boolean) => void; onShop: () => void; onProfile: () => void;
}
export default function StudentHome({ user, courses, tasks, progress, today, onCourse, onShop, onProfile }: Props) {
  const routesRef = useRef<HTMLDivElement>(null);
  const available = courses.filter(c => c.status === 'active');
  const nextCourse = available.find(c => c.progress > 0 && c.progress < 100) || available.find(c => c.progress < 100) || available[0];
  const nextTask = tasks.find(t => t.courseId === nextCourse?.id && t.status === 'open');
  const completed = tasks.filter(t => t.status === 'completed').length;
  const avatar = COSMETICS.find(c => c.id === user.equipped.avatar)?.value || '2';
  return <div className="academy-home game-home">
    <nav className="academy-nav" aria-label="Главная навигация">
      <span className="academy-nav-caption">CYBER / BASE</span>
      <GameButton className="academy-nav-item is-active" aria-current="page" onClick={() => routesRef.current?.scrollIntoView({block: 'start'})}><BookOpen size={21}/><span>Мои курсы</span></GameButton>
      <GameButton className="academy-nav-item" onClick={onShop}><ShoppingBag size={21}/><span>Магазин</span></GameButton>
      <GameButton className="academy-nav-item" onClick={onProfile}><UserRound size={21}/><span>Мой профиль</span></GameButton>
      <div className="academy-nav-bottom"><div className="academy-player"><ShopAvatar avatarId={avatar} frameId={user.equipped.avatarFrame} scale={1}/><div><strong>{user.name}</strong><span>Уровень {user.level}</span></div></div><div className="academy-level-track" aria-label={`Опыт до нового уровня: ${Math.round(progress)}% накоплено`}><i style={{width:`${progress}%`}}/></div><p>Опыт для нового уровня</p></div>
    </nav>
    <div className="academy-home-content">
      <div className="academy-page-heading"><div><p className="academy-eyebrow">Твоя территория открытий</p><h1>База игрока</h1></div><div className="academy-wallet" aria-label={`Монеты: ${user.currency || 0}`}><PixelIcon kind="coin"/><strong>{user.currency || 0}</strong><span>монет</span></div></div>
      <section className="player-lobby" aria-label="Твой герой и следующая миссия">
        <div className="player-stage">
          <div className="player-greeting"><span className="academy-eyebrow">С возвращением,</span><h2 title={user.name}>{user.name}!</h2></div>
          <div className="player-scene" aria-hidden="true"/>
          <ShopAvatar avatarId={avatar} stage className="player-full-avatar"/>
          <GameButton className="player-nameplate" onClick={onProfile}><span>УРОВЕНЬ {user.level}</span><strong>{STREET_AVATARS.find(a=>a.value===avatar)?.name || AVATAR_NAMES[Math.max(0,Math.min(23,(Number(avatar)||2)-2))]}</strong><span>Мой герой <ArrowRight size={14}/></span></GameButton>
        </div>
        <div className="player-mission">
          <span className="academy-pill"><Flag size={14}/> {nextCourse?.progress === 100 ? 'Миссии завершены' : 'Следующая миссия'}</span>
          <span className="player-mission-course">{nextCourse?.title || 'Ожидаем старт'}</span>
          <h2>{nextTask?.title || (nextCourse?.progress === 100 ? 'Все задания позади. Отличная работа!' : 'Готов к новым открытиям?')}</h2>
          <p>{nextTask?.lesson?.goal || (nextCourse ? 'Выбери знакомую миссию и проверь свои силы ещё раз.' : 'Учитель откроет курс — и здесь появится твоя первая миссия.')}</p>
          {nextCourse && <div className="player-mission-progress"><span>Маршрут пройден<strong>{nextCourse.progress}%</strong></span><div className="academy-course-track"><i style={{width:`${nextCourse.progress}%`}}/></div></div>}
          <GameButton variant="primary" disabled={!nextCourse} onClick={() => nextCourse && onCourse(nextCourse.id,true)}>{nextCourse?.progress === 100 ? 'Повторить курс' : nextCourse?.progress ? 'Продолжить урок' : 'Начать миссию'}<ArrowRight size={18}/></GameButton>
        </div>
      </section>
      <div className="academy-milestones"><div><span className="academy-stat-icon mint"><CheckCircle2 size={21}/></span><strong>{completed}<small>заданий пройдено</small></strong></div><div><span className="academy-stat-icon gold"><PixelIcon kind="trophy"/></span><strong>{user.achievements.length}<small>достижений открыто</small></strong></div><div><span className="academy-stat-icon lavender"><PixelIcon kind="rocket"/></span><strong>{today}<small>заданий сегодня</small></strong></div></div>
      <div ref={routesRef} className="academy-section-heading player-routes"><h2>Выбери свой маршрут</h2><span>{courses.length} курсов · от первых шагов к своим проектам</span></div>
      <div className="academy-course-grid">{courses.map((course,index) => <button key={course.id} className={`academy-course course-tone-${index % 5}`} disabled={course.status !== 'active'} onClick={() => onCourse(course.id)}>
        <div className="academy-course-picture"><span className="academy-course-number">Сектор {String(index + 1).padStart(2,'0')}</span><AcademyArt variant={index}/>{course.status !== 'active' && <span className="academy-course-lock"><Lock size={18}/>{course.status === 'coming_soon' ? 'Скоро' : 'Откроет учитель'}</span>}</div>
        <div className="academy-course-copy"><h3>{course.title}</h3><p>{course.description}</p><div className="academy-course-meta"><span>{course.totalModules} разделов</span><span>{course.totalTasks} заданий</span></div><div className="academy-course-track"><i style={{width:`${course.progress}%`}}/></div><div className="academy-course-bottom"><span>{course.progress}% пройдено</span><strong>{course.progress === 100 ? 'Повторить' : course.progress > 0 ? 'Продолжить' : 'Исследовать'}<ArrowRight size={16}/></strong></div></div>
      </button>)}</div>
    </div>
  </div>;
}
