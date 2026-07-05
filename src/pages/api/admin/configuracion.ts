import type { APIRoute } from 'astro';
import { createAdminClient } from '../../../lib/supabase-admin';

const GIMNASIO_ID = '00000000-0000-0000-0000-000000000000';

export const GET: APIRoute = async ({ cookies }) => {
  const supabase = await createAdminClient(cookies);
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await supabase
    .from('gimnasios')
    .select('nombre, direccion, telefono, email')
    .eq('id', GIMNASIO_ID)
    .maybeSingle();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ config: data ?? {} }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const PUT: APIRoute = async ({ cookies, request }) => {
  const supabase = await createAdminClient(cookies);
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json();
  const { nombre, direccion, telefono, email } = body;

  if (!nombre) {
    return new Response(JSON.stringify({ error: 'El nombre es requerido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { error } = await supabase
    .from('gimnasios')
    .update({ nombre, direccion: direccion || null, telefono: telefono || null, email: email || null })
    .eq('id', GIMNASIO_ID);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
