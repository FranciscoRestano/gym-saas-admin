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

  // 1) Pagos
  const { data: pagos, error: pagosError } = await supabase
    .from('pagos')
    .select('cliente_id, plan_id, fecha_pago, monto_pagado, metodo_pago')
    .eq('gimnasio_id', GIMNASIO_ID)
    .order('fecha_pago', { ascending: false });

  if (pagosError) {
    return new Response(JSON.stringify({ error: pagosError.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!pagos || pagos.length === 0) {
    return new Response(JSON.stringify({ pagos: [], clientes: {}, planes: {} }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2) Clientes y planes
  const clienteIds = [...new Set(pagos.map((p) => p.cliente_id).filter(Boolean))];
  const planIds = [...new Set(pagos.map((p) => p.plan_id).filter(Boolean))];

  const [clientesRes, planesRes] = await Promise.all([
    clienteIds.length > 0
      ? supabase.from('clientes').select('id, nombre').in('id', clienteIds)
      : Promise.resolve({ data: [], error: null }),
    planIds.length > 0
      ? supabase.from('planes').select('id, nombre').in('id', planIds)
      : Promise.resolve({ data: [], error: null }),
  ]);

  const clientes: Record<string, string> = {};
  (clientesRes.data ?? []).forEach((c: { id: string; nombre: string }) => { clientes[c.id] = c.nombre; });

  const planes: Record<string, string> = {};
  (planesRes.data ?? []).forEach((p: { id: string; nombre: string }) => { planes[p.id] = p.nombre; });

  return new Response(JSON.stringify({ pagos, clientes, planes }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
