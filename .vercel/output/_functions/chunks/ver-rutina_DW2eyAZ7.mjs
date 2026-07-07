import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { D as maybeRenderHead, N as createComponent, S as renderComponent, b as renderScript, w as renderTemplate } from "./render_DItgDmG4.mjs";
import "./compiler_DO1g-Aol.mjs";
import { t as $$ProfesorLayout } from "./ProfesorLayout__Udm0JBc.mjs";
//#region src/pages/profesor/ver-rutina.astro
var ver_rutina_exports = /* @__PURE__ */ __exportAll({
	default: () => $$VerRutina,
	file: () => $$file,
	url: () => $$url
});
var $$VerRutina = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "ProfesorLayout", $$ProfesorLayout, {
		"title": "Rutina del Alumno",
		"currentPath": "/profesor/clientes"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<a href="/profesor/clientes" class="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="h-4 w-4"><path d="m15 18-6-6 6-6"></path></svg>Volver a Mis Alumnos</a><div id="alumno-info" class="hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p class="text-sm text-zinc-500">Rutina de</p><p id="alumno-nombre" class="text-lg font-semibold text-zinc-900"></p></div><div id="rutina-error" class="hidden items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 h-5 w-5 shrink-0"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"></path><path d="M12 9v4M12 17h.01"></path></svg><span id="rutina-error-mensaje"></span></div><p id="rutina-cargando" class="px-1 py-10 text-center text-sm text-zinc-500">Cargando rutina…</p><div id="rutina-vacia" class="hidden flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-zinc-200 bg-white px-8 py-16 text-center"><span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7"><path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1Z"></path><path d="M6 6h12a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"></path><path d="M8 11h8"></path><path d="M8 14h8"></path><path d="M8 17h5"></path></svg></span><div class="space-y-1.5"><p class="text-base font-semibold text-zinc-800">Este alumno no tiene rutina asignada</p><p class="max-w-xs text-sm leading-relaxed text-zinc-500">Creá una rutina desde la página de Rutinas.</p></div><a href="/profesor/rutinas" class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700">Crear Rutina</a></div><div id="rutina-contenido" class="hidden space-y-4"><!-- Nombre rutina --><div class="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><h1 id="rutina-nombre" class="text-xl font-bold text-zinc-900"></h1><p id="rutina-meta" class="mt-1 text-sm text-zinc-500"></p></div><!-- Tabs de días --><div class="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"><div id="tabs-dias" class="flex gap-1 rounded-lg bg-zinc-100 p-1"></div></div><!-- Ejercicios del día --><div id="dia-ejercicios" class="space-y-3"></div></div>` })}${renderScript($$result, "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/pages/profesor/ver-rutina.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/pages/profesor/ver-rutina.astro", void 0);
var $$file = "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/pages/profesor/ver-rutina.astro";
var $$url = "/profesor/ver-rutina";
//#endregion
//#region \0virtual:astro:page:src/pages/profesor/ver-rutina@_@astro
var page = () => ver_rutina_exports;
//#endregion
export { page };
