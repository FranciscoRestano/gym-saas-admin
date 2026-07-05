import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/login-alumno.ts
var login_alumno_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var supabaseUrl = "https://xqzquobypwoqbdqxzfhx.supabase.co";
var supabaseAnonKey = "sb_publishable_uMLZGqwSSQnsSeS5h7yHbA_20mcslhu";
var GIMNASIO_ID = "00000000-0000-0000-0000-000000000000";
var COOKIE_FLAGS = `Path=/; HttpOnly; SameSite=Lax; Max-Age=86400; Secure`;
var POST = async ({ request }) => {
	try {
		const { dni } = await request.json();
		if (!dni) return new Response(JSON.stringify({ error: "DNI requerido" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { data: cliente, error } = await createClient(supabaseUrl, supabaseAnonKey).from("clientes").select("id").eq("gimnasio_id", GIMNASIO_ID).eq("dni", dni).maybeSingle();
		if (error || !cliente) return new Response(JSON.stringify({ error: "No se encontró un alumno con ese DNI" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({ id: cliente.id }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Set-Cookie": `alumno_id=${cliente.id}; ${COOKIE_FLAGS}`
			}
		});
	} catch {
		return new Response(JSON.stringify({ error: "Error interno" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/login-alumno@_@ts
var page = () => login_alumno_exports;
//#endregion
export { page };
