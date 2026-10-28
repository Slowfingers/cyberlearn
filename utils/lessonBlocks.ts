import type { Task } from '../types';
import { lessonVersion } from '../functions/lessonCheckpoint.mjs';
export type LessonBlockKind='hook'|'explanation'|'demonstration'|'practice'|'summary';
/** Transitional adapter preserves task IDs; blocks are not completion or mastery records. */
export function taskLessonBlocks(task:Task) {
 return {lessonId:task.id,version:lessonVersion(task),blocks:[
  {id:'hook',kind:'hook' as LessonBlockKind,text:task.lesson?.goal??task.description},
  ...(task.lesson?.explanation??'').split(/\n\s*\n/).filter(Boolean).map((text,i)=>({id:`explanation_${i}`,kind:'explanation' as LessonBlockKind,text})),
  {id:'example',kind:'demonstration' as LessonBlockKind,text:task.lesson?.example??''},
  {id:'guided_practice',kind:'practice' as LessonBlockKind,text:'Учебная попытка с обратной связью'},
  {id:'practice',kind:'practice' as LessonBlockKind,text:task.lesson?.goal??task.description},
  {id:'summary',kind:'summary' as LessonBlockKind,text:task.lesson?.success??''},
 ]};
}
