import { D as maybeRenderHead, M as createAstro, N as createComponent, k as addAttribute, w as renderTemplate } from "./render_DItgDmG4.mjs";
import "./compiler_DO1g-Aol.mjs";
//#region src/components/Paginacion.astro
createAstro("https://astro.build");
var $$Paginacion = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Paginacion;
	const { id } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<nav${addAttribute(id, "id")} class="flex items-center justify-between border-t border-zinc-200 bg-white px-4 py-3 sm:px-6" aria-label="Paginación"><div class="hidden sm:block"><p${addAttribute(`${id}-info`, "id")} class="text-sm text-zinc-700"></p></div><div class="flex flex-1 justify-between gap-2 sm:justify-end"><button type="button" data-page-btn="prev" class="relative inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed">Anterior</button><div${addAttribute(`${id}-numbers`, "id")} class="flex items-center gap-1"></div><button type="button" data-page-btn="next" class="relative inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed">Siguiente</button></div></nav>`;
}, "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/components/Paginacion.astro", void 0);
//#endregion
export { $$Paginacion as t };
