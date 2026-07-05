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
    .from('ejercicios')
    .select('id, nombre, grupo_muscular')
    .eq('gimnasio_id', GIMNASIO_ID)
    .order('grupo_muscular', { ascending: true })
    .order('nombre', { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ejercicios: data ?? [] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ cookies, request }) => {
  const supabase = await createAdminClient(cookies);
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json();
  const { nombre, grupo_muscular } = body;

  if (!nombre || !grupo_muscular) {
    return new Response(JSON.stringify({ error: 'Faltan nombre o grupo_muscular' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await supabase
    .from('ejercicios')
    .insert([{ nombre, grupo_muscular, gimnasio_id: GIMNASIO_ID }])
    .select('id, nombre, grupo_muscular')
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ejercicio: data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ cookies, request }) => {
  const supabase = await createAdminClient(cookies);
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Falta el id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { error } = await supabase
    .from('ejercicios')
    .delete()
    .eq('id', id);

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
