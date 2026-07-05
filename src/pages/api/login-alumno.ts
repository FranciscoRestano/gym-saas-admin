import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const GIMNASIO_ID = '00000000-0000-0000-0000-000000000000';
const isProduction = import.meta.env.PROD;

const COOKIE_FLAGS = `Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${isProduction ? '; Secure' : ''}`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { dni } = await request.json();

    if (!dni) {
      return new Response(JSON.stringify({ error: 'DNI requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: cliente, error } = await supabase
      .from('clientes')
      .select('id')
      .eq('gimnasio_id', GIMNASIO_ID)
      .eq('dni', dni)
      .maybeSingle();

    if (error || !cliente) {
      return new Response(JSON.stringify({ error: 'No se encontró un alumno con ese DNI' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ id: cliente.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `alumno_id=${cliente.id}; ${COOKIE_FLAGS}`,
      },
    });
  } catch (e) {
    console.error('[login-alumno] Error inesperado:', e);
    return new Response(JSON.stringify({ error: 'Error interno', detail: String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
