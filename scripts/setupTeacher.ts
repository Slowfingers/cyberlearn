import { randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { provisionTeacher } from '../server/localBackend';
const name=process.argv[2] || 'teacher';
const password=randomBytes(18).toString('base64url');
await provisionTeacher(name,password);
mkdirSync('.cyberlearn',{recursive:true,mode:0o700});
writeFileSync('.cyberlearn/teacher-access.txt',`Логин: ${name}\nПароль: ${password}\n`,{mode:0o600});
console.log('Единственный учитель настроен. Данные входа: .cyberlearn/teacher-access.txt');
