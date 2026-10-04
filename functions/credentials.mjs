import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
export const normalizeName = name => name.normalize('NFKC').trim().toLocaleLowerCase('ru');
export const hashKey = value => createHash('sha256').update(value).digest('hex');
export const credentialKey = (role,name,classId = '') => hashKey(`${role}:${classId}:${normalizeName(name)}`);
export const hashPassword = password => { const salt = randomBytes(16).toString('hex'); return {salt,hash:scryptSync(password,salt,64).toString('hex')}; };
export const verifyPassword = (password,credential) => {
  if (typeof credential?.salt !== 'string' || !/^[a-f0-9]{128}$/.test(credential?.hash || '')) return false;
  return timingSafeEqual(scryptSync(password,credential.salt,64),Buffer.from(credential.hash,'hex'));
};
