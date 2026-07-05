import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as createAdminClient } from "./supabase-admin_joT7KuAE.mjs";
import bcrypt from "bcryptjs";
//#region src/pages/api/admin/profesores.ts
var profesores_exports = /* @__PURE__ */ __exportAll({
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
	const [profesoresRes, clientesRes] = await Promise.all([supabase.from("profesores").select("id, nombre, dni, horario, horas_semanales, pago_por_hora, comision_por_alumno").eq("gimnasio_id", GIMNASIO_ID).order("nombre", { ascending: true }), supabase.from("clientes").select("profesor_id").eq("gimnasio_id", GIMNASIO_ID)]);
	if (profesoresRes.error) return new Response(JSON.stringify({ error: profesoresRes.error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	const alumnosPorProfesor = {};
	(clientesRes.data ?? []).forEach((c) => {
		const pid = c.profesor_id;
		if (pid) alumnosPorProfesor[pid] = (alumnosPorProfesor[pid] ?? 0) + 1;
	});
	return new Response(JSON.stringify({
		profesores: profesoresRes.data ?? [],
		alumnosPorProfesor
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
	const { nombre, dni, password, horario, horas_semanales, pago_por_hora, comision_por_alumno } = await request.json();
	if (!nombre) return new Response(JSON.stringify({ error: "Falta el nombre" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const hashedPassword = password ? bcrypt.hashSync(password, 10) : null;
	const { data, error } = await supabase.from("profesores").insert({
		nombre,
		dni: dni || null,
		password: hashedPassword,
		horario: horario || null,
		horas_semanales: horas_semanales || 0,
		pago_por_hora: pago_por_hora || 0,
		comision_por_alumno: comision_por_alumno || 0,
		gimnasio_id: GIMNASIO_ID
	}).select("id, nombre, dni, horario, horas_semanales, pago_por_hora, comision_por_alumno").single();
	if (error) return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({ profesor: data }), {
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
	const { id, nombre, dni, password, horario, horas_semanales, pago_por_hora, comision_por_alumno } = await request.json();
	if (!id || !nombre) return new Response(JSON.stringify({ error: "Faltan id o nombre" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const updateData = {
		nombre,
		dni: dni || null,
		horario: horario || null,
		horas_semanales: horas_semanales || 0,
		pago_por_hora: pago_por_hora || 0,
		comision_por_alumno: comision_por_alumno || 0
	};
	if (password) updateData.password = bcrypt.hashSync(password, 10);
	const { error } = await supabase.from("profesores").update(updateData).eq("id", id);
	if (error) return new Response(JSON.stringify({ error: error.message }), {
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
	const { error } = await supabase.from("profesores").delete().eq("id", id);
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
//#region \0virtual:astro:page:src/pages/api/admin/profesores@_@ts
var page = () => profesores_exports;
//#endregion
export { page };
