import {firebaseStore,readLegacyFirebase} from '../server/firebaseStore';
import {importLegacySchool,legacySummary} from '../server/importLegacySchool';
import {mkdirSync,writeFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
const legacy=await readLegacyFirebase();
const teacherId=process.env.CYBERLEARN_LEGACY_TEACHER_ID;
const summary=legacySummary(legacy,teacherId);
console.log(`Подготовлено: 1 учитель, ${summary.classes.length} классов, ${summary.students.length} учеников. Не относятся к выбранному учителю: ${summary.excludedClasses} классов.`);
if(!process.argv.includes('--apply')) {
 console.log('Только проверка: данные не изменены. Перед --apply сохраните закрытую резервную копию базы и задайте CYBERLEARN_TEACHER_PASSWORD.');
} else {
 const store=firebaseStore();
 const {snapshot,etag}=await store.load();
 if(snapshot)throw Error('Новая структура уже существует. Перенос остановлен, чтобы не перезаписать прогресс.');
 const password=process.env.CYBERLEARN_TEACHER_PASSWORD;
 if(!password)throw Error('Задайте пароль в закрытой переменной CYBERLEARN_TEACHER_PASSWORD.');
 const imported=await importLegacySchool(legacy,process.env.CYBERLEARN_TEACHER_LOGIN ?? 'imyourteacher',password,teacherId);
 const backup=process.env.CYBERLEARN_MIGRATION_BACKUP;
 if(!backup)throw Error('Укажите новый приватный резервный файл в CYBERLEARN_MIGRATION_BACKUP.');
 mkdirSync(dirname(resolve(backup)),{recursive:true,mode:0o700});
 writeFileSync(resolve(backup),JSON.stringify(legacy),{mode:0o600,flag:'wx'});
 if(!await store.save(imported,etag))throw Error('Во время переноса новая структура изменилась. Запись отменена.');
 console.log('Перенос завершён. Старые разделы сохранены; новые пароли и сессии защищены сервером.');
}
