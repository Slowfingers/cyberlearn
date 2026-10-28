import {PC_TARGETS,PC_SLOTS,pcRequiredPsu,pcInitialBuild,pcIsCable,pcPart,pcSanitize,type PcBuild,type PcLessonId} from './pcAssembly';

export interface PcWorkshopDraft {version:3;build:PcBuild;graphicsPower:boolean}
export function pcReadDraft(value:unknown):{version:number;build:PcBuild;graphicsPower:boolean}|null{
 if(!value||typeof value!=='object')return null;
 const saved=value as {version?:number;build?:unknown;graphicsPower?:boolean};
 if(![1,2,3].includes(saved.version??0))return null;
 return{version:saved.version!,build:pcSanitize(saved.build),graphicsPower:saved.graphicsPower===true};
}
/** A draft owns its platform and removals; a preference must never overwrite it. */
export function pcRestoreWorkshop(lesson:PcLessonId,value:unknown,initial:PcBuild):PcWorkshopDraft|null{
 const saved=pcReadDraft(value);if(!saved)return null;
 const build={...saved.build};
 if(saved.version===1)for(const slot of PC_TARGETS[lesson])if(pcIsCable(slot))delete build[slot];
 if(saved.version<3){
  const base=pcInitialBuild(lesson,pcPart(build.board)?.id??initial.board);
  for(const slot of PC_SLOTS)if(!PC_TARGETS[lesson].includes(slot)&&!build[slot]&&base[slot])build[slot]=base[slot];
 }
 return{version:3,build:pcSanitize(build),graphicsPower:lesson==='graphics'&&(saved.graphicsPower||saved.version<3&&!!build.gpu&&pcRequiredPsu(build)>850)};
}
