import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as createAdminClient } from "./supabase-admin_joT7KuAE.mjs";
//#region src/pages/api/admin/clientes.ts
var clientes_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
var GIMNASIO_ID = "00000000-0000-0000-0000-000000000000";
var GET = async ({ cookies }) => {
	const supabase = await createAdminClient(cookies);
	if (!supabase) return new Response(JSON.stringify({ error: "No autenticado" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const [clientesRes, planesRes, profesoresRes] = await Promise.all([
		supabase.from("clientes").select("id, nombre, dni, telefono, plan_id, profesor_id").eq("gimnasio_id", GIMNASIO_ID).order("nombre", { ascending: true }),
		supabase.from("planes").select("id, nombre, precio").eq("gimnasio_id", GIMNASIO_ID).order("nombre", { ascending: true }),
		supabase.from("profesores").select("id, nombre").eq("gimnasio_id", GIMNASIO_ID).order("nombre", { ascending: true })
	]);
	if (clientesRes.error) return new Response(JSON.stringify({ error: clientesRes.error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	const clientes = clientesRes.data ?? [];
	const idsClientes = clientes.map((c) => c.id);
	let pagosMap = {};
	if (idsClientes.length > 0) {
		const { data: pagos } = await supabase.from("pagos").select("cliente_id, fecha_pago, fecha_vencimiento, monto_pagado").eq("gimnasio_id", GIMNASIO_ID).in("cliente_id", idsClientes).order("fecha_pago", { ascending: false });
		for (const pago of pagos ?? []) if (!pagosMap[pago.cliente_id]) pagosMap[pago.cliente_id] = {
			fecha_pago: pago.fecha_pago,
			fecha_vencimiento: pago.fecha_vencimiento,
			monto_pagado: pago.monto_pagado
		};
	}
	return new Response(JSON.stringify({
		clientes,
		planes: planesRes.data ?? [],
		profesores: profesoresRes.data ?? [],
		pagosMap
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var POST = async ({ cookies, request }) => {
	const supabase = await createAdminClient(cookies);
	if (!supabase) return new Response(JSON.stringify({ error: "No autenticado" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const { nombre, dni, telefono, plan_id, profesor_id, fecha_vencimiento, monto_pagado, metodo_pago } = await request.json();
	if (!nombre || !dni || !plan_id || !profesor_id) return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const { data: clienteCreado, error: errorCliente } = await supabase.from("clientes").insert([{
		nombre,
		dni,
		telefono: telefono || null,
		plan_id,
		profesor_id,
		gimnasio_id: GIMNASIO_ID
	}]).select("id").single();
	if (errorCliente || !clienteCreado) return new Response(JSON.stringify({ error: errorCliente?.message ?? "Error creando cliente" }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	const { error: errorPago } = await supabase.from("pagos").insert([{
		gimnasio_id: GIMNASIO_ID,
		cliente_id: clienteCreado.id,
		plan_id,
		fecha_pago: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		fecha_vencimiento: fecha_vencimiento || null,
		monto_pagado: monto_pagado ?? 0,
		metodo_pago: metodo_pago || "Efectivo"
	}]);
	if (errorPago) {
		await supabase.from("clientes").delete().eq("id", clienteCreado.id);
		return new Response(JSON.stringify({ error: errorPago.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
	return new Response(JSON.stringify({ cliente: { id: clienteCreado.id } }), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var PUT = async ({ cookies, request }) => {
	const supabase = await createAdminClient(cookies);
	if (!supabase) return new Response(JSON.stringify({ error: "No autenticado" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const { cliente_id, nombre, dni, telefono, plan_id, profesor_id, fecha_vencimiento, monto_pagado, metodo_pago } = await request.json();
	if (!cliente_id || !nombre || !dni || !plan_id || !profesor_id) return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const { error: errorUpdate } = await supabase.from("clientes").update({
		nombre,
		dni,
		telefono: telefono || null,
		plan_id,
		profesor_id
	}).eq("id", cliente_id);
	if (errorUpdate) return new Response(JSON.stringify({ error: errorUpdate.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	const { error: errorPago } = await supabase.from("pagos").insert([{
		gimnasio_id: GIMNASIO_ID,
		cliente_id,
		plan_id,
		fecha_pago: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		fecha_vencimiento: fecha_vencimiento || null,
		monto_pagado: monto_pagado ?? 0,
		metodo_pago: metodo_pago || "Efectivo"
	}]);
	if (errorPago) return new Response(JSON.stringify({ error: errorPago.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var DELETE = async ({ cookies, request }) => {
	const supabase = await createAdminClient(cookies);
	if (!supabase) return new Response(JSON.stringify({ error: "No autenticado" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const { id } = await request.json();
	if (!id) return new Response(JSON.stringify({ error: "Falta el id" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const { error } = await supabase.from("clientes").delete().eq("id", id);
	if (error) return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/clientes@_@ts
var page = () => clientes_exports;
//#endregion
export { page };
