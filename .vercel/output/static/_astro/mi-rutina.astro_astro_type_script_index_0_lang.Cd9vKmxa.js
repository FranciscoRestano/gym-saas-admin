import{t as e}from"./supabase.9U4HlvOh.js";var t=localStorage.getItem(`alumno_id`);t||(window.location.href=`/login`);var n=null,r=[],i=1,a=1;document.getElementById(`alumno-info`),document.getElementById(`alumno-nombre`);var o=document.getElementById(`rutina-error`),s=document.getElementById(`rutina-error-mensaje`),c=document.getElementById(`rutina-cargando`),l=document.getElementById(`rutina-vacia`),u=document.getElementById(`rutina-contenido`),d=document.getElementById(`rutina-nombre`),f=document.getElementById(`rutina-meta`),p=document.getElementById(`tabs-dias`),m=document.getElementById(`dia-ejercicios`);document.getElementById(`btn-cerrar-sesion`)?.addEventListener(`click`,()=>{localStorage.clear(),fetch(`/api/logout`,{method:`POST`}).catch(()=>{}),window.location.href=`/login`});function h(e){s&&(s.textContent=e),o?.classList.remove(`hidden`),o?.classList.add(`flex`)}function g(){p&&(p.innerHTML=Array.from({length:a},(e,t)=>{let n=t+1;return`<button type="button" data-dia="${n}" class="tab-dia flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${n===i?`bg-white text-zinc-900 shadow-sm`:`text-zinc-500 hover:text-zinc-700`}">Día ${n}</button>`}).join(``))}function _(){if(!m)return;let e=r.filter(e=>e.dia===i);if(e.length===0){m.innerHTML=`
            <div class="rounded-2xl border border-dashed border-zinc-200 bg-white px-6 py-10 text-center">
              <p class="text-sm text-zinc-500">No hay ejercicios para este día.</p>
            </div>`;return}let t=new Map;for(let n of e){let e=n.bloque_grupo.charAt(0);t.has(e)||t.set(e,[]),t.get(e).push(n)}let n=``;for(let[e,r]of t){let t=r.length>1;for(let i of r){let r=i.ejercicios,a=r?.nombre??`Ejercicio`,o=r?.grupo_muscular??``,s=t?i.bloque_grupo:e.charAt(0);n+=`
            <div class="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div class="flex items-start gap-3">
                <span class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-700">${s}</span>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-zinc-900">${a}</p>
                  <p class="text-xs text-zinc-500">${o}</p>

                  <div class="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div class="rounded-lg bg-zinc-50 px-2 py-2">
                      <p class="text-[10px] font-medium uppercase text-zinc-400">Series</p>
                      <p class="text-sm font-bold text-zinc-900">${i.series}</p>
                    </div>
                    <div class="rounded-lg bg-zinc-50 px-2 py-2">
                      <p class="text-[10px] font-medium uppercase text-zinc-400">Reps</p>
                      <p class="text-sm font-bold text-zinc-900">${i.repeticiones}</p>
                    </div>
                    <div class="rounded-lg bg-zinc-50 px-2 py-2">
                      <p class="text-[10px] font-medium uppercase text-zinc-400">Peso</p>
                      <p class="text-sm font-bold text-zinc-900">${i.peso>0?i.peso+` kg`:`—`}</p>
                    </div>
                  </div>

                  ${i.descanso>0?`<p class="mt-2 text-xs text-zinc-500">Descanso: ${i.descanso} min</p>`:``}
                  ${i.aclaraciones?`<p class="mt-1 text-xs italic text-zinc-500">${i.aclaraciones}</p>`:``}
                </div>
              </div>
            </div>`}}m.innerHTML=n}function v(e){i=e,document.querySelectorAll(`.tab-dia`).forEach(t=>{let n=Number(t.getAttribute(`data-dia`))===e;t.classList.toggle(`bg-white`,n),t.classList.toggle(`text-zinc-900`,n),t.classList.toggle(`shadow-sm`,n),t.classList.toggle(`text-zinc-500`,!n)}),_()}async function y(){if(!t)return;c&&(c.hidden=!1),u?.classList.add(`hidden`),l?.classList.add(`hidden`),o?.classList.add(`hidden`);let{data:i,error:s}=await e.from(`rutinas`).select(`id, nombre, cliente_id, created_at`).eq(`cliente_id`,t).order(`created_at`,{ascending:!1}).limit(1).maybeSingle();if(s){c&&(c.hidden=!0),h(`Error al cargar la rutina: ${s.message}`);return}if(!i){c&&(c.hidden=!0),l?.classList.remove(`hidden`),l?.classList.add(`flex`);return}n=i;let{data:p,error:m}=await e.from(`rutina_ejercicio`).select(`id, rutina_id, ejercicio_id, dia, bloque_grupo, series, repeticiones, peso, descanso, aclaraciones, ejercicios(id, nombre, grupo_muscular)`).eq(`rutina_id`,n.id).order(`dia`,{ascending:!0}).order(`bloque_grupo`,{ascending:!0});if(m){c&&(c.hidden=!0),h(`Error al cargar los ejercicios: ${m.message}`);return}r=p??[];let _=new Set(r.map(e=>e.dia));if(a=_.size>0?Math.max(..._):1,d&&(d.textContent=n.nombre),f){let e=new Date(n.created_at).toLocaleDateString(`es-AR`,{day:`numeric`,month:`long`,year:`numeric`});f.textContent=`${r.length} ejercicios · ${a} día(s) · Creada el ${e}`}c&&(c.hidden=!0),u?.classList.remove(`hidden`),g(),v(1)}p?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-dia]`);t&&v(Number(t.dataset.dia))}),y();