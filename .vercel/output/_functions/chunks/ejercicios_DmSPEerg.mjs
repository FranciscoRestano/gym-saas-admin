import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as createAdminClient } from "./supabase-admin_joT7KuAE.mjs";
//#region src/pages/api/admin/ejercicios.ts
var ejercicios_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST
});
var GIMNASIO_ID = "00000000-0000-0000-0000-000000000000";
var GET = async ({ cookies }) => {
	const supabase = await createAdminClient(cookies);
	if (!supabase) return new Response(JSON.stringify({ error: "No autenticado" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const { data, error } = await supabase.from("ejercicios").select("id, nombre, grupo_muscular").eq("gimnasio_id", GIMNASIO_ID).order("grupo_muscular", { ascending: true }).order("nombre", { ascending: true });
	if (error) return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({ ejercicios: data ?? [] }), {
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
	const { nombre, grupo_muscular } = await request.json();
	if (!nombre || !grupo_muscular) return new Response(JSON.stringify({ error: "Faltan nombre o grupo_muscular" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const { data, error } = await supabase.from("ejercicios").insert([{
		nombre,
		grupo_muscular,
		gimnasio_id: GIMNASIO_ID
	}]).select("id, nombre, grupo_muscular").single();
	if (error) return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({ ejercicio: data }), {
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
	const { error } = await supabase.from("ejercicios").delete().eq("id", id);
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
//#region \0virtual:astro:page:src/pages/api/admin/ejercicios@_@ts
var page = () => ejercicios_exports;
//#endregion
export { page };
