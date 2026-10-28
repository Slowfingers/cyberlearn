import assert from 'node:assert/strict';
import {CITY_PLAZA_PATH,cityPathForCount,cityPointOnMap,cityLegForTask} from '../utils/campaignGeometry';
assert.equal(CITY_PLAZA_PATH.length,10);
for(const width of [900,1048,1500]){
 const height=width/1.5;
 const mapped=CITY_PLAZA_PATH.map(p=>cityPointOnMap(p,width,height));
 for(const p of mapped){assert.ok(p.x>20&&p.x<85);assert.ok(p.y>8&&p.y<95);}
 assert.ok(Math.max(...mapped.map(p=>p.x))-Math.min(...mapped.map(p=>p.x))>40,'route spans city width');
 assert.ok(Math.max(...mapped.map(p=>p.y))-Math.min(...mapped.map(p=>p.y))>50,'route spans city depth');
 for(let i=0;i<mapped.length;i++)for(let j=i+1;j<mapped.length;j++)assert.ok(Math.hypot((mapped[i].x-mapped[j].x)*width/100,(mapped[i].y-mapped[j].y)*height/100)>=65,'markers remain separated');
}
assert.deepEqual([0,9,10,29].map(cityLegForTask),[0,0,1,2]);
assert.equal(cityPathForCount(5).length,5);
assert.deepEqual(cityPathForCount(5).at(-1),CITY_PLAZA_PATH.at(-1),'short districts use whole city');
console.log('campaignGeometry: ten-stop promenade spans whole city, short routes spread out and markers remain separated');

const {courseDistrictLayout,courseDistrictRoutes}=await import('../utils/campaignGeometry');
for(const count of [0,1,3,7,8,9,10,14,21]){
 const layout=courseDistrictLayout(count);assert.equal(layout.districts.length,count,'one separate area per actual module');assert.equal(new Set(layout.districts.map(p=>`${p.sector}:${p.slot}`)).size,count);
 const routes=courseDistrictRoutes(count);assert.equal(routes.length,Math.max(0,count-1),'every consecutive module has a connection');
 for(const r of routes){assert.equal(r.to,r.from+1);const numbers=r.path.match(/-?\d+(?:\.\d+)?/g).map(Number),from=layout.districts[r.from],to=layout.districts[r.to],offset=r.transit?0:r.sector*1536;assert.deepEqual(numbers.slice(0,2),[from.rawX-offset,from.rawY]);assert.deepEqual(numbers.slice(-2),[to.rawX-offset,to.rawY]);}
 for(const p of layout.districts){assert.ok(p.x>0&&p.x<100&&p.y>0&&p.y<100);assert.ok(p.left>=0&&p.left+p.width<=layout.width);assert.ok(p.top>=0&&p.top+p.height<=1024);}
 for(let i=0;i<count;i++)for(let j=i+1;j<count;j++){const a=layout.districts[i],b=layout.districts[j];assert.ok(a.left+a.width<=b.left||b.left+b.width<=a.left||a.top+a.height<=b.top||b.top+b.height<=a.top,'district territories do not overlap');}
}
assert.equal(courseDistrictLayout(14).sectors,2,'large courses extend the city without hiding modules');
console.log('course districts: dynamic 1–21 module areas, unique non-overlapping territories, 14-module courses fully represented');
