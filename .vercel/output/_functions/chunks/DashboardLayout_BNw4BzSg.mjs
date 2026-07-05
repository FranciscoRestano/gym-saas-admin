import { A as unescapeHTML, C as renderSlot, M as createAstro, N as createComponent, O as renderHead, b as renderScript, k as addAttribute, w as renderTemplate } from "./render_DItgDmG4.mjs";
import "./compiler_DO1g-Aol.mjs";
/* empty css                 */
//#region src/layouts/DashboardLayout.astro
createAstro("https://astro.build");
var $$DashboardLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DashboardLayout;
	const { title, currentPath = Astro.url.pathname } = Astro.props;
	const navIcons = {
		inicio: `<path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-5a2 2 0 1 1 4 0v5h4a1 1 0 0 0 1-1v-9" />`,
		clientes: `<path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M3 19v-1c0-2.21 2.686-4 6-4s6 1.79 6 4v1" /><path d="M16 8a2.5 2.5 0 1 0 0-5" /><path d="M19 19v-1c0-1.657-1.79-3-4-3" />`,
		profesores: `<path d="M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 13h18" />`,
		planes: `<path d="m11.5 3.5 7.5 7.5a2 2 0 0 1 0 2.83l-5.67 5.67a2 2 0 0 1-2.83 0l-7.5-7.5A2 2 0 0 1 2 10.67V5a2 2 0 0 1 2-2h6.17a2 2 0 0 1 1.33.5Z" /><path d="M7 8h.01" />`,
		pagos: `<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /><path d="M3 11h18" /><path d="M7 15h4" />`,
		rutinas: `<path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1Z" /><path d="M6 6h12a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" /><path d="M8 11h8" /><path d="M8 14h8" /><path d="M8 17h5" />`,
		ejercicios: `<path d="M14.4 14.4 9.6 9.6" /><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767-1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l1.767 1.767a2 2 0 1 1 2.828 2.829z" /><path d="m21.5 21.5-1.4-1.4" /><path d="M3.9 3.9 2.5 2.5" /><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767 1.768a2 2 0 1 1 2.829 2.828z" />`
	};
	const navItems = [
		{
			label: "Inicio",
			href: "/dashboard",
			icon: "inicio"
		},
		{
			label: "Clientes",
			href: "/dashboard/clientes",
			icon: "clientes"
		},
		{
			label: "Profesores",
			href: "/dashboard/profesores",
			icon: "profesores"
		},
		{
			label: "Planes",
			href: "/dashboard/planes",
			icon: "planes"
		},
		{
			label: "Pagos",
			href: "/dashboard/caja",
			icon: "pagos"
		},
		{
			label: "Rutinas",
			href: "/dashboard/rutinas",
			icon: "rutinas"
		},
		{
			label: "Ejercicios",
			href: "/dashboard/ejercicios",
			icon: "ejercicios"
		}
	];
	function isActiveRoute(href, pathname) {
		if (href === "/dashboard") return pathname === "/dashboard" || pathname === "/dashboard/";
		return pathname === href || pathname.startsWith(`${href}/`);
	}
	const brandMark = `<path d="M4 9v6" /><path d="M20 9v6" /><path d="M7 6v12" /><path d="M17 6v12" /><path d="M7 12h10" />`;
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Panel de administración del gimnasio"><title>${title} · GymManager</title>${renderHead($$result)}</head><body class="bg-zinc-50 text-zinc-900 antialiased"><div class="min-h-screen lg:flex"><!-- Barra superior (solo móvil/tablet) --><header class="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 lg:hidden"><a href="/dashboard" class="flex items-center gap-2 font-semibold text-zinc-900"><span class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">${unescapeHTML(brandMark)}</svg></span>GymManager</a><button id="sidebar-toggle" type="button" aria-label="Abrir menú de navegación" aria-expanded="false" aria-controls="sidebar" class="rounded-md p-2 text-zinc-600 hover:bg-zinc-100"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="h-6 w-6"><path d="M4 6h16M4 12h16M4 18h16"></path></svg></button></header><!-- Fondo oscuro al abrir el menú en móvil --><div id="sidebar-overlay" class="fixed inset-0 z-30 hidden bg-zinc-900/50 lg:hidden" aria-hidden="true"></div><!-- Barra lateral --><aside id="sidebar" class="fixed inset-y-0 left-0 z-40 flex w-72 -translate-x-full flex-col bg-zinc-900 transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-64 lg:translate-x-0"><div class="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 px-6"><span class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">${unescapeHTML(brandMark)}</svg></span><span class="text-lg font-semibold text-white">GymManager</span></div><nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Navegación principal">${navItems.map((item) => {
		const active = isActiveRoute(item.href, currentPath);
		return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(active ? "page" : void 0, "aria-current")}${addAttribute(`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-emerald-500/15 text-emerald-400" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`, "class")}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"${addAttribute(`h-5 w-5 shrink-0 ${active ? "text-emerald-400" : "text-zinc-500 group-hover:text-white"}`, "class")}>${unescapeHTML(navIcons[item.icon])}</svg>${item.label}</a>`;
	})}</nav><div class="border-t border-white/10 px-3 py-4 space-y-1"><a href="/dashboard/configuracion" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 shrink-0 text-zinc-500"><path d="M10.5 4h3l.5 2.2a7 7 0 0 1 1.9 1.1l2.2-.8 1.5 2.6-1.7 1.5a7 7 0 0 1 0 2.2l1.7 1.5-1.5 2.6-2.2-.8a7 7 0 0 1-1.9 1.1L13.5 20h-3l-.5-2.2a7 7 0 0 1-1.9-1.1l-2.2.8-1.5-2.6 1.7-1.5a7 7 0 0 1 0-2.2L4.4 9.7l1.5-2.6 2.2.8a7 7 0 0 1 1.9-1.1Z"></path><circle cx="12" cy="12" r="2.5"></circle></svg>Configuración</a><button id="btn-cerrar-sesion" type="button" class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-red-400 transition-colors"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>Cerrar Sesión</button></div></aside><!-- Contenido principal --><main class="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10"><div class="mx-auto max-w-6xl">${renderSlot($$result, $$slots["default"])}</div></main></div>${renderScript($$result, "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/layouts/DashboardLayout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/layouts/DashboardLayout.astro", void 0);
//#endregion
export { $$DashboardLayout as t };
