import assert from 'node:assert/strict';
import { MOCK_TASKS, COURSES } from '../constants';
import { GRADE3_TASKS } from '../curriculum/grade3';
import { GRADE4_TASKS } from '../curriculum/grade4';
import { GRADE5_TASKS } from '../curriculum/grade5';
import { GRADE6_TASKS } from '../curriculum/grade6';
import { GRADE7_TASKS } from '../curriculum/grade7';
import { GRADE8_TASKS } from '../curriculum/grade8';
import { TRAINER_CONFIGS } from '../curriculum/trainerConfigs';
import { reviseLessons } from '../curriculum/pedagogy';
import { LESSON_PROGRESSIONS } from '../curriculum/lessonProgressions';
import { PROGRESSION_QUESTIONS } from '../curriculum/progressionQuestions';
import { parseIfFormula } from '../services/spreadsheetEvaluation';
const original = [...GRADE3_TASKS, ...GRADE4_TASKS, ...GRADE5_TASKS, ...GRADE6_TASKS, ...GRADE7_TASKS, ...GRADE8_TASKS];
assert.deepEqual(MOCK_TASKS.map(t => t.id).sort(), original.map(t => t.id).sort(), 'Сохранены ID всего учебного прогресса');
const byId = new Map(MOCK_TASKS.map(t => [t.id, t]));
const reversed = reviseLessons([...original].map(t => ({...t, ...TRAINER_CONFIGS[t.id]})).reverse());
for (const task of reversed) {
  assert.equal(task.lesson?.concept, byId.get(task.id)?.lesson?.concept, `${task.id}: понятие привязано к ID, не к позиции`);
  assert.equal(task.lesson?.explanation, byId.get(task.id)?.lesson?.explanation, `${task.id}: объяснение привязано к ID, не к позиции`);
}
assert.deepEqual(Object.keys(LESSON_PROGRESSIONS).sort(), Object.keys(PROGRESSION_QUESTIONS).sort());
for (const id of Object.keys(LESSON_PROGRESSIONS)) {
  assert.ok(byId.has(id), `${id}: методическая карточка относится к существующему уроку`);
  assert.deepEqual(byId.get(id)!.lesson!.mentorQuestion, PROGRESSION_QUESTIONS[id]);
}
for (const task of MOCK_TASKS) {
  assert.ok(task.lesson?.goal && task.lesson.example && task.lesson.reflection, task.id);
  if (['grid', 'html', 'terminal'].includes(task.type)) {
    assert.ok(task.lesson.starterCode !== undefined, `${task.id}: есть самостоятельная практика`);
    if (task.id !== 'g4_l43') assert.notEqual(task.lesson.starterCode, task.initialCode, `${task.id}: ученику не выдано готовое решение`);
  }
  if (task.type === 'spreadsheet') {
    const config = task.spreadsheetConfig!;
    if (config.formulaType === 'sum') {
      assert.equal(config.targetFormula, '=SUM(D2:D4)');
      assert.ok(config.tableData.length === 0 || config.tableData.length === 3, `${task.id}: диапазон соответствует таблице`);
    }
    if (config.formulaType === 'if') {
      assert.ok(parseIfFormula(config.targetFormula), `${task.id}: условие реально поддерживается`);
      assert.equal(task.lesson.concept, 'Условие в таблице');
    }
  }
  if (task.type === 'sorting') assert.equal(task.sortingConfig?.algorithm, 'bubble', `${task.id}: описан реально реализованный алгоритм`);
}
for (const course of COURSES) assert.equal(course.totalModules, new Set(MOCK_TASKS.filter(t => t.courseId === course.id).map(t => t.module)).size);
// A repeated topic must teach the next skill, not replay the same explanation.
for (const course of COURSES) {
  const explanations = new Map<string, string>();
  for (const task of MOCK_TASKS.filter(t => t.courseId === course.id)) {
    const explanation = task.lesson!.explanation.replace(/\s+/g, ' ').trim();
    assert.ok(!explanations.has(explanation), `${task.id}: повторяет объяснение ${explanations.get(explanation)}`);
    explanations.set(explanation, task.id);
  }
}
assert.equal(byId.get('g3_m8_l1')?.spreadsheetConfig?.formulaType, 'multiply');
assert.equal(byId.get('g3_m2_l6')?.quizData?.options[0], '16 бит');
assert.equal(byId.get('g7_l16')?.quizData?.options[0], 'legs["кот"]');
console.log(`pedagogy.check: все ${MOCK_TASKS.length} ID, привязка тем, учебные циклы, самостоятельные заготовки и соответствие практики проверены`);
