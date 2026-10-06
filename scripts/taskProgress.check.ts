import assert from 'node:assert/strict';
import {MOCK_TASKS} from '../constants';
import {uniqueTaskCatalog,applyCompletedTasks,nextUnfinishedTask} from '../services/taskProgress';
for(const grade of ['5','6','7']){
const grade5=MOCK_TASKS.filter(t=>t.courseId===`course_grade${grade}`);
assert.equal(grade5.length,grade==='6'?40:70);
assert.equal(uniqueTaskCatalog(MOCK_TASKS,[{...grade5[0],title:'Старая копия'},grade5[0]]).length,MOCK_TASKS.length);
const ids=new Set([grade5[0].id,grade5[1].id]);
let tasks=applyCompletedTasks(grade5,ids);
assert.equal(nextUnfinishedTask(tasks,grade5[0])?.id,grade5[2].id,'Далее пропускает уже завершённый урок');
// An older response after a successful save cannot reopen that acknowledged task.
ids.add(grade5[2].id);tasks=applyCompletedTasks(grade5,ids);
assert.equal(tasks[2].status,'completed');
assert.equal(nextUnfinishedTask(tasks,grade5[0])?.id,grade5[3].id);
const withGap=applyCompletedTasks(grade5,grade5.slice(1).map(t=>t.id));
assert.equal(nextUnfinishedTask(withGap,grade5.at(-1)!)?.id,grade5[0].id,'Возврат к ранее пропущенному уроку');
const finished=applyCompletedTasks(grade5,grade5.map(t=>t.id));
assert.equal(nextUnfinishedTask(finished,grade5[0]),null);
assert.equal(nextUnfinishedTask(finished,grade5.at(-1)!),null);
assert.ok(applyCompletedTasks(grade5,[]).every(t=>t.status!=='completed'),'Прогресс другого ученика не переносится');
}
console.log('taskProgress.check: повторные ID, устаревшие обновления, пропуск пройденного и завершение курса проверены.');
