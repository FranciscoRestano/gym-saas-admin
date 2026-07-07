import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as createAdminClient } from "./supabase-admin_joT7KuAE.mjs";
//#region src/pages/api/admin/dashboard.ts
var dashboard_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GIMNASIO_ID = "00000000-0000-0000-0000-000000000000";
var GET = async ({ cookies }) => {
	const supabase = await createAdminClient(cookies);
	if (!supabase) return new Response(JSON.stringify({ error: "No autenticado" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const hoy = /* @__PURE__ */ new Date();
	const mesActual = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`.slice(0, 7);
	const [anioStr, mesStr] = mesActual.split("-");
	const anio = Number(anioStr);
	const mes = Number(mesStr);
	const primerDiaMesActual = `${mesActual}-01`;
	const primerDiaMesSiguiente = mes === 12 ? `${anio + 1}-01-01` : `${anio}-${String(mes + 1).padStart(2, "0")}-01`;
	const [clientesRes, pagosMesRes, planesRes, pagosAllRes, profesoresRes] = await Promise.all([
		supabase.from("clientes").select("id, nombre, dni, plan_id, profesor_id").eq("gimnasio_id", GIMNASIO_ID),
		supabase.from("pagos").select("monto_pagado").eq("gimnasio_id", GIMNASIO_ID).gte("fecha_pago", primerDiaMesActual).lt("fecha_pago", primerDiaMesSiguiente),
		supabase.from("planes").select("id, nombre, precio").eq("gimnasio_id", GIMNASIO_ID),
		supabase.from("pagos").select("cliente_id, fecha_pago, fecha_vencimiento, monto_pagado").eq("gimnasio_id", GIMNASIO_ID).order("fecha_pago", { ascending: false }),
		supabase.from("profesores").select("id, nombre, horas_semanales, pago_por_hora, comision_por_alumno").eq("gimnasio_id", GIMNASIO_ID)
	]);
	const errors = [
		clientesRes,
		pagosMesRes,
		planesRes,
		pagosAllRes,
		profesoresRes
	].map((r) => r.error).filter(Boolean);
	if (errors.length > 0) return new Response(JSON.stringify({ error: errors.map((e) => e.message).join("; ") }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({
		clientes: clientesRes.data ?? [],
		pagosMes: pagosMesRes.data ?? [],
		planes: planesRes.data ?? [],
		pagosAll: pagosAllRes.data ?? [],
		profesores: profesoresRes.data ?? []
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/dashboard@_@ts
var page = () => dashboard_exports;
//#endregion
export { page };
