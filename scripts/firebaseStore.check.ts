import assert from 'node:assert/strict';
import {generateKeyPairSync} from 'node:crypto';
import {firebaseStore,type CloudSnapshot} from '../server/firebaseStore';
const originalFetch=globalThis.fetch;
const originalAccount=process.env.FIREBASE_SERVICE_ACCOUNT;
const key=generateKeyPairSync('rsa',{modulusLength:2048,privateKeyEncoding:{format:'pem',type:'pkcs8'},publicKeyEncoding:{format:'pem',type:'spki'}});
process.env.FIREBASE_SERVICE_ACCOUNT=JSON.stringify({client_email:'fixture@example.test',private_key:key.privateKey,project_id:'fixture'});
let publicRead=true,conflict=false,stored:any=null;
const snapshot:CloudSnapshot={state:{version:1,users:{},classes:{},tasks:{},credentials:{},folders:[]},sessions:{},loginLimits:{}};
globalThis.fetch=async(input:any,options:any={})=>{
 const url=String(input);
 if(url.endsWith('?shallow=true')) return new Response(publicRead?'null':'{"error":"Permission denied"}',{status:publicRead?200:401});
 if(url==='https://oauth2.googleapis.com/token') {
  assert.equal(options.method,'POST');
  assert.ok(String(options.body).includes('assertion='));
  return Response.json({access_token:'test-token',expires_in:3600});
 }
 assert.equal(options.headers.Authorization,'Bearer test-token');
 if(options.method==='PUT') {
  assert.equal(options.headers['if-match'],'"fixture-etag"');
  if(conflict)return new Response('{}',{status:412});
  stored=JSON.parse(options.body);
  return Response.json(stored);
 }
 assert.equal(options.headers['X-Firebase-ETag'],'true');
 return Response.json(stored,{headers:{etag:'"fixture-etag"'}});
};
try {
 const store=firebaseStore();
 await assert.rejects(store.load(),/открыто для браузера/);
 publicRead=false;
 assert.equal((await store.load()).snapshot,null);
 assert.equal(await store.save(snapshot,'"fixture-etag"'),true);
 assert.deepEqual((await store.load()).snapshot,snapshot,'JSON envelope retains empty arrays and maps');
 conflict=true;assert.equal(await store.save(snapshot,'"fixture-etag"'),false);
 console.log('firebaseStore.check: refuses public storage, signs server OAuth request, uses authenticated ETag writes, detects conflicts, and preserves empty arrays/maps.');
} finally {
 globalThis.fetch=originalFetch;
 if(originalAccount===undefined)delete process.env.FIREBASE_SERVICE_ACCOUNT;else process.env.FIREBASE_SERVICE_ACCOUNT=originalAccount;
}
