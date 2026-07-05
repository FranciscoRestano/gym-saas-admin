var e=[`A`,`B`,`C`,`D`],t=[`Solo`,`1`,`2`,`3`],n=[],r=`Todos`,i=``,a=[],o=1,s=3,c=document.getElementById(`input-nombre-rutina`),l=document.getElementById(`select-dias`),u=document.getElementById(`select-cliente`),d=document.getElementById(`input-buscar-ejercicio`),f=document.getElementById(`ejercicios-cargando`),p=document.getElementById(`ejercicios-vacio`),m=document.getElementById(`lista-disponibles`),h=document.getElementById(`lista-ejercicios`),g=document.getElementById(`lista-vacia`),_=document.getElementById(`contador-ejercicios`),v=document.getElementById(`dia-activo-label`),y=document.getElementById(`btn-guardar-rutina`),b=document.getElementById(`alerta-exito`),x=document.getElementById(`alerta-exito-mensaje`),S=document.getElementById(`alerta-error`),C=document.getElementById(`alerta-error-mensaje`);function w(e){x&&(x.textContent=e),b?.classList.remove(`hidden`),b?.classList.add(`flex`),S?.classList.add(`hidden`)}function T(e){C&&(C.textContent=e),S?.classList.remove(`hidden`),S?.classList.add(`flex`),b?.classList.add(`hidden`)}function E(){b?.classList.add(`hidden`),b?.classList.remove(`flex`),S?.classList.add(`hidden`),S?.classList.remove(`flex`)}function D(){if(!y)return;let e=c?.value.trim()??``,t=u?.value??``;y.disabled=!e||!t||a.length===0}function O(e){return a.filter(t=>t.dia===e)}function k(t){let n=new Set(O(t).map(e=>e.bloque));for(let t of e)if(!n.has(t))return t;return e[e.length-1]}var A=document.getElementById(`tabs-dias`);function j(){A&&(A.innerHTML=Array.from({length:s},(e,t)=>{let n=t+1;return`<button type="button" data-dia="${n}" class="tab-dia flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${n===o?`bg-white text-zinc-900 shadow-sm`:`text-zinc-500 hover:text-zinc-700`}">Día ${n}</button>`}).join(``),o>s&&P(1))}function M(){let e=i.toLowerCase(),t=n.filter(t=>{let n=r===`Todos`||t.grupo_muscular===r,i=!e||t.nombre.toLowerCase().includes(e);return n&&i});if(f&&f.classList.add(`hidden`),t.length===0){p?.classList.remove(`hidden`),m&&(m.innerHTML=``);return}p?.classList.add(`hidden`),m&&(m.innerHTML=t.map(e=>{let t=a.some(t=>t.ejercicio.id===e.id&&t.dia===o);return`
          <div class="flex items-center justify-between rounded-lg border border-zinc-100 px-3 py-2.5 transition-colors hover:bg-zinc-50">
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-zinc-900">${e.nombre}</p>
              <p class="text-xs text-zinc-500">${e.grupo_muscular}</p>
            </div>
            <button type="button" data-agregar="${e.id}"
              ${t?`disabled`:``}
              class="ml-3 shrink-0 inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${t?`bg-zinc-100 text-zinc-400 cursor-not-allowed`:`bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}">
              ${t?`Agregado`:`+ Agregar`}
            </button>
          </div>`}).join(``))}function N(){let n=O(o),r=a.length;if(_&&(_.textContent=String(r)),n.length===0){g?.classList.remove(`hidden`),h&&(h.innerHTML=``),D(),M();return}g?.classList.add(`hidden`);let i=new Map;for(let e of n){let t=e.bloque;i.has(t)||i.set(t,[]),i.get(t).push(e)}if(h){let n=``;for(let[r,o]of i){let r=o.length>1;n+=`<div class="space-y-2 ${r?`border-l-4 border-emerald-500 pl-3`:``}">`;for(let i of o){let o=a.indexOf(i),s=r?`${i.bloque}${i.orden}`:i.bloque;n+=`
          <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4" data-idx="${o}">
            <div class="flex items-start gap-2">
              <!-- Badge bloque -->
              <span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-[11px] font-bold text-emerald-700">${r?s:s.charAt(0)}</span>

              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-zinc-900">${i.ejercicio.nombre}</p>
                    <p class="text-xs text-zinc-500">${i.ejercicio.grupo_muscular}</p>
                  </div>
                  <button type="button" data-quitar="${o}"
                    class="shrink-0 inline-flex items-center justify-center rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Quitar ejercicio">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>

                <!-- Fila 1: Bloque + Orden + Campos numéricos -->
                <div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-6">
                  <div>
                    <label class="block text-[11px] font-medium text-zinc-500">Bloque</label>
                    <select data-campo="bloque" data-idx="${o}"
                      class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-xs font-medium text-zinc-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                      ${e.map(e=>`<option value="${e}" ${i.bloque===e?`selected`:``}>${e}</option>`).join(``)}
                    </select>
                  </div>
                  <div>
                    <label class="block text-[11px] font-medium text-zinc-500">Orden</label>
                    <select data-campo="orden" data-idx="${o}"
                      class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-xs font-medium text-zinc-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                      ${t.map(e=>`<option value="${e}" ${i.orden===e?`selected`:``}>${e}</option>`).join(``)}
                    </select>
                  </div>
                  <div>
                    <label class="block text-[11px] font-medium text-zinc-500">Series</label>
                    <input type="number" min="1" value="${i.series}" data-campo="series" data-idx="${o}"
                      class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-center text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label class="block text-[11px] font-medium text-zinc-500">Reps</label>
                    <input type="number" min="1" value="${i.repeticiones}" data-campo="repeticiones" data-idx="${o}"
                      class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-center text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label class="block text-[11px] font-medium text-zinc-500">Peso (kg)</label>
                    <input type="number" min="0" step="0.5" value="${i.peso}" data-campo="peso" data-idx="${o}"
                      class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-center text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label class="block text-[11px] font-medium text-zinc-500">Desc. (min)</label>
                    <input type="number" min="0" step="0.5" value="${i.descanso}" data-campo="descanso" data-idx="${o}"
                      class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-center text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                  </div>
                </div>

                <!-- Fila 2: Aclaraciones -->
                <div class="mt-2">
                  <input type="text" value="${i.aclaraciones}" data-campo="aclaraciones" data-idx="${o}"
                    placeholder="Ej: Al fallo / Mantener 2s abajo"
                    class="campo-texto mt-1 w-full rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-600 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
              </div>
            </div>
          </div>`}n+=`</div>`}h.innerHTML=n}D(),M()}function P(e){o=e,v&&(v.textContent=`Día ${e}`),document.querySelectorAll(`.tab-dia`).forEach(t=>{let n=Number(t.getAttribute(`data-dia`))===e;t.classList.toggle(`bg-white`,n),t.classList.toggle(`text-zinc-900`,n),t.classList.toggle(`shadow-sm`,n),t.classList.toggle(`text-zinc-500`,!n)}),N()}async function F(){let e=await fetch(`/api/admin/rutinas`),t=await e.json();if(!e.ok||t.error){T(`No se pudieron cargar los datos: ${t.error??`Error desconocido`}`);return}n=t.ejercicios??[],M();let r=t.clientes??[];if(u){u.replaceChildren();let e=document.createElement(`option`);e.value=``,e.textContent=`Seleccioná un alumno`,e.disabled=!0,e.selected=!0,u.append(e);for(let e of r){let t=document.createElement(`option`);t.value=e.id,t.textContent=e.nombre,u.append(t)}u.disabled=!1}}c?.addEventListener(`input`,D),u?.addEventListener(`change`,D),l?.addEventListener(`change`,()=>{s=Number(l.value)||3,j()}),document.getElementById(`tabs-dias`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-dia]`);t&&P(Number(t.dataset.dia))}),d?.addEventListener(`input`,()=>{i=d.value,M()}),document.getElementById(`filtro-grupos`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-grupo]`);t&&(r=t.dataset.grupo??`Todos`,document.querySelectorAll(`.btn-grupo`).forEach(e=>{let t=e.getAttribute(`data-grupo`)===r;e.classList.toggle(`bg-emerald-600`,t),e.classList.toggle(`text-white`,t),e.classList.toggle(`bg-zinc-100`,!t),e.classList.toggle(`text-zinc-600`,!t)}),M())}),m?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-agregar]`);if(!t||t.disabled)return;let r=t.dataset.agregar,i=n.find(e=>e.id===r);if(!i)return;let s=k(o);a.push({ejercicio:i,dia:o,bloque:s,orden:`Solo`,series:3,repeticiones:10,peso:0,descanso:1,aclaraciones:``}),N()}),h?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-quitar]`);if(!t)return;let n=Number(t.dataset.quitar);Number.isNaN(n)||(a.splice(n,1),N())}),h?.addEventListener(`input`,e=>{let t=e.target,n=Number(t.dataset.idx),r=t.dataset.campo;if(Number.isNaN(n)||!r)return;let i=a[n];if(i)if(r===`aclaraciones`)i[r]=t.value;else if(r===`bloque`||r===`orden`)i[r]=t.value,N();else{let e=Number(t.value);if(!Number.isFinite(e)||e<0)return;i[r]=e}}),j(),P(1),Promise.all([F(),W()]);var I=document.getElementById(`rutinas-cargando`),L=document.getElementById(`rutinas-vacio`),R=document.getElementById(`rutinas-lista`),z=document.getElementById(`rutinas-contador`),B=document.getElementById(`titulo-pagina`),V=document.getElementById(`btn-guardar-texto`),H=document.getElementById(`btn-cancelar-edicion`),U=null;async function W(){I&&(I.hidden=!1),L?.classList.add(`hidden`),R&&(R.innerHTML=``);let e=await fetch(`/api/admin/rutinas`),t=await e.json();if(I&&(I.hidden=!0),!e.ok||t.error){T(`No se pudieron cargar las rutinas: ${t.error??`Error desconocido`}`);return}let n=t.rutinas??[],r=t.statsRutinas??{},i=new Map;if((t.clientes??[]).forEach(e=>i.set(e.id,e.nombre)),n.length===0){L?.classList.remove(`hidden`),z&&(z.textContent=`0`);return}z&&(z.textContent=String(n.length)),R&&(R.innerHTML=n.map(e=>{let t=r[e.id],n=t?.total??0,a=t?.dias?.length??0,o=e.cliente_id?i.get(e.cliente_id)??`—`:`—`,s=new Date(e.created_at).toLocaleDateString(`es-AR`);return`
          <div class="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-zinc-50">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-zinc-900">${e.nombre}</p>
              <p class="text-xs text-zinc-500">${o} · ${n} ejercicio${n===1?``:`s`} · ${a} día${a===1?``:`s`} · ${s}</p>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button type="button" data-editar-rutina="${e.id}"
                class="inline-flex items-center justify-center rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                aria-label="Editar rutina">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" set:html=${iconEdit} />
              </button>
              <button type="button" data-eliminar-rutina="${e.id}" data-nombre-rutina="${e.nombre}"
                class="inline-flex items-center justify-center rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                aria-label="Eliminar rutina">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" set:html=${iconTrash} />
              </button>
            </div>
          </div>`}).join(``))}async function G(e){let t=await fetch(`/api/admin/rutinas?id=${e}`,{method:`PATCH`}),r=await t.json();if(!t.ok||r.error){T(`No se pudo cargar la rutina para editar.`);return}let i=r.rutina,o=r.ejercicios??[];c&&(c.value=i.nombre),u&&(u.value=i.cliente_id??``);let d=new Set(o.map(e=>e.dia));s=Math.max(d.size,1),l&&(l.value=String(s)),j(),a=[];for(let e of o){let t=n.find(t=>t.id===e.ejercicio_id);if(!t)continue;let r=e.bloque_grupo??``,i=`A`,o=`Solo`;r.length===1?i=r:r.length===2&&(i=r.charAt(0),o=r.charAt(1)),a.push({ejercicio:t,dia:e.dia,bloque:i,orden:o,series:e.series??3,repeticiones:e.repeticiones??10,peso:e.peso??0,descanso:e.descanso??1,aclaraciones:e.aclaraciones??``})}U=e,B&&(B.textContent=`Editar Rutina`),V&&(V.textContent=`Guardar Cambios`),H?.removeAttribute(`hidden`),P(1),D(),window.scrollTo({top:0,behavior:`smooth`})}H?.addEventListener(`click`,()=>{U=null,B&&(B.textContent=`Crear Rutina`),V&&(V.textContent=`Crear Rutina`),H?.setAttribute(`hidden`,``),a=[],c&&(c.value=``),u&&(u.selectedIndex=0),P(1),E()});async function K(e,t){if(!window.confirm(`¿Eliminar la rutina "${t}"? Esta acción no se puede deshacer.`))return;let n=await fetch(`/api/admin/rutinas`,{method:`DELETE`,headers:{"Content-Type":`application/json`},body:JSON.stringify({id:e})}),r=await n.json();if(!n.ok||r.error){T(`No se pudo eliminar la rutina: ${r.error??`Error desconocido`}`);return}w(`Rutina "${t}" eliminada.`),W()}R?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-editar-rutina]`);if(t){G(t.dataset.editarRutina);return}let n=e.target.closest(`[data-eliminar-rutina]`);n&&K(n.dataset.eliminarRutina,n.dataset.nombreRutina)}),y?.addEventListener(`click`,async()=>{E();let e=c?.value.trim()??``,t=u?.value??``;if(!e){T(`Ingresá un nombre para la rutina.`);return}if(!t){T(`Seleccioná un alumno.`);return}if(a.length===0){T(`Agregá al menos un ejercicio.`);return}y.disabled=!0,y.textContent=`Guardando…`;let n=a.map(e=>{let t=O(e.dia).filter(t=>t.bloque===e.bloque).length>1?`${e.bloque}${e.orden}`:e.bloque;return{ejercicio_id:e.ejercicio.id,dia:e.dia,bloque_grupo:t,series:e.series,repeticiones:e.repeticiones,peso:e.peso,descanso:e.descanso,aclaraciones:e.aclaraciones||``}}),r=await fetch(`/api/admin/rutinas`,{method:U?`PUT`:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(U?{rutina_id:U,nombre:e,cliente_id:t,ejercicios:n}:{nombre:e,cliente_id:t,ejercicios:n})}),i=await r.json(),o=!!U;if(y.disabled=!1,y.textContent=o?`Guardar Cambios`:`Crear Rutina`,!r.ok||i.error){T(`No se pudo ${o?`actualizar`:`crear`} la rutina: ${i.error??`Error desconocido`}`);return}w(`Rutina "${e}" ${o?`actualizada`:`creada`} con ${a.length} ejercicios.`),U=null,B&&(B.textContent=`Crear Rutina`),V&&(V.textContent=`Crear Rutina`),H?.setAttribute(`hidden`,``),a=[],c&&(c.value=``),u&&(u.selectedIndex=0),P(1),W()});