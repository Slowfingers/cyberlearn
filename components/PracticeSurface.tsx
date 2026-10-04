import React from 'react';

/** One scroll owner, with independent rows for the task and its activity. */
export function PracticeSurface({ goal, children }: { goal: string; children: React.ReactNode }) {
  return <div className="academy-practice-scroll">
    <div className="academy-practice-stack">
      <section className="academy-task-brief" aria-label="Задача"><span>Твоя задача</span><p>{goal}</p></section>
      <div className="academy-practice-content">{children}</div>
    </div>
  </div>;
}
