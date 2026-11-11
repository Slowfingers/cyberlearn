import cloudApi from '../../api/local.mjs';

// Keep the same server-side authentication and Firebase store used on Vercel.
export default async (request, context) => {
  const headers = new Headers();
  const url = new URL(request.url);
  const body = request.method === 'POST' ? await request.text() : undefined;
  if (body && new TextEncoder().encode(body).byteLength > 250000) {
    return Response.json({error: 'Запрос слишком большой.'}, {status: 413});
  }
  let result = '';
  const response = {
    statusCode: 200,
    setHeader(name, value) { headers.set(name, value); },
    end(value = '') { result = value; },
  };
  await cloudApi({
    method: request.method,
    headers: {
      host: url.host,
      origin: request.headers.get('origin') ?? undefined,
      cookie: request.headers.get('cookie') ?? '',
      'x-forwarded-for': context.ip ?? 'unknown',
    },
    body,
  }, response);
  return new Response(result, {status: response.statusCode, headers});
};

export const config = {path: '/api/local'};
