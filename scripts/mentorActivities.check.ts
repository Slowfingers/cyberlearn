import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MOCK_TASKS } from '../constants';
import { CLEAR_EXPLANATIONS } from '../curriculum/clearExplanations';
import { MENTOR_QUESTIONS } from '../curriculum/mentorActivities';
import { BigMascotTheoryStory } from '../components/BigMascotTheoryStory';
for (const [topic, activity] of Object.entries(MENTOR_QUESTIONS)) {

  assert.equal(activity.options.length, 3);
  assert.ok(activity.correct >= 0 && activity.correct < activity.options.length);
  assert.equal(new Set(activity.options.map(option => option.text)).size, 3);
  assert.ok(activity.options.every(option => option.feedback.length > 20));
}
for (const task of MOCK_TASKS) {
  assert.ok(task.lesson?.topic, `Missing topic: ${task.id}`);
  assert.ok(task.lesson!.mentorQuestion ?? MENTOR_QUESTIONS[task.lesson!.topic!], `Missing question: ${task.id}`);
  assert.ok(task.lesson!.mentorQuestion ? task.lesson!.explanation : CLEAR_EXPLANATIONS[task.lesson!.topic!], `Missing clear explanation: ${task.id}`);
  const markup = renderToStaticMarkup(React.createElement(BigMascotTheoryStory, { task, mascotSkinItemId: 'skin_cat', onStartPractice: () => {} }));
  assert.ok(markup.includes('Кибер-Кот'));
  assert.ok(markup.includes('Шаги объяснения'));
  assert.ok(!markup.includes('undefined'));
  assert.ok(!markup.includes('Можно на примере?'));
  assert.ok(!markup.includes('<textarea'));
}
console.log(`mentorActivities.check: ${Object.keys(MENTOR_QUESTIONS).length} teaching questions with specific feedback; all ${MOCK_TASKS.length} lessons render a teacher-led explanation.`);

assert.equal(MOCK_TASKS.find(t => t.id === 'g5_l4')?.lesson?.topic, 'nand');
assert.equal(MOCK_TASKS.find(t => t.id === 'g5_l49')?.lesson?.topic, 'algorithm');
assert.equal(MOCK_TASKS.find(t => t.id === 'g7_l34')?.htmlConfig?.targetTag, 'button');
