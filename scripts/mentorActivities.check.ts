import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MOCK_TASKS } from '../constants';
import { CLEAR_EXPLANATIONS } from '../curriculum/clearExplanations';
import { MENTOR_QUESTIONS, getMentorQuestion } from '../curriculum/mentorActivities';
import { BigMascotTheoryStory } from '../components/BigMascotTheoryStory';
import { GRADE3_WORKED_EXAMPLES } from '../curriculum/grade3WorkedExamples';
for (const [topic, activity] of Object.entries(MENTOR_QUESTIONS)) {

  assert.equal(activity.options.length, 3);
  assert.ok(activity.correct >= 0 && activity.correct < activity.options.length);
  assert.equal(new Set(activity.options.map(option => option.text)).size, 3);
  assert.ok(activity.options.every(option => option.feedback.length > 20));
}
const theoryTasks = MOCK_TASKS.filter(task => /^course_grade[3-8]$/.test(task.courseId));
const grade3ExampleIds = theoryTasks.filter(task => /^g3_m(?:[3-9]|10)_l[1-7]$/.test(task.id)).map(task => task.id);
assert.equal(grade3ExampleIds.length, 56);
assert.deepEqual(Object.keys(GRADE3_WORKED_EXAMPLES).sort(), grade3ExampleIds.sort());
for (const [id, steps] of Object.entries(GRADE3_WORKED_EXAMPLES)) {
  assert.equal(steps.length, 3, id);
  assert.equal(new Set(steps.map(([label]) => label)).size, 3, id);
  assert.ok(steps.every(([label, detail]) => label.trim() && detail.trim()), id);
}
for (const task of theoryTasks) {
  const activity = getMentorQuestion(task);
  assert.equal(activity.options.length, 3, task.id);
  assert.ok(activity.correct >= 0 && activity.correct < 3, task.id);
  assert.equal(new Set(activity.options.map(option => option.text)).size, 3, task.id);
  assert.ok(activity.options.every(option => option.feedback.length > 20), task.id);
  assert.ok(task.lesson?.topic, `Missing topic: ${task.id}`);
  assert.ok(task.lesson!.mentorQuestion ?? MENTOR_QUESTIONS[task.lesson!.topic!], `Missing question: ${task.id}`);
  assert.ok(task.lesson!.mentorQuestion ? task.lesson!.explanation : CLEAR_EXPLANATIONS[task.lesson!.topic!], `Missing clear explanation: ${task.id}`);
  const markup = renderToStaticMarkup(React.createElement(BigMascotTheoryStory, { task, mascotSkinItemId: 'skin_cat', onStartPractice: () => {} }));
  const restoring = markup.includes('Восстанавливаем шаг урока');
  assert.ok(restoring || markup.includes('data-player-avatar='), `${task.id}: объяснение показывает героя ученика`);
  assert.ok(restoring || markup.includes('Шаги объяснения') || markup.includes('Шаг 1 из'), `${task.id}: показан этап объяснения`);
  assert.ok(!markup.includes('undefined'));
  assert.ok(!markup.includes('Можно на примере?'));
  assert.ok(!markup.includes('<textarea'));
}
console.log(`mentorActivities.check: ${Object.keys(MENTOR_QUESTIONS).length} teaching questions with specific feedback; ${theoryTasks.length} school lessons render an explanation with the player's avatar.`);

assert.equal(MOCK_TASKS.find(t => t.id === 'g5_l4')?.lesson?.topic, 'nand');
assert.equal(MOCK_TASKS.find(t => t.id === 'g5_l49')?.lesson?.topic, 'algorithm');
assert.equal(MOCK_TASKS.find(t => t.id === 'g7_l34')?.htmlConfig?.targetTag, 'button');
