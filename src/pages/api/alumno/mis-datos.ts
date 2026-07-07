import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const GET: APIRoute = async ({ cookies }) => {
  const alumnoId = cookies.get('alumno_id')?.value;

  if (!alumnoId) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: cliente, error: errorCliente } = await supabase
    .from('clientes')
    .select('id, nombre')
    .eq('id', alumnoId)
    .maybeSingle();

  if (errorCliente || !cliente) {
    return new Response(JSON.stringify({ error: 'Alumno no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data: pagos, error: errorPagos } = await supabase
    .from('pagos')
    .select('id, fecha_pago, fecha_vencimiento, monto_pagado, metodo_pago, plan_id')
    .eq('cliente_id', alumnoId)
    .order('fecha_pago', { ascending: false });

  if (errorPagos) {
    return new Response(JSON.stringify({ error: errorPagos.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data: planesData } = await supabase
    .from('planes')
    .select('id, nombre');

  const mapPlanes = new Map((planesData ?? []).map((p) => [p.id, p.nombre]));

  let diasRestantes: number | null = null;
  let vencimiento: string | null = null;

  if (pagos && pagos.length > 0) {
    const ultimo = pagos[0];
    vencimiento = ultimo.fecha_vencimiento;

    if (vencimiento) {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const fin = new Date(vencimiento + 'T00:00:00');
      const diff = Math.ceil((fin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
      diasRestantes = diff;
    }
  }

  const pagosConPlan = (pagos ?? []).map((p) => ({
    ...p,
    plan_nombre: mapPlanes.get(p.plan_id) ?? '—',
  }));

  return new Response(JSON.stringify({
    nombre: cliente.nombre,
    pagos: pagosConPlan,
    diasRestantes,
    vencimiento,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
