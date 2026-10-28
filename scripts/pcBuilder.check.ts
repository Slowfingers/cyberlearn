import assert from 'node:assert/strict';
import {PC_DEFAULTS,PC_LESSON_IDS,PC_PARTS,PC_SLOTS,PC_TARGETS,pcBootChecks,pcInitialBuild,pcInstall,pcLessonChecks,pcRemove,pcSanitize} from '../utils/pcAssembly';
import {PC_TASKS} from '../curriculum/pcBuilder';
assert.equal(PC_TASKS.length,6);assert.equal(new Set(PC_PARTS.map(p=>p.id)).size,PC_PARTS.length);
assert.ok(pcInstall({},'cpu_am5').error);assert.ok(pcInstall({board:'board_atx'},'cpu_lga').error?.includes('сокет'));assert.ok(pcInstall({board:'board_atx'},'ram_ddr4').error?.includes('DDR5'));
assert.ok(pcInstall({board:'board_atx',cpu:'cpu_am5'},'cooler_am5').error?.includes('Термопаста'));
assert.ok(pcInstall({},'unknown').error);assert.ok(pcInstall(PC_DEFAULTS,'cpu_am5').error);assert.ok(pcInstall(PC_DEFAULTS,'paste_dot').error);
for(const lesson of PC_LESSON_IDS){let build=pcInitialBuild(lesson);assert.deepEqual(pcSanitize(build),build,`${lesson} preinstalled state valid`);assert.ok(pcLessonChecks(lesson,build).some(c=>!c.passed));for(const slot of PC_TARGETS[lesson]){const result=pcInstall(build,PC_DEFAULTS[slot]!);assert.equal(result.error,undefined,`${lesson}/${slot} order is possible`);build=result.build;}assert.ok(pcLessonChecks(lesson,build).every(c=>c.passed));if(lesson==='build')assert.ok(pcBootChecks(build).every(c=>c.passed));}
assert.equal(pcBootChecks({...PC_DEFAULTS,psu:'psu_300'}).find(c=>c.label.includes('Мощность'))?.passed,false);
for(const slot of PC_SLOTS){const b={...PC_DEFAULTS};delete b[slot];assert.ok(pcBootChecks(b).some(c=>!c.passed),`${slot} omission blocks startup`);}
const noCpu=pcRemove(PC_DEFAULTS,'cpu');assert.equal(noCpu.paste,undefined);assert.equal(noCpu.cooler,undefined);assert.equal(noCpu.ram,'ram_ddr5');
const noPsu=pcRemove(PC_DEFAULTS,'psu');for(const s of['atx','eps','pcie'])assert.equal(noPsu[s],undefined);assert.equal(noPsu.gpu,'gpu_nova');
assert.deepEqual(pcRemove(PC_DEFAULTS,'board'),{psu:'psu_650'});
assert.deepEqual(pcSanitize({cpu:'cpu_lga',ram:'ram_ddr4',evil:'x',gpu:'cpu_am5',paste:'paste_dot'}),{});
assert.deepEqual(pcSanitize(null),{});
console.log('PC constructor: six solvable lessons, all compatibility/order constraints, all 13 missing-part diagnostics, cascade removal, weak PSU and draft validation OK');

const {pcPlace,pcConnect,PC_CABLES,PC_MOUNTS}=await import('../utils/pcAssembly');
assert.ok(pcPlace({board:'board_atx'},'cpu_am5','dimm').error?.includes('Процессор'));
assert.ok(pcPlace({board:'board_atx'},'ssd_nvme','pcie_x16').error?.includes('M.2'));
assert.ok(pcPlace(PC_DEFAULTS,'eps_8','socket_am5').error?.includes('два конца'));
for(const [slot,pair]of Object.entries(PC_CABLES)){
 const build={...PC_DEFAULTS};delete build[slot as keyof typeof build];
 const id=PC_DEFAULTS[slot as keyof typeof PC_DEFAULTS]!;
 assert.equal(pcConnect(build,id,pair.source,pair.target).error,undefined,`${slot}: exact connectors`);
 assert.equal(pcConnect(build,id,pair.target,pair.source).error,undefined,`${slot}: either cable end first`);
 assert.ok(pcConnect(build,id,pair.source,pair.source).error,`${slot}: cannot connect to itself`);
 assert.ok(pcConnect(build,id,pair.source,'not-a-port').error,`${slot}: cannot use invented terminal`);
}
assert.ok(pcConnect({...PC_DEFAULTS,eps:undefined},'eps_8','psu_pcie','board_eps').error?.includes('EPS'));
assert.ok(pcConnect({},'atx_24','psu_atx','board_atx').error?.includes('устройство'));
for(const lesson of PC_LESSON_IDS){let build=pcInitialBuild(lesson);for(const slot of PC_TARGETS[lesson]){
 const id=PC_DEFAULTS[slot]!;const pair=PC_CABLES[slot as keyof typeof PC_CABLES];
 const result=pair?pcConnect(build,id,pair.source,pair.target):pcPlace(build,id,PC_MOUNTS.find(m=>(m.slots as readonly string[]).includes(slot))!.id);
 assert.equal(result.error,undefined,`${lesson}: solve with explicit places and terminal pairs`);build=result.build;
}assert.ok(pcLessonChecks(lesson,build).every(c=>c.passed));}
console.log('PC v2: explicit installation places, both cable ends, reverse order, wrong EPS/PCIe, unknown terminals and six complete manual assemblies OK');

assert.ok(PC_PARTS.length>=68);
const buildVariant=(board:string,cpu:string,ram:string,gpu:string,psu='psu_850',cooler='cooler_dual')=>({...PC_DEFAULTS,board,cpu,ram,gpu,psu,cooler,pcie:gpu==='gpu_3080'?'pcie_12':'pcie_8'});
for(const [board,cpu,ram]of[['board_atx','cpu_nova12','ram_ddr5_64'],['board_am4','cpu_atlas8','ram_ddr4_32'],['board_lga_ddr4','cpu_lga','ram_ddr4'],['board_lga_ddr5','cpu_vector6','ram_ddr5_32']]){
 const build=buildVariant(board,cpu,ram,'gpu_3080');assert.ok(pcBootChecks(build).every(c=>c.passed),`valid alternate platform ${board}`);assert.ok(pcLessonChecks('build',build).every(c=>c.passed));assert.deepEqual(pcSanitize(build),build);
}
assert.ok(pcInstall({board:'board_lga_ddr4'},'cpu_lga').build.cpu==='cpu_lga','old distractor CPU now works on its matching board');
assert.ok(pcInstall({board:'board_am4'},'ram_ddr4').build.ram==='ram_ddr4');
assert.ok(pcInstall({board:'board_am4'},'cpu_am5').error?.includes('Несовместимый сокет'));
assert.ok(pcInstall({board:'board_lga_ddr5'},'ram_ddr4').error?.includes('Несовместимая память'));
assert.ok(pcBootChecks(buildVariant('board_atx','cpu_nova12','ram_ddr5','gpu_nova','psu_650','cooler_low')).some(c=>!c.passed&&c.label.includes('Охлаждение')));
assert.ok(pcBootChecks(buildVariant('board_am4','cpu_atlas4','ram_ddr4','gpu_compact','psu_450')).every(c=>c.passed),'low power build accepts 450W');
assert.ok(pcBootChecks(buildVariant('board_atx','cpu_am5','ram_ddr5','gpu_3080','psu_650')).some(c=>!c.passed&&c.label.includes('Мощность')));
assert.ok(pcConnect({...PC_DEFAULTS,gpu:'gpu_3080',pcie:undefined},'pcie_8','psu_pcie','gpu_power').error?.includes('12-pin'));
assert.equal(pcConnect({...PC_DEFAULTS,gpu:'gpu_3080',pcie:undefined},'pcie_12','gpu_power','psu_pcie').error,undefined);
assert.ok(!pcRemove(buildVariant('board_am4','cpu_atlas6','ram_ddr4','gpu_nova'),'board').cpu);
for(const part of PC_PARTS){assert.ok(part.detail.length>40,part.id);assert.ok(part.spec,part.id);assert.ok(part.color.startsWith('#'),part.id);}
console.log('PC expanded catalog: alternate parts, 4 alternate valid platforms, conditional socket/RAM/cooling/power checks, PSU sizing and 12-pin adapter OK');

const {pcRequiredPsu,pcPowerEstimate,pcBalanceChecks,pcRamSlots}=await import('../utils/pcAssembly');
const weak5080={...PC_DEFAULTS,board:'board_h610',cpu:'cpu_i3_12100f',ram:'ram_ddr4_32',gpu:'gpu_5080',psu:'psu_850_atx3',pcie:'pcie_16'};
assert.ok(pcBootChecks(weak5080).every(c=>c.passed),'H610 and i3 can physically run a modern PCIe GPU with adequate power');
assert.ok(pcBalanceChecks(weak5080).some(c=>!c.passed&&c.slot==='cpu'),'working does not mean balanced');
assert.equal(pcRequiredPsu(weak5080),850);
assert.ok(pcBootChecks({...weak5080,psu:'psu_650'}).some(c=>!c.passed&&c.label.includes('Мощность')));
assert.ok(pcInstall({...weak5080,pcie:undefined,psu:'psu_850'},'pcie_16').error?.includes('12V-2x6'));
assert.equal(pcInstall({...weak5080,pcie:undefined,psu:'psu_850'},'pcie_16_adapter').error,undefined);
assert.ok(pcInstall({...weak5080,pcie:undefined,psu:'psu_650'},'pcie_16_adapter').error?.includes('выходов'));
assert.ok(pcInstall({...weak5080,pcie:undefined},'pcie_12').error?.includes('16-pin'));
const balanced5080={...weak5080,board:'board_b760_d4',cpu:'cpu_vector10'};
assert.ok(pcBootChecks(balanced5080).every(c=>c.passed));assert.ok(pcBalanceChecks(balanced5080).every(c=>c.passed));
assert.ok(pcBalanceChecks({...balanced5080,ram:'ram_ddr4'}).some(c=>!c.passed&&c.slot==='ram'));
assert.ok(pcBalanceChecks({...balanced5080,board:'board_h610'}).some(c=>!c.passed&&c.slot==='board'));
assert.ok(pcPowerEstimate({...balanced5080,cpu:'cpu_vector16'})>pcPowerEstimate(balanced5080));
assert.ok(pcRequiredPsu({...balanced5080,gpu:'gpu_render24'})>=1000);
assert.ok(pcInstall({board:'board_atx'},'gpu_long').error?.includes('360 мм'));
assert.ok(pcInstall({board:'board_atx',cpu:'cpu_am5',paste:'paste_dot'},'cooler_tall').error?.includes('165 мм'));
assert.ok(pcInstall({board:'board_am5_compact'},'ram_ddr5_128').error?.includes('64 ГБ'));
assert.equal(pcRamSlots(weak5080),'A1 / B1');assert.equal(pcRamSlots(PC_DEFAULTS),'A2 / B2');
for(const board of ['board_atx','board_am4','board_h610','board_b760_d5'])for(const lesson of PC_LESSON_IDS){const build=pcInitialBuild(lesson,board);assert.deepEqual(pcSanitize(build),build,`${lesson}/${board}: valid preinstalled platform`);}
console.log(`PC workstation: ${PC_PARTS.length} parts; modern 16-pin/legacy adapters, PSU peaks, case clearance, RAM limits, selectable lesson platforms and balance vs POST verified`);

const {pcLessonTargets}=await import('../utils/pcAssembly');
const upgradedGraphics={...pcInitialBuild('graphics'),gpu:'gpu_render24'};
assert.equal(pcLessonTargets('graphics',pcInitialBuild('graphics')).length,3,'ordinary graphics lesson stays focused');
assert.equal(pcLessonTargets('graphics',upgradedGraphics).length,6,'a power hungry GPU adds PSU and reconnecting steps');
assert.ok(pcLessonChecks('graphics',upgradedGraphics).some(c=>!c.passed&&c.label.includes('Мощность')));
let repaired=pcPlace(upgradedGraphics,'psu_1000_atx3','psu_bay').build;
assert.equal(repaired.atx,undefined);assert.equal(repaired.eps,undefined);
for(const id of ['atx_24','eps_8','pcie_16','display_dp']){const p=PC_PARTS.find(p=>p.id===id)!,pair=PC_CABLES[p.slot as keyof typeof PC_CABLES];const result=pcConnect(repaired,id,pair.source,pair.target);assert.equal(result.error,undefined);repaired=result.build;}
assert.ok(pcLessonChecks('graphics',repaired).every(c=>c.passed));
assert.ok(pcPowerEstimate({...balanced5080,ram:'ram_ddr4_64'})>pcPowerEstimate({...balanced5080,ram:'ram_ddr4'}));
console.log('PC GPU upgrades: replacement PSU, detached ATX/EPS, all manual reconnections and expanded graphics lesson verified');

// Real student choices survive transitions and draft restoration.
const {pcRestoreWorkshop}=await import('../utils/pcWorkshopDraft');
const custom={...PC_DEFAULTS,board:'board_am4',cpu:'cpu_atlas8',cooler:'cooler_dual',ram:'ram_ddr4_32',psu:'psu_750'};
for(const lesson of ['cpu','memory','power','graphics'] as const){
 const base=pcInitialBuild(lesson,'board_atx',custom);
 assert.equal(base.board,'board_am4',`${lesson}: carry chosen board rather than preference`);
 for(const slot of PC_TARGETS[lesson])assert.equal(base[slot],undefined,`${lesson}: no target is preinstalled`);
 if(lesson!=='cpu'){assert.equal(base.cpu,custom.cpu);assert.equal(base.cooler,custom.cooler);}
 if(lesson==='power'||lesson==='graphics')assert.equal(base.ram,custom.ram);
 if(lesson==='graphics')assert.equal(base.psu,custom.psu);
}
const partialMemory={board:'board_am4',cpu:'cpu_atlas8',paste:'paste_dot',cooler:'cooler_dual',ram:'ram_ddr4_32'};
assert.deepEqual(pcRestoreWorkshop('memory',{version:2,build:partialMemory},pcInitialBuild('memory'))?.build,partialMemory,'legacy draft keeps its AM4 platform even if preference is AM5');
const removed=pcRemove(custom,'cpu');
assert.deepEqual(pcRestoreWorkshop('build',{version:3,build:removed},pcInitialBuild('build'))?.build,removed,'reload must not resurrect parts deliberately removed');
assert.equal(pcRestoreWorkshop('graphics',{version:3,build:{...custom,gpu:undefined,pcie:undefined,display:undefined},graphicsPower:true},pcInitialBuild('graphics'))?.graphicsPower,true);
assert.equal(pcRestoreWorkshop('case',{version:900,build:custom},{}),null);
assert.equal(pcLessonTargets('graphics',{...pcInitialBuild('graphics'),psu:'psu_650'}).length,3,'a sufficient 650W PSU must not trigger replacement just because its ID differs');
assert.equal(pcLessonTargets('graphics',{...pcInitialBuild('graphics'),psu:'psu_1000'}).length,3);
assert.equal(pcLessonTargets('graphics',repaired,true).length,6,'repair steps remain visible after the power issue is fixed');
console.log('PC audit: custom-part handoff, independent saved platforms, deliberate removals, legacy drafts and actual PSU needs verified');
assert.equal(pcRestoreWorkshop('graphics',{version:2,build:{...pcInitialBuild('graphics'),psu:'psu_650'}},pcInitialBuild('graphics'))?.graphicsPower,false,'legacy graphics drafts also use actual PSU needs, never a part-ID comparison');
