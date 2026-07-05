import{t as e}from"./supabase.9U4HlvOh.js";var t=`00000000-0000-0000-0000-000000000000`,n=[`A`,`B`,`C`,`D`],r=[`Solo`,`1`,`2`,`3`],i=localStorage.getItem(`profesor_id`);i||(window.location.href=`/login`);var a=[],o=`Todos`,s=``,c=[],l=1,u=3,d=document.getElementById(`input-nombre-rutina`),f=document.getElementById(`select-dias`),p=document.getElementById(`select-cliente`),m=document.getElementById(`input-buscar-ejercicio`),h=document.getElementById(`ejercicios-cargando`),g=document.getElementById(`ejercicios-vacio`),_=document.getElementById(`lista-disponibles`),v=document.getElementById(`lista-ejercicios`),y=document.getElementById(`lista-vacia`),b=document.getElementById(`contador-ejercicios`),x=document.getElementById(`dia-activo-label`),S=document.getElementById(`btn-guardar-rutina`),C=document.getElementById(`alerta-exito`),w=document.getElementById(`alerta-exito-mensaje`),T=document.getElementById(`alerta-error`),E=document.getElementById(`alerta-error-mensaje`);function D(e){w&&(w.textContent=e),C?.classList.remove(`hidden`),C?.classList.add(`flex`),T?.classList.add(`hidden`)}function O(e){E&&(E.textContent=e),T?.classList.remove(`hidden`),T?.classList.add(`flex`),C?.classList.add(`hidden`)}function k(){C?.classList.add(`hidden`),C?.classList.remove(`flex`),T?.classList.add(`hidden`),T?.classList.remove(`flex`)}function A(){if(!S)return;let e=d?.value.trim()??``,t=p?.value??``;S.disabled=!e||!t||c.length===0}function j(e){return c.filter(t=>t.dia===e)}function M(e){let t=new Set(j(e).map(e=>e.bloque));for(let e of n)if(!t.has(e))return e;return n[n.length-1]}var N=document.getElementById(`tabs-dias`);function P(){N&&(N.innerHTML=Array.from({length:u},(e,t)=>{let n=t+1;return`<button type="button" data-dia="${n}" class="tab-dia flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${n===l?`bg-white text-zinc-900 shadow-sm`:`text-zinc-500 hover:text-zinc-700`}">Día ${n}</button>`}).join(``),l>u&&L(1))}function F(){let e=s.toLowerCase(),t=a.filter(t=>{let n=o===`Todos`||t.grupo_muscular===o,r=!e||t.nombre.toLowerCase().includes(e);return n&&r});if(h&&h.classList.add(`hidden`),t.length===0){g?.classList.remove(`hidden`),_&&(_.innerHTML=``);return}g?.classList.add(`hidden`),_&&(_.innerHTML=t.map(e=>{let t=c.some(t=>t.ejercicio.id===e.id&&t.dia===l);return`
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
              </div>`}).join(``))}function I(){let e=j(l),t=c.length;if(b&&(b.textContent=String(t)),e.length===0){y?.classList.remove(`hidden`),v&&(v.innerHTML=``),A(),F();return}y?.classList.add(`hidden`);let i=new Map;for(let t of e){let e=t.bloque;i.has(e)||i.set(e,[]),i.get(e).push(t)}if(v){let e=``;for(let[t,a]of i){let t=a.length>1;e+=`<div class="space-y-2 ${t?`border-l-4 border-emerald-500 pl-3`:``}">`;for(let i of a){let a=c.indexOf(i),o=t?`${i.bloque}${i.orden}`:i.bloque;e+=`
              <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4" data-idx="${a}">
                <div class="flex items-start gap-2">
                  <!-- Badge bloque -->
                  <span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-[11px] font-bold text-emerald-700">${t?o:o.charAt(0)}</span>

                  <div class="min-w-0 flex-1">
                    <div class="flex items-start justify-between gap-2">
                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-zinc-900">${i.ejercicio.nombre}</p>
                        <p class="text-xs text-zinc-500">${i.ejercicio.grupo_muscular}</p>
                      </div>
                      <button type="button" data-quitar="${a}"
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
                        <select data-campo="bloque" data-idx="${a}"
                          class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-xs font-medium text-zinc-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                          ${n.map(e=>`<option value="${e}" ${i.bloque===e?`selected`:``}>${e}</option>`).join(``)}
                        </select>
                      </div>
                      <div>
                        <label class="block text-[11px] font-medium text-zinc-500">Orden</label>
                        <select data-campo="orden" data-idx="${a}"
                          class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-xs font-medium text-zinc-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                          ${r.map(e=>`<option value="${e}" ${i.orden===e?`selected`:``}>${e}</option>`).join(``)}
                        </select>
                      </div>
                      <div>
                        <label class="block text-[11px] font-medium text-zinc-500">Series</label>
                        <input type="number" min="1" value="${i.series}" data-campo="series" data-idx="${a}"
                          class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-center text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                      </div>
                      <div>
                        <label class="block text-[11px] font-medium text-zinc-500">Reps</label>
                        <input type="number" min="1" value="${i.repeticiones}" data-campo="repeticiones" data-idx="${a}"
                          class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-center text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                      </div>
                      <div>
                        <label class="block text-[11px] font-medium text-zinc-500">Peso (kg)</label>
                        <input type="number" min="0" step="0.5" value="${i.peso}" data-campo="peso" data-idx="${a}"
                          class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-center text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                      </div>
                      <div>
                        <label class="block text-[11px] font-medium text-zinc-500">Desc. (min)</label>
                        <input type="number" min="0" step="0.5" value="${i.descanso}" data-campo="descanso" data-idx="${a}"
                          class="campo-carga mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-center text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                      </div>
                    </div>

                    <!-- Fila 2: Aclaraciones -->
                    <div class="mt-2">
                      <input type="text" value="${i.aclaraciones}" data-campo="aclaraciones" data-idx="${a}"
                        placeholder="Ej: Al fallo / Mantener 2s abajo"
                        class="campo-texto mt-1 w-full rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-600 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                    </div>
                  </div>
                </div>
              </div>`}e+=`</div>`}v.innerHTML=e}A(),F()}function L(e){l=e,x&&(x.textContent=`Día ${e}`),document.querySelectorAll(`.tab-dia`).forEach(t=>{let n=Number(t.getAttribute(`data-dia`))===e;t.classList.toggle(`bg-white`,n),t.classList.toggle(`text-zinc-900`,n),t.classList.toggle(`shadow-sm`,n),t.classList.toggle(`text-zinc-500`,!n)}),I()}async function R(){let{data:t,error:n}=await e.from(`ejercicios`).select(`id, nombre, grupo_muscular`).order(`grupo_muscular`,{ascending:!0}).order(`nombre`,{ascending:!0});if(n){O(`No se pudieron cargar los ejercicios: ${n.message}`);return}a=t??[],F()}async function z(){let{data:n,error:r}=await e.from(`clientes`).select(`id, nombre`).eq(`gimnasio_id`,t).eq(`profesor_id`,i).order(`nombre`,{ascending:!0});if(r){O(`No se pudieron cargar los alumnos: ${r.message}`);return}let a=n??[];if(p){p.replaceChildren();let e=document.createElement(`option`);e.value=``,e.textContent=`Seleccioná un alumno`,e.disabled=!0,e.selected=!0,p.append(e);for(let e of a){let t=document.createElement(`option`);t.value=e.id,t.textContent=e.nombre,p.append(t)}p.disabled=!1}}var B=document.getElementById(`rutinas-cargando`),V=document.getElementById(`rutinas-vacio`),H=document.getElementById(`rutinas-lista`),U=document.getElementById(`rutinas-contador`),W=document.getElementById(`titulo-pagina`),G=document.getElementById(`btn-guardar-texto`),K=document.getElementById(`btn-cancelar-edicion`),q=null;async function J(){B&&(B.hidden=!1),V?.classList.add(`hidden`),H&&(H.innerHTML=``);let{data:n,error:r}=await e.from(`rutinas`).select(`id, nombre, cliente_id, created_at`).eq(`gimnasio_id`,t).order(`created_at`,{ascending:!1});if(r){B&&(B.hidden=!0),O(`No se pudieron cargar las rutinas: ${r.message}`);return}let{data:i}=await e.from(`clientes`).select(`id, nombre`).eq(`gimnasio_id`,t),a=new Map;(i??[]).forEach(e=>a.set(e.id,e.nombre));let{data:o}=await e.from(`rutina_ejercicio`).select(`rutina_id, dia`),s=new Map;(o??[]).forEach(e=>{let t=s.get(e.rutina_id)??{total:0,dias:new Set};t.total++,t.dias.add(e.dia),s.set(e.rutina_id,t)}),B&&(B.hidden=!0);let c=n??[];if(c.length===0){V?.classList.remove(`hidden`),U&&(U.textContent=`0`);return}U&&(U.textContent=String(c.length)),H&&(H.innerHTML=c.map(e=>{let t=s.get(e.id),n=t?.total??0,r=t?.dias.size??0,i=e.cliente_id?a.get(e.cliente_id)??`—`:`—`,o=new Date(e.created_at).toLocaleDateString(`es-AR`);return`
          <div class="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-zinc-50">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-zinc-900">${e.nombre}</p>
              <p class="text-xs text-zinc-500">${i} · ${n} ejercicio${n===1?``:`s`} · ${r} día${r===1?``:`s`} · ${o}</p>
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
          </div>`}).join(``))}async function Y(t){let{data:n,error:r}=await e.from(`rutinas`).select(`id, nombre, cliente_id`).eq(`id`,t).single();if(r||!n){O(`No se pudo cargar la rutina para editar.`);return}let{data:i,error:o}=await e.from(`rutina_ejercicio`).select(`ejercicio_id, dia, bloque_grupo, series, repeticiones, peso, descanso, aclaraciones`).eq(`rutina_id`,t).order(`dia`,{ascending:!0});if(o){O(`No se pudieron cargar los ejercicios de la rutina.`);return}d&&(d.value=n.nombre),p&&(p.value=n.cliente_id??``);let s=new Set((i??[]).map(e=>e.dia));u=Math.max(s.size,1),f&&(f.value=String(u)),P(),c=[];for(let e of i??[]){let t=a.find(t=>t.id===e.ejercicio_id);if(!t)continue;let n=e.bloque_grupo??``,r=`A`,i=`Solo`;n.length===1?r=n:n.length===2&&(r=n.charAt(0),i=n.charAt(1)),c.push({ejercicio:t,dia:e.dia,bloque:r,orden:i,series:e.series??3,repeticiones:e.repeticiones??10,peso:e.peso??0,descanso:e.descanso??1,aclaraciones:e.aclaraciones??``})}q=t,W&&(W.textContent=`Editar Rutina`),G&&(G.textContent=`Guardar Cambios`),K?.removeAttribute(`hidden`),L(1),A(),window.scrollTo({top:0,behavior:`smooth`})}K?.addEventListener(`click`,()=>{q=null,W&&(W.textContent=`Crear Rutina`),G&&(G.textContent=`Crear Rutina`),K?.setAttribute(`hidden`,``),c=[],d&&(d.value=``),p&&(p.selectedIndex=0),L(1),k()});async function X(t,n){if(!window.confirm(`¿Eliminar la rutina "${n}"? Esta acción no se puede deshacer.`))return;await e.from(`rutina_ejercicio`).delete().eq(`rutina_id`,t);let{error:r}=await e.from(`rutinas`).delete().eq(`id`,t);if(r){O(`No se pudo eliminar la rutina: ${r.message}`);return}D(`Rutina "${n}" eliminada.`),J()}H?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-editar-rutina]`);if(t){Y(t.dataset.editarRutina);return}let n=e.target.closest(`[data-eliminar-rutina]`);n&&X(n.dataset.eliminarRutina,n.dataset.nombreRutina)}),d?.addEventListener(`input`,A),p?.addEventListener(`change`,A),f?.addEventListener(`change`,()=>{u=Number(f.value)||3,P()}),document.getElementById(`tabs-dias`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-dia]`);t&&L(Number(t.dataset.dia))}),m?.addEventListener(`input`,()=>{s=m.value,F()}),document.getElementById(`filtro-grupos`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-grupo]`);t&&(o=t.dataset.grupo??`Todos`,document.querySelectorAll(`.btn-grupo`).forEach(e=>{let t=e.getAttribute(`data-grupo`)===o;e.classList.toggle(`bg-emerald-600`,t),e.classList.toggle(`text-white`,t),e.classList.toggle(`bg-zinc-100`,!t),e.classList.toggle(`text-zinc-600`,!t)}),F())}),_?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-agregar]`);if(!t||t.disabled)return;let n=t.dataset.agregar,r=a.find(e=>e.id===n);if(!r)return;let i=M(l);c.push({ejercicio:r,dia:l,bloque:i,orden:`Solo`,series:3,repeticiones:10,peso:0,descanso:1,aclaraciones:``}),I()}),v?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-quitar]`);if(!t)return;let n=Number(t.dataset.quitar);Number.isNaN(n)||(c.splice(n,1),I())}),v?.addEventListener(`input`,e=>{let t=e.target,n=Number(t.dataset.idx),r=t.dataset.campo;if(Number.isNaN(n)||!r)return;let i=c[n];if(i)if(r===`aclaraciones`)i[r]=t.value;else if(r===`bloque`||r===`orden`)i[r]=t.value,I();else{let e=Number(t.value);if(!Number.isFinite(e)||e<0)return;i[r]=e}}),S?.addEventListener(`click`,async()=>{k();let n=d?.value.trim()??``,r=p?.value??``;if(!n){O(`Ingresá un nombre para la rutina.`);return}if(!r){O(`Seleccioná un alumno.`);return}if(c.length===0){O(`Agregá al menos un ejercicio.`);return}S.disabled=!0,S.textContent=`Guardando…`;let i;if(q){let{error:t}=await e.from(`rutinas`).update({nombre:n,cliente_id:r}).eq(`id`,q);if(t){O(`No se pudo actualizar la rutina: ${t.message}`),S.disabled=!1,S.textContent=`Guardar Cambios`;return}i=q,await e.from(`rutina_ejercicio`).delete().eq(`rutina_id`,i)}else{let{data:a,error:o}=await e.from(`rutinas`).insert([{nombre:n,cliente_id:r,gimnasio_id:t}]).select(`id`).single();if(o||!a){O(`No se pudo crear la rutina: ${o?.message??`error desconocido`}`),S.disabled=!1,S.textContent=`Crear Rutina`;return}i=a.id}let a=c.map(e=>{let t=j(e.dia).filter(t=>t.bloque===e.bloque).length>1?`${e.bloque}${e.orden}`:e.bloque;return{rutina_id:i,ejercicio_id:e.ejercicio.id,dia:e.dia,bloque_grupo:t,series:e.series,repeticiones:e.repeticiones,peso:e.peso,descanso:e.descanso,aclaraciones:e.aclaraciones||null}}),{error:o}=await e.from(`rutina_ejercicio`).insert(a),s=!!q;if(S.disabled=!1,S.textContent=s?`Guardar Cambios`:`Crear Rutina`,o){O(`La rutina se ${s?`actualizó`:`creó`}, pero no se pudieron guardar los ejercicios: ${o.message}`);return}D(`Rutina "${n}" ${s?`actualizada`:`creada`} con ${c.length} ejercicios.`),q=null,W&&(W.textContent=`Crear Rutina`),G&&(G.textContent=`Crear Rutina`),K?.setAttribute(`hidden`,``),c=[],d&&(d.value=``),p&&(p.selectedIndex=0),L(1),J()}),P(),L(1),Promise.all([R(),z(),J()]);