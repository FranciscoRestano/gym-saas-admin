import { I as sequence, K as defineMiddleware } from "./chunks/render_DItgDmG4.mjs";
//#region src/middleware.ts
var RUTAS_PROFESOR = [
	"/profesor/clientes",
	"/profesor/rutinas",
	"/profesor/ejercicios",
	"/profesor/ver-rutina"
];
var RUTAS_ALUMNO = ["/alumno/mi-rutina"];
var RUTAS_ADMIN = ["/dashboard"];
var RUTAS_PUBLICAS = [
	"/admin",
	"/login",
	"/"
];
function hasValidAdminSession(cookieValue) {
	if (!cookieValue) return false;
	try {
		const data = JSON.parse(cookieValue);
		if (!data?.expires_at) return false;
		return data.expires_at > Math.floor(Date.now() / 1e3);
	} catch {
		return false;
	}
}
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(defineMiddleware(async (context, next) => {
	const pathname = context.url.pathname;
	if (pathname.startsWith("/api/")) return next();
	if (RUTAS_PUBLICAS.includes(pathname)) return next();
	if (RUTAS_ADMIN.some((r) => pathname.startsWith(r))) {
		if (!hasValidAdminSession(context.cookies.get("admin_session")?.value)) return context.redirect("/admin");
		return next();
	}
	if (RUTAS_PROFESOR.some((r) => pathname.startsWith(r))) {
		if (!context.cookies.get("profesor_id")) return context.redirect("/login");
		return next();
	}
	if (RUTAS_ALUMNO.some((r) => pathname.startsWith(r))) {
		if (!context.cookies.get("alumno_id")) return context.redirect("/login");
		return next();
	}
	return context.redirect("/login");
}));
//#endregion
export { onRequest };
