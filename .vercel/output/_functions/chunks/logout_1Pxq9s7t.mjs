import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ cookies }) => {
	cookies.delete("profesor_id", { path: "/" });
	cookies.delete("alumno_id", { path: "/" });
	cookies.delete("admin_session", { path: "/" });
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
