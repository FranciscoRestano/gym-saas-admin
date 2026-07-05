import{n as e,t}from"./paginacion.DSEKGppP.js";var n=[],r={},i=``,a={items:[],paginaActual:1},o=document.getElementById(`profesores-cargando`),s=document.getElementById(`profesores-vacio`),c=document.getElementById(`profesores-contenido`),l=document.getElementById(`tabla-profesores`),u=document.getElementById(`sin-resultados`),d=document.getElementById(`profesores-error`),f=document.getElementById(`profesores-error-mensaje`),p=document.getElementById(`btn-reintentar`),m=document.getElementById(`input-buscar`),h=document.getElementById(`modal-overlay`),g=document.getElementById(`form-nuevo-profesor`),_=document.getElementById(`form-error`),v=document.getElementById(`btn-guardar`),y=document.getElementById(`modal-editar-overlay`),b=document.getElementById(`form-editar-profesor`),x=document.getElementById(`editar-profesor-id`),S=document.getElementById(`editar-nombre`),C=document.getElementById(`editar-horario`),w=document.getElementById(`editar-dni`),T=document.getElementById(`editar-password`),E=document.getElementById(`editar-horas-semanales`),D=document.getElementById(`editar-pago-hora`),O=document.getElementById(`editar-comision-alumno`),k=document.getElementById(`form-editar-error`),A=document.getElementById(`btn-guardar-edicion`);function j(e){let t=e!==null;f&&e&&(f.textContent=e),d?.classList.toggle(`hidden`,!t),d?.classList.toggle(`flex`,t)}function M(e){s?.classList.toggle(`hidden`,!e),s?.classList.toggle(`flex`,e)}function N(){h?.classList.remove(`hidden`),h?.classList.add(`flex`),document.getElementById(`input-nombre`)?.focus()}function P(){h?.classList.add(`hidden`),h?.classList.remove(`flex`),g?.reset(),_?.classList.add(`hidden`)}function F(e){!y||!x||!S||(x.value=e.id??``,S.value=e.nombre??``,w&&(w.value=e.dni??``),T&&(T.value=``),C&&(C.value=e.horario??``),E&&(E.value=e.horasSemanales??``),D&&(D.value=e.pagoPorHora??``),O&&(O.value=e.comisionPorAlumno??``),k?.classList.add(`hidden`),y.classList.remove(`hidden`),y.classList.add(`flex`),S.focus())}function I(){y?.classList.add(`hidden`),y?.classList.remove(`flex`),b?.reset(),k?.classList.add(`hidden`)}function L(e){let t=document.createElement(`tr`);t.className=`hover:bg-zinc-50 transition-colors`,t.dataset.id=e.id;let n=r[e.id]??0,i=e.horas_semanales??0,a=e.pago_por_hora??0,o=e.comision_por_alumno??0,s=a*i*4+n*o;return t.innerHTML=`
      <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900">${e.nombre}</td>
      <td class="whitespace-nowrap px-6 py-4 text-sm text-zinc-600">${e.dni??`—`}</td>
      <td class="whitespace-nowrap px-6 py-4 text-sm text-zinc-600">
        <span>${e.horario??`—`}</span>
        ${i>0?`<span class="ml-1.5 inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">${i} hs/sem</span>`:``}
      </td>
      <td class="whitespace-nowrap px-6 py-4 text-sm">
        <a
          href="/dashboard/clientes?profesor=${e.id}"
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${n>0?`bg-emerald-50 text-emerald-700 hover:bg-emerald-100`:`bg-zinc-100 text-zinc-500 hover:bg-zinc-200`}"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          ${n} alumno${n===1?``:`s`}
        </a>
      </td>
      <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-emerald-700">$${s.toLocaleString(`es-AR`,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td class="whitespace-nowrap px-6 py-4 text-right">
        <button
          type="button"
          data-editar
          data-id="${e.id}"
          data-nombre="${e.nombre}"
          data-dni="${e.dni??``}"
          data-horario="${e.horario??``}"
          data-horas-semanales="${e.horas_semanales??``}"
          data-pago-por-hora="${e.pago_por_hora??``}"
          data-comision-por-alumno="${e.comision_por_alumno??``}"
          class="inline-flex items-center justify-center rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="Editar profesor"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
        <button
          type="button"
          data-eliminar
          data-id="${e.id}"
          data-nombre="${e.nombre}"
          class="inline-flex items-center justify-center rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
          aria-label="Eliminar profesor"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </td>
    `,t}function R(){let r=i.toLowerCase(),o=n.filter(e=>e.nombre.toLowerCase().includes(r));a.items=o,a.paginaActual>Math.ceil(o.length/10)&&(a.paginaActual=1),l&&(l.innerHTML=``);let s=t(o,a.paginaActual);o.length===0&&n.length>0?u?.classList.remove(`hidden`):(u?.classList.add(`hidden`),s.forEach(e=>l?.appendChild(L(e)))),e(`pag-profesores`,a,e=>{a.paginaActual=e,R()})}function z(){let e=n.length>0;o?.classList.add(`hidden`),M(!e),c?.classList.toggle(`hidden`,!e)}async function B(){j(null),o&&(o.hidden=!1),c?.classList.add(`hidden`),M(!1);let e=await fetch(`/api/admin/profesores`),t=await e.json();if(!e.ok||t.error){j(`No se pudieron cargar los datos: ${t.error??`Error desconocido`}`),o&&(o.hidden=!0);return}n=t.profesores??[],r=t.alumnosPorProfesor??{},z(),R()}async function V(e,t){if(!window.confirm(`¿Eliminar al profesor "${t}"? Esta acción no se puede deshacer.`))return;let n=await fetch(`/api/admin/profesores`,{method:`DELETE`,headers:{"Content-Type":`application/json`},body:JSON.stringify({id:e})}),r=await n.json();if(!n.ok||r.error){j(`No se pudo eliminar: ${r.error??`Error desconocido`}`);return}await B()}m?.addEventListener(`input`,()=>{i=m.value,a.paginaActual=1,R()}),document.getElementById(`btn-nuevo-profesor`)?.addEventListener(`click`,N),document.getElementById(`btn-nuevo-profesor-vacio`)?.addEventListener(`click`,N),document.getElementById(`btn-cerrar-modal`)?.addEventListener(`click`,P),document.getElementById(`btn-cancelar-modal`)?.addEventListener(`click`,P),p?.addEventListener(`click`,B),g?.addEventListener(`submit`,async e=>{if(e.preventDefault(),!g||!v)return;let t=new FormData(g),n=t.get(`nombre`)?.trim(),r=t.get(`dni`)?.trim()||null,i=t.get(`password`)?.trim()||null,a=t.get(`horario`)?.trim()||null,o=parseInt(t.get(`horas_semanales`),10)||0,s=parseFloat(t.get(`pago_por_hora`))||0,c=parseFloat(t.get(`comision_por_alumno`))||0;if(!n){_&&(_.textContent=`Completá el nombre del profesor.`,_.classList.remove(`hidden`));return}v.disabled=!0,v.textContent=`Guardando…`;let l=await fetch(`/api/admin/profesores`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({nombre:n,dni:r,password:i,horario:a,horas_semanales:o,pago_por_hora:s,comision_por_alumno:c})}),u=await l.json();if(v.disabled=!1,v.textContent=`Guardar`,!l.ok||u.error){_&&(_.textContent=`Error: ${u.error??`Error desconocido`}`,_.classList.remove(`hidden`));return}P(),await B()}),l?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-eliminar]`);if(t){let e=t.dataset.id,n=t.dataset.nombre;e&&n&&V(e,n);return}let n=e.target.closest(`[data-editar]`);n&&F(n.dataset)}),document.getElementById(`btn-cerrar-modal-editar`)?.addEventListener(`click`,I),document.getElementById(`btn-cancelar-modal-editar`)?.addEventListener(`click`,I),y?.addEventListener(`click`,e=>{e.target===y&&I()}),b?.addEventListener(`submit`,async e=>{if(e.preventDefault(),!b||!A||!x)return;let t=new FormData(b),n=x.value,r=t.get(`nombre`)?.trim(),i=t.get(`dni`)?.trim()||null,a=t.get(`password`)?.trim()||null,o=t.get(`horario`)?.trim()||null,s=parseInt(t.get(`horas_semanales`),10)||0,c=parseFloat(t.get(`pago_por_hora`))||0,l=parseFloat(t.get(`comision_por_alumno`))||0;if(!r){k&&(k.textContent=`Completá el nombre del profesor.`,k.classList.remove(`hidden`));return}A.disabled=!0,A.textContent=`Guardando…`;let u=await fetch(`/api/admin/profesores`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify({id:n,nombre:r,dni:i,password:a,horario:o,horas_semanales:s,pago_por_hora:c,comision_por_alumno:l})}),d=await u.json();if(A.disabled=!1,A.textContent=`Guardar Cambios`,!u.ok||d.error){k&&(k.textContent=`Error: ${d.error??`Error desconocido`}`,k.classList.remove(`hidden`));return}I(),await B()}),B();