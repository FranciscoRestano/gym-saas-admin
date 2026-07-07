import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as createAdminClient } from "./supabase-admin_joT7KuAE.mjs";
//#region src/pages/api/admin/caja.ts
var caja_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GIMNASIO_ID = "00000000-0000-0000-0000-000000000000";
var GET = async ({ cookies }) => {
	const supabase = await createAdminClient(cookies);
	if (!supabase) return new Response(JSON.stringify({ error: "No autenticado" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const { data: pagos, error: pagosError } = await supabase.from("pagos").select("cliente_id, plan_id, fecha_pago, monto_pagado, metodo_pago").eq("gimnasio_id", GIMNASIO_ID).order("fecha_pago", { ascending: false });
	if (pagosError) return new Response(JSON.stringify({ error: pagosError.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	if (!pagos || pagos.length === 0) return new Response(JSON.stringify({
		pagos: [],
		clientes: {},
		planes: {}
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
	const clienteIds = [...new Set(pagos.map((p) => p.cliente_id).filter(Boolean))];
	const planIds = [...new Set(pagos.map((p) => p.plan_id).filter(Boolean))];
	const [clientesRes, planesRes] = await Promise.all([clienteIds.length > 0 ? supabase.from("clientes").select("id, nombre").in("id", clienteIds) : Promise.resolve({
		data: [],
		error: null
	}), planIds.length > 0 ? supabase.from("planes").select("id, nombre").in("id", planIds) : Promise.resolve({
		data: [],
		error: null
	})]);
	const clientes = {};
	(clientesRes.data ?? []).forEach((c) => {
		clientes[c.id] = c.nombre;
	});
	const planes = {};
	(planesRes.data ?? []).forEach((p) => {
		planes[p.id] = p.nombre;
	});
	return new Response(JSON.stringify({
		pagos,
		clientes,
		planes
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/caja@_@ts
var page = () => caja_exports;
//#endregion
export { page };
