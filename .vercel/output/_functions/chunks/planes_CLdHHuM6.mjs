import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as createAdminClient } from "./supabase-admin_joT7KuAE.mjs";
//#region src/pages/api/admin/planes.ts
var planes_exports = /* @__PURE__ */ __exportAll({
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
	const { data, error } = await supabase.from("planes").select("id, nombre, precio").eq("gimnasio_id", GIMNASIO_ID).order("precio", { ascending: true });
	if (error) return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({ planes: data ?? [] }), {
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
	const { nombre, precio } = await request.json();
	if (!nombre || precio == null) return new Response(JSON.stringify({ error: "Faltan nombre o precio" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const { data, error } = await supabase.from("planes").insert([{
		nombre,
		precio,
		gimnasio_id: GIMNASIO_ID
	}]).select("id, nombre, precio").single();
	if (error) return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	return new Response(JSON.stringify({ plan: data }), {
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
	const { id, nombre, precio } = await request.json();
	if (!id) return new Response(JSON.stringify({ error: "Falta el id" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const updateData = {};
	if (nombre != null) updateData.nombre = nombre;
	if (precio != null) updateData.precio = precio;
	const { error } = await supabase.from("planes").update(updateData).eq("id", id).eq("gimnasio_id", GIMNASIO_ID);
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
	const { error } = await supabase.from("planes").delete().eq("id", id).eq("gimnasio_id", GIMNASIO_ID);
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
//#region \0virtual:astro:page:src/pages/api/admin/planes@_@ts
var page = () => planes_exports;
//#endregion
export { page };
