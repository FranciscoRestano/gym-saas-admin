import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { M as createAstro, N as createComponent } from "./render_DItgDmG4.mjs";
import "./compiler_DO1g-Aol.mjs";
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://astro.build");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	return Astro.redirect("/login");
}, "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/pages/index.astro", void 0);
var $$file = "/home/francisco/Escritorio/Proyectos/gym-saas-admin/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
