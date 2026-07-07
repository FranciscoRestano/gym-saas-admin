import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as createAdminClient } from "./supabase-admin_joT7KuAE.mjs";
//#region src/pages/api/admin/configuracion.ts
var configuracion_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT
});
var GIMNASIO_ID = "00000000-0000-0000-0000-000000000000";
var GET = async ({ cookies }) => {
	const supabase = await createAdminClient(cookies);
	if (!supabase) return new Response(JSON.stringify({ error: "No autenticado" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const { data, error } = await supabase.from("gimnasios").select("nombre, direccion, telefono, email").eq("id", GIMNASIO_ID).maybeSingle();
	if (error) return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({ config: data ?? {} }), {
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
	const { nombre, direccion, telefono, email } = await request.json();
	if (!nombre) return new Response(JSON.stringify({ error: "El nombre es requerido" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const { error } = await supabase.from("gimnasios").update({
		nombre,
		direccion: direccion || null,
		telefono: telefono || null,
		email: email || null
	}).eq("id", GIMNASIO_ID);
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
//#region \0virtual:astro:page:src/pages/api/admin/configuracion@_@ts
var page = () => configuracion_exports;
//#endregion
export { page };
