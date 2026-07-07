import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/login-admin.ts
var login_admin_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var supabaseUrl = "https://xqzquobypwoqbdqxzfhx.supabase.co";
var supabaseAnonKey = "sb_publishable_uMLZGqwSSQnsSeS5h7yHbA_20mcslhu";
var COOKIE_FLAGS = `Path=/; HttpOnly; SameSite=Lax; Max-Age=86400; Secure`;
var POST = async ({ request }) => {
	try {
		const { email, password } = await request.json();
		if (!email || !password) return new Response(JSON.stringify({ error: "Email y contraseña requeridos" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { data, error } = await createClient(supabaseUrl, supabaseAnonKey).auth.signInWithPassword({
			email,
			password
		});
		if (error || !data.session) return new Response(JSON.stringify({ error: "Credenciales incorrectas" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const session = data.session;
		const cookieValue = JSON.stringify({
			access_token: session.access_token,
			refresh_token: session.refresh_token,
			expires_at: Math.floor(Date.now() / 1e3) + 86400
		});
		return new Response(JSON.stringify({
			ok: true,
			access_token: session.access_token,
			refresh_token: session.refresh_token
		}), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Set-Cookie": `admin_session=${cookieValue}; ${COOKIE_FLAGS}`
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
//#region \0virtual:astro:page:src/pages/api/login-admin@_@ts
var page = () => login_admin_exports;
//#endregion
export { page };
