let state = {};
export const reset = value => { state = structuredClone(value); };
export const snapshot = () => structuredClone(state);
const read = path => path.split('/').filter(Boolean).reduce((value,key) => value?.[key],state) ?? null;
const write = (path,value) => {
  const parts = path.split('/').filter(Boolean);
  if (!parts.length) { state = structuredClone(value); return; }
  let target = state;
  for (const key of parts.slice(0,-1)) target = target[key] ||= {};
  if (value === null) delete target[parts.at(-1)]; else target[parts.at(-1)] = structuredClone(value);
};
class Ref {
 constructor(path,field,value,limit) { Object.assign(this,{path,field,value,limit}); }
 child(key) { return new Ref([this.path,key].join('/')); }
 orderByChild(field) { return new Ref(this.path,field); }
 equalTo(value) { return new Ref(this.path,this.field,value); }
 limitToFirst(limit) { return new Ref(this.path,this.field,this.value,limit); }
 async get() {
   const value = read(this.path);
   const result = this.field ? Object.fromEntries(Object.entries(value || {}).filter(([,row]) => row[this.field] === this.value).slice(0,this.limit || Infinity)) : value;
   return {val:() => structuredClone(result)};
 }
 async set(value) { write(this.path,value); }
 async remove() { write(this.path,null); }
 async update(values) { for (const [key,value] of Object.entries(values)) write([this.path,key].filter(Boolean).join('/'),value); }
 async transaction(callback) {
   // Synchronous, serialized commits model the callback's optimistic retry contract.
   const next = callback(structuredClone(read(this.path)));
   if (next === undefined) return {committed:false,snapshot:await this.get()};
   write(this.path,next); return {committed:true,snapshot:await this.get()};
 }
}
export const initializeApp = () => {};
export const getDatabase = () => ({ref:path => new Ref(path || '')});
export const getAuth = () => ({createCustomToken:async uid => `test:${uid}`,verifyIdToken:async token => { if (token === 'revoked') throw Error('revoked'); return {uid:token}; },revokeRefreshTokens:async () => {}});
export class HttpsError extends Error { constructor(code,message) { super(message); this.code=code; } }
export const onCall = (options,handler) => handler;
