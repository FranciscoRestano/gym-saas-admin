import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const GIMNASIO_ID = '00000000-0000-0000-0000-000000000000';
const isProduction = import.meta.env.PROD;

const COOKIE_FLAGS = `Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${isProduction ? '; Secure' : ''}`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { dni, password } = await request.json();

    if (!dni || !password) {
      return new Response(JSON.stringify({ error: 'DNI y contraseña requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: profesor, error } = await supabase
      .from('profesores')
      .select('id, password')
      .eq('gimnasio_id', GIMNASIO_ID)
      .eq('dni', dni)
      .maybeSingle();

    if (error || !profesor) {
      return new Response(JSON.stringify({ error: 'DNI o contraseña incorrectos' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const passwordValido = bcrypt.compareSync(password, profesor.password);
    if (!passwordValido) {
      return new Response(JSON.stringify({ error: 'DNI o contraseña incorrectos' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ id: profesor.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `profesor_id=${profesor.id}; ${COOKIE_FLAGS}`,
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Error interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
