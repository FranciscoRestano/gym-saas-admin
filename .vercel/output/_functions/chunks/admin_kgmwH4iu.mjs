import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { N as createComponent, O as renderHead, b as renderScript, w as renderTemplate } from "./render_DItgDmG4.mjs";
import "./compiler_DO1g-Aol.mjs";
/* empty css                 */
//#region src/pages/admin.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Admin,
	file: () => $$file,
	url: () => $$url
});
var $$Admin = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin · GymManager</title><link rel="icon" type="image/svg+xml" href="/favicon.svg">${renderHead($$result)}</head><body class="min-h-screen bg-zinc-900 flex items-center justify-center p-4"><div class="w-full max-w-sm space-y-8"><div class="text-center"><div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-600/30"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7 text-white"><path d="M10.5 4h3l.5 2.2a7 7 0 0 1 1.9 1.1l2.2-.8 1.5 2.6-1.7 1.5a7 7 0 0 1 0 2.2l1.7 1.5-1.5 2.6-2.2-.8a7 7 0 0 1-1.9 1.1L13.5 20h-3l-.5-2.2a7 7 0 0 1-1.9-1.1l-2.2.8-1.5-2.6 1.7-1.5a7 7 0 0 1 0-2.2L4.4 9.7l1.5-2.6 2.2.8a7 7 0 0 1 1.9-1.1Z"></path><circle cx="12" cy="12" r="2.5"></circle></svg></div><h1 class="mt-4 text-2xl font-bold tracking-tight text-white">Panel Admin</h1><p class="mt-1 text-sm text-zinc-400">Acceso exclusivo del administrador</p></div><div class="rounded-2xl bg-zinc-800 p-6 shadow-xl ring-1 ring-white/10 space-y-4"><div><label for="admin-email" class="block text-sm font-medium text-zinc-300">Email</label><input id="admin-email" type="email" required autocomplete="email" placeholder="admin@gimnasio.com" class="mt-1 w-full rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"></div><div><label for="admin-password" class="block text-sm font-medium text-zinc-300">Contraseña</label><input id="admin-password" type="password" required autocomplete="current-password" placeholder="••••••••" class="mt-1 w-full rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"></div><p id="admin-error" class="hidden text-sm text-red-400"></p><button id="btn-admin" type="button" class="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500 disabled:opacity-60">Ingresar al Panel</button></div><p class="text-center text-xs text-zinc-500">¿No sos admin? <a href="/login" class="font-medium text-emerald-400 hover:text-emerald-300 hover:underline">Volver al login</a></p></div>${renderScript($$result, "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/pages/admin.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/pages/admin.astro", void 0);
var $$file = "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/pages/admin.astro";
var $$url = "/admin";
//#endregion
//#region \0virtual:astro:page:src/pages/admin@_@astro
var page = () => admin_exports;
//#endregion
export { page };
