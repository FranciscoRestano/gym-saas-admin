import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies }) => {
  const sessionCookie = cookies.get('admin_session');

  if (!sessionCookie?.value) {
    return new Response(JSON.stringify({ error: 'No hay sesión' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = JSON.parse(sessionCookie.value);
    return new Response(JSON.stringify({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Sesión inválida' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
