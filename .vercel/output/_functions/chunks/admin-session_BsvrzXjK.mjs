import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/admin-session.ts
var admin_session_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ cookies }) => {
	const sessionCookie = cookies.get("admin_session");
	if (!sessionCookie?.value) return new Response(JSON.stringify({ error: "No hay sesión" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	try {
		const data = JSON.parse(sessionCookie.value);
		return new Response(JSON.stringify({
			access_token: data.access_token,
			refresh_token: data.refresh_token
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch {
		return new Response(JSON.stringify({ error: "Sesión inválida" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin-session@_@ts
var page = () => admin_session_exports;
//#endregion
export { page };
