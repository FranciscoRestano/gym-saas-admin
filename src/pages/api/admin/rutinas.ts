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

  const [ejerciciosRes, rutinasRes] = await Promise.all([
    supabase
      .from('ejercicios')
      .select('id, nombre, grupo_muscular')
      .eq('gimnasio_id', GIMNASIO_ID)
      .order('grupo_muscular', { ascending: true })
      .order('nombre', { ascending: true }),
    supabase
      .from('rutinas')
      .select('id, nombre, created_at')
      .eq('gimnasio_id', GIMNASIO_ID)
      .order('created_at', { ascending: false }),
  ]);

  if (ejerciciosRes.error) {
    return new Response(JSON.stringify({ error: ejerciciosRes.error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rutinasData = rutinasRes.data ?? [];

  // Get stats for each rutina
  let statsMap: Record<string, { total: number; dias: number[] }> = {};
  if (rutinasData.length > 0) {
    const { data: ejerciciosRutina } = await supabase
      .from('rutina_ejercicio')
      .select('rutina_id, dia');

    for (const er of ejerciciosRutina ?? []) {
      if (!statsMap[er.rutina_id]) {
        statsMap[er.rutina_id] = { total: 0, dias: [] };
      }
      statsMap[er.rutina_id].total++;
      if (!statsMap[er.rutina_id].dias.includes(er.dia)) {
        statsMap[er.rutina_id].dias.push(er.dia);
      }
    }
  }

  return new Response(JSON.stringify({
    ejercicios: ejerciciosRes.data ?? [],
    rutinas: rutinasData,
    statsRutinas: statsMap,
  }), {
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
  const { nombre, ejercicios } = body;

  if (!nombre) {
    return new Response(JSON.stringify({ error: 'Falta el nombre de la rutina' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 1) Create rutina
  const { data: rutinaCreada, error: errorRutina } = await supabase
    .from('rutinas')
    .insert([{ nombre, gimnasio_id: GIMNASIO_ID }])
    .select('id')
    .single();

  if (errorRutina || !rutinaCreada) {
    return new Response(JSON.stringify({ error: errorRutina?.message ?? 'Error creando rutina' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2) Insert ejercicios
  if (ejercicios && ejercicios.length > 0) {
    const ejerciciosInsert = ejercicios.map((ej: {
      ejercicio_id: string;
      dia: number;
      bloque_grupo: string;
      series: number;
      repeticiones: number;
      peso: number;
      descanso: number;
      aclaraciones?: string;
    }) => ({
      rutina_id: rutinaCreada.id,
      ejercicio_id: ej.ejercicio_id,
      dia: ej.dia,
      bloque_grupo: ej.bloque_grupo,
      series: ej.series,
      repeticiones: ej.repeticiones,
      peso: ej.peso,
      descanso: ej.descanso,
      aclaraciones: ej.aclaraciones || null,
    }));

    const { error: errorEjercicios } = await supabase
      .from('rutina_ejercicio')
      .insert(ejerciciosInsert);

    if (errorEjercicios) {
      return new Response(JSON.stringify({ error: errorEjercicios.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ rutina: { id: rutinaCreada.id } }), {
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
  const { rutina_id, nombre, ejercicios } = body;

  if (!rutina_id || !nombre) {
    return new Response(JSON.stringify({ error: 'Faltan rutina_id o nombre' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 1) Update rutina
  const { error: errorUpdate } = await supabase
    .from('rutinas')
    .update({ nombre })
    .eq('id', rutina_id);

  if (errorUpdate) {
    return new Response(JSON.stringify({ error: errorUpdate.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2) Delete old ejercicios
  await supabase.from('rutina_ejercicio').delete().eq('rutina_id', rutina_id);

  // 3) Insert new ejercicios
  if (ejercicios && ejercicios.length > 0) {
    const ejerciciosInsert = ejercicios.map((ej: {
      ejercicio_id: string;
      dia: number;
      bloque_grupo: string;
      series: number;
      repeticiones: number;
      peso: number;
      descanso: number;
      aclaraciones?: string;
    }) => ({
      rutina_id,
      ejercicio_id: ej.ejercicio_id,
      dia: ej.dia,
      bloque_grupo: ej.bloque_grupo,
      series: ej.series,
      repeticiones: ej.repeticiones,
      peso: ej.peso,
      descanso: ej.descanso,
      aclaraciones: ej.aclaraciones || null,
    }));

    const { error: errorEjercicios } = await supabase
      .from('rutina_ejercicio')
      .insert(ejerciciosInsert);

    if (errorEjercicios) {
      return new Response(JSON.stringify({ error: errorEjercicios.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
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

  // Delete ejercicios first
  await supabase.from('rutina_ejercicio').delete().eq('rutina_id', id);

  const { error } = await supabase
    .from('rutinas')
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

// GET single rutina for editing
export const PATCH: APIRoute = async ({ cookies, request }) => {
  const supabase = await createAdminClient(cookies);
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const rutinaId = url.searchParams.get('id');

  if (!rutinaId) {
    return new Response(JSON.stringify({ error: 'Falta el id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const [rutinaRes, ejerciciosRes] = await Promise.all([
    supabase
      .from('rutinas')
      .select('id, nombre')
      .eq('id', rutinaId)
      .single(),
    supabase
      .from('rutina_ejercicio')
      .select('ejercicio_id, dia, bloque_grupo, series, repeticiones, peso, descanso, aclaraciones')
      .eq('rutina_id', rutinaId)
      .order('dia', { ascending: true }),
  ]);

  if (rutinaRes.error || !rutinaRes.data) {
    return new Response(JSON.stringify({ error: 'Rutina no encontrada' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    rutina: rutinaRes.data,
    ejercicios: ejerciciosRes.data ?? [],
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
