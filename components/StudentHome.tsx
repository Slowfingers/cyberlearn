import React from 'react';
import { ArrowRight, BookOpen, Coins, Flag, ShoppingBag, Sparkles, Trophy, UserRound, Lock, CheckCircle2 } from 'lucide-react';
import { Course, Task, User } from '../types';
import { AcademyArt } from './AcademyArt';
import { PixelIcon } from './PixelSprite';
import ShopAvatar from './ShopAvatar';
import { COSMETICS } from '../constants';

type HomeCourse = Course & { progress: number; totalTasks: number };
interface Props {
  user: User; courses: HomeCourse[]; tasks: Task[]; progress: number; today: number;
  onCourse: (id: string, resume?: boolean) => void; onShop: () => void; onProfile: () => void;
}
export default function StudentHome({ user, courses, tasks, progress, today, onCourse, onShop, onProfile }: Props) {
  const available = courses.filter(c => c.status === 'active');
  const nextCourse = available.find(c => c.progress > 0 && c.progress < 100) || available.find(c => c.progress < 100) || available[0];
  const nextTask = tasks.find(t => t.courseId === nextCourse?.id && t.status === 'open');
  const completed = tasks.filter(t => t.status === 'completed').length;
  const avatar = COSMETICS.find(c => c.id === user.equipped.avatar)?.value || '2';
  return <div className="academy-home">
    <nav className="academy-nav" aria-label="Главная навигация">
      <span className="academy-nav-caption">ТВОЁ ПРИКЛЮЧЕНИЕ</span>
      <button className="academy-nav-item is-active" aria-current="page"><BookOpen size={21}/><span>Мои курсы</span></button>
      <button className="academy-nav-item" onClick={onShop}><ShoppingBag size={21}/><span>Магазин</span></button>
      <button className="academy-nav-item" onClick={onProfile}><UserRound size={21}/><span>Мой профиль</span></button>
      <div className="academy-nav-bottom"><div className="academy-player"><ShopAvatar avatarId={avatar} frameId={user.equipped.avatarFrame} scale={1}/><div><strong>{user.name}</strong><span>Уровень {user.level}</span></div></div><div className="academy-level-track" aria-label={`До следующего уровня: ${Math.round(progress)}%`}><i style={{width:`${progress}%`}}/></div><p>Новые знания — новый уровень</p></div>
    </nav>
    <div className="academy-home-content">
      <div className="academy-page-heading"><div><p className="academy-eyebrow">Учись. Пробуй. Создавай.</p><h1>Твоя карта миссий</h1></div><div className="academy-wallet" aria-label={`Монеты: ${user.currency || 0}`}><PixelIcon kind="coin"/><strong>{user.currency || 0}</strong><span>монет</span></div></div>
      <section className="academy-quest"><div className="academy-quest-copy"><span className="academy-pill"><Flag size={14}/> Следующий шаг</span><h2>{nextTask ? nextTask.title : completed > 0 && nextCourse?.progress === 100 ? 'Отличный путь! Повторим?' : 'Большие открытия начинаются с тебя'}</h2><p>{nextTask?.lesson?.goal || 'Исследуй мир технологий, решай задачи и собирай свою коллекцию достижений.'}</p><button className="academy-primary" disabled={!nextCourse} onClick={() => nextCourse && onCourse(nextCourse.id,true)}>{nextCourse?.progress ? 'Продолжить урок' : 'Начать миссию'}<ArrowRight size={18}/></button><span className="academy-quest-context">{nextCourse?.title}</span></div><AcademyArt variant={0} hero/></section>
      <div className="academy-milestones"><div><span className="academy-stat-icon mint"><CheckCircle2 size={21}/></span><strong>{completed}<small>заданий пройдено</small></strong></div><div><span className="academy-stat-icon gold"><PixelIcon kind="trophy"/></span><strong>{user.achievements.length}<small>достижений открыто</small></strong></div><div><span className="academy-stat-icon lavender"><PixelIcon kind="rocket"/></span><strong>{today}<small>заданий сегодня</small></strong></div></div>
      <div className="academy-section-heading"><h2>Выбери свой маршрут</h2><span>{courses.length} курсов · от первых шагов к своим проектам</span></div>
      <div className="academy-course-grid">{courses.map((course,index) => <button key={course.id} className={`academy-course course-tone-${index % 5}`} disabled={course.status !== 'active'} onClick={() => onCourse(course.id)}>
        <div className="academy-course-picture"><span className="academy-course-number">Сектор {String(index + 1).padStart(2,'0')}</span><AcademyArt variant={index}/>{course.status !== 'active' && <span className="academy-course-lock"><Lock size={18}/>{course.status === 'coming_soon' ? 'Скоро' : 'Откроет учитель'}</span>}</div>
        <div className="academy-course-copy"><h3>{course.title}</h3><p>{course.description}</p><div className="academy-course-meta"><span>{course.totalModules} разделов</span><span>{course.totalTasks} заданий</span></div><div className="academy-course-track"><i style={{width:`${course.progress}%`}}/></div><div className="academy-course-bottom"><span>{course.progress}% пройдено</span><strong>{course.progress === 100 ? 'Повторить' : course.progress > 0 ? 'Продолжить' : 'Исследовать'}<ArrowRight size={16}/></strong></div></div>
      </button>)}</div>
    </div>
  </div>;
}
