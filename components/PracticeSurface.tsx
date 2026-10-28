import React from 'react';
import '../styles/game-shell.css';

/** The task stays in its own row; only the activity scrolls on smaller screens. */
export function PracticeSurface({ goal, children, kind }: { goal: string; children: React.ReactNode; kind?: string }) {
  return <div className="academy-practice-frame">
    <section className="academy-task-brief practice-pinned-brief mission-goal" aria-label="Задача"><span>Цель</span><p>{goal}</p></section>
    <div className="academy-practice-scroll">
      <div className="academy-practice-stack">
        <div className="academy-practice-content" data-trainer={kind}>{children}</div>
      </div>
    </div>
  </div>;
}
