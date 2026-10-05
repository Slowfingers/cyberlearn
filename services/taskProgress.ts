import type {Task} from '../types';

/** Built-in IDs are canonical; legacy copies from class storage must not duplicate them. */
export function uniqueTaskCatalog(builtIn:Task[], custom:Task[]):Task[] {
  const seen=new Set<string>();
  return [...builtIn,...custom].filter(task=>{
    if(seen.has(task.id))return false;
    seen.add(task.id);return true;
  });
}

/** A successful acknowledgement stays completed while older refreshes are in flight. */
export function applyCompletedTasks(tasks:Task[], completedIds:Iterable<string>):Task[] {
  const completed=new Set(completedIds);
  return tasks.map(task=>({...task,status:completed.has(task.id)?'completed':task.status}));
}

/** Resume unfinished work, including gaps earlier in the course, without replaying completed lessons. */
export function nextUnfinishedTask(tasks:Task[], current:Task):Task|null {
  const course=tasks.filter(task=>task.courseId===current.courseId);
  const index=course.findIndex(task=>task.id===current.id);
  const eligible=(task:Task)=>task.id!==current.id&&task.status!=='completed';
  return course.slice(index+1).find(eligible)??course.slice(0,Math.max(index,0)).find(eligible)??null;
}
