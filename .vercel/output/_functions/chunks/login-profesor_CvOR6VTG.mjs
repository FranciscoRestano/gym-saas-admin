import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
//#region src/pages/api/login-profesor.ts
var login_profesor_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var supabaseUrl = "https://xqzquobypwoqbdqxzfhx.supabase.co";
var supabaseAnonKey = "sb_publishable_uMLZGqwSSQnsSeS5h7yHbA_20mcslhu";
var GIMNASIO_ID = "00000000-0000-0000-0000-000000000000";
var COOKIE_FLAGS = `Path=/; HttpOnly; SameSite=Lax; Max-Age=86400; Secure`;
var POST = async ({ request }) => {
	try {
		const { dni, password } = await request.json();
		if (!dni || !password) return new Response(JSON.stringify({ error: "DNI y contraseña requeridos" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { data: profesor, error } = await createClient(supabaseUrl, supabaseAnonKey).from("profesores").select("id, password").eq("gimnasio_id", GIMNASIO_ID).eq("dni", dni).maybeSingle();
		if (error || !profesor) return new Response(JSON.stringify({ error: "DNI o contraseña incorrectos" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		if (!bcrypt.compareSync(password, profesor.password)) return new Response(JSON.stringify({ error: "DNI o contraseña incorrectos" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({ id: profesor.id }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Set-Cookie": `profesor_id=${profesor.id}; ${COOKIE_FLAGS}`
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
//#region \0virtual:astro:page:src/pages/api/login-profesor@_@ts
var page = () => login_profesor_exports;
//#endregion
export { page };
