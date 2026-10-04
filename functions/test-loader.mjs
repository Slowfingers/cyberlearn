export async function resolve(specifier,context,next) {
  if (['firebase-admin/app','firebase-admin/database','firebase-admin/auth','firebase-functions/v2/https'].includes(specifier)) return {url:new URL('./test-runtime.mjs',import.meta.url).href,shortCircuit:true};
  return next(specifier,context);
}
