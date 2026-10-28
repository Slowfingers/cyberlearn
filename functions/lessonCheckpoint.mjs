export function lessonVersion(task) {
 const text=JSON.stringify([task.id,task.type,task.description,task.lesson,task.quizData,task.mapConfig,task.typingConfig,task.typingData]);
 let hash=2166136261;for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);
 return `v1_${(hash>>>0).toString(16)}`;
}
export function lessonCheckpoint(user,operation,data,task) {
 if(user.role!=='student')throw new Error('Точка урока доступна ученику');
 if(!task||!/^g3_m1_l[3-7]$/.test(task.id))throw new Error('Урок не входит в пилот');
 const version=lessonVersion(task);
 if(operation==='getLessonCheckpoint') {
  const checkpoint=user.lessonCheckpoints?.[task.id];
  return {checkpoint:checkpoint?.version===version?checkpoint:null,version};
 }
 if(data.version!==version)throw new Error('Урок обновлён. Перезагрузи страницу перед сохранением');
 const state=data.state;
 if(!state||!Number.isInteger(state.phase)||state.phase<0||state.phase>3||!Number.isInteger(state.idea)||state.idea<0||state.idea>20||!Number.isInteger(state.path)||state.path<0||state.path>3||typeof state.typed!=='string'||state.typed.length>200||typeof state.removed!=='boolean'||(state.choice!==null&&!['image','document','sound'].includes(state.choice)))throw new Error('Неверная точка урока');
 const next=structuredClone(user);
 const checkpoint={taskId:task.id,version,mode:'learn',blockId:state.phase===0?'hook':state.phase===1?`explanation_${state.idea}`:state.phase===2?'guided_practice':'practice',state:{phase:state.phase,idea:state.idea,path:state.path,typed:state.typed,removed:state.removed,choice:state.choice},updatedAt:new Date().toISOString()};
 next.lessonCheckpoints={...next.lessonCheckpoints,[task.id]:checkpoint};
 return {user:next,checkpoint};
}

export function practiceDraft(user,operation,data,task) {
 if(user.role!=='student'||!task||!/^g3_m1_l[3-7]$/.test(task.id))throw new Error('Практика не входит в пилот');
 const version=lessonVersion(task);
 const mode=data.mode??'learn';if(!['learn','train','check'].includes(mode))throw new Error('Неверный режим');
 const key=mode==='learn'?task.id:`${task.id}:${mode}`;
 if(operation==='getPracticeDraft'){if(mode==='learn'&&user.completedTaskIds?.includes(task.id))return {draft:null};const draft=user.practiceDrafts?.[key];return {draft:draft?.version===version?draft:null};}
 if(data.version!==version)throw new Error('Материал изменился. Перезагрузи урок');
 const state=data.state;
 if(!state||typeof state.active!=='boolean'||typeof state.typed!=='string'||state.typed.length>2000||(state.option!==null&&(!Number.isInteger(state.option)||state.option<0||state.option>=(task.quizData?.options.length??0))))throw new Error('Неверный черновик');
 const next=structuredClone(user);
 const draft={version,mode,state:{active:state.active,typed:state.typed,option:state.option},updatedAt:new Date().toISOString()};
 next.practiceDrafts={...next.practiceDrafts,[key]:draft};return {user:next,draft};
}
