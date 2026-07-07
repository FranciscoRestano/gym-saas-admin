import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as createAdminClient } from "./supabase-admin_joT7KuAE.mjs";
//#region src/pages/api/admin/rutinas.ts
var rutinas_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PATCH: () => PATCH,
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
	const [ejerciciosRes, clientesRes, rutinasRes] = await Promise.all([
		supabase.from("ejercicios").select("id, nombre, grupo_muscular").eq("gimnasio_id", GIMNASIO_ID).order("grupo_muscular", { ascending: true }).order("nombre", { ascending: true }),
		supabase.from("clientes").select("id, nombre").eq("gimnasio_id", GIMNASIO_ID).order("nombre", { ascending: true }),
		supabase.from("rutinas").select("id, nombre, cliente_id, created_at").eq("gimnasio_id", GIMNASIO_ID).order("created_at", { ascending: false })
	]);
	if (ejerciciosRes.error) return new Response(JSON.stringify({ error: ejerciciosRes.error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	const rutinasData = rutinasRes.data ?? [];
	let statsMap = {};
	if (rutinasData.length > 0) {
		const { data: ejerciciosRutina } = await supabase.from("rutina_ejercicio").select("rutina_id, dia");
		for (const er of ejerciciosRutina ?? []) {
			if (!statsMap[er.rutina_id]) statsMap[er.rutina_id] = {
				total: 0,
				dias: []
			};
			statsMap[er.rutina_id].total++;
			if (!statsMap[er.rutina_id].dias.includes(er.dia)) statsMap[er.rutina_id].dias.push(er.dia);
		}
	}
	return new Response(JSON.stringify({
		ejercicios: ejerciciosRes.data ?? [],
		clientes: clientesRes.data ?? [],
		rutinas: rutinasData,
		statsRutinas: statsMap
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
	const { nombre, cliente_id, ejercicios } = await request.json();
	if (!nombre || !cliente_id) return new Response(JSON.stringify({ error: "Faltan nombre o cliente_id" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const { data: rutinaCreada, error: errorRutina } = await supabase.from("rutinas").insert([{
		nombre,
		cliente_id,
		gimnasio_id: GIMNASIO_ID
	}]).select("id").single();
	if (errorRutina || !rutinaCreada) return new Response(JSON.stringify({ error: errorRutina?.message ?? "Error creando rutina" }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	if (ejercicios && ejercicios.length > 0) {
		const ejerciciosInsert = ejercicios.map((ej) => ({
			rutina_id: rutinaCreada.id,
			ejercicio_id: ej.ejercicio_id,
			dia: ej.dia,
			bloque_grupo: ej.bloque_grupo,
			series: ej.series,
			repeticiones: ej.repeticiones,
			peso: ej.peso,
			descanso: ej.descanso,
			aclaraciones: ej.aclaraciones || null
		}));
		const { error: errorEjercicios } = await supabase.from("rutina_ejercicio").insert(ejerciciosInsert);
		if (errorEjercicios) return new Response(JSON.stringify({ error: errorEjercicios.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
	return new Response(JSON.stringify({ rutina: { id: rutinaCreada.id } }), {
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
	const { rutina_id, nombre, cliente_id, ejercicios } = await request.json();
	if (!rutina_id || !nombre || !cliente_id) return new Response(JSON.stringify({ error: "Faltan rutina_id, nombre o cliente_id" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const { error: errorUpdate } = await supabase.from("rutinas").update({
		nombre,
		cliente_id
	}).eq("id", rutina_id);
	if (errorUpdate) return new Response(JSON.stringify({ error: errorUpdate.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	await supabase.from("rutina_ejercicio").delete().eq("rutina_id", rutina_id);
	if (ejercicios && ejercicios.length > 0) {
		const ejerciciosInsert = ejercicios.map((ej) => ({
			rutina_id,
			ejercicio_id: ej.ejercicio_id,
			dia: ej.dia,
			bloque_grupo: ej.bloque_grupo,
			series: ej.series,
			repeticiones: ej.repeticiones,
			peso: ej.peso,
			descanso: ej.descanso,
			aclaraciones: ej.aclaraciones || null
		}));
		const { error: errorEjercicios } = await supabase.from("rutina_ejercicio").insert(ejerciciosInsert);
		if (errorEjercicios) return new Response(JSON.stringify({ error: errorEjercicios.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
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
	await supabase.from("rutina_ejercicio").delete().eq("rutina_id", id);
	const { error } = await supabase.from("rutinas").delete().eq("id", id);
	if (error) return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var PATCH = async ({ cookies, request }) => {
	const supabase = await createAdminClient(cookies);
	if (!supabase) return new Response(JSON.stringify({ error: "No autenticado" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const rutinaId = new URL(request.url).searchParams.get("id");
	if (!rutinaId) return new Response(JSON.stringify({ error: "Falta el id" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const [rutinaRes, ejerciciosRes] = await Promise.all([supabase.from("rutinas").select("id, nombre, cliente_id").eq("id", rutinaId).single(), supabase.from("rutina_ejercicio").select("ejercicio_id, dia, bloque_grupo, series, repeticiones, peso, descanso, aclaraciones").eq("rutina_id", rutinaId).order("dia", { ascending: true })]);
	if (rutinaRes.error || !rutinaRes.data) return new Response(JSON.stringify({ error: "Rutina no encontrada" }), {
		status: 404,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({
		rutina: rutinaRes.data,
		ejercicios: ejerciciosRes.data ?? []
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/rutinas@_@ts
var page = () => rutinas_exports;
//#endregion
export { page };
