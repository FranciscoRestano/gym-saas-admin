import{t as e}from"./supabase.9U4HlvOh.js";var t=`00000000-0000-0000-0000-000000000000`;localStorage.getItem(`profesor_id`)||(window.location.href=`/login`);var n=new URLSearchParams(window.location.search).get(`cliente_id`);n||(window.location.href=`/profesor/clientes`);var r=null,i=[],a=1,o=1,s=document.getElementById(`alumno-info`),c=document.getElementById(`alumno-nombre`),l=document.getElementById(`rutina-error`),u=document.getElementById(`rutina-error-mensaje`),d=document.getElementById(`rutina-cargando`),f=document.getElementById(`rutina-vacia`),p=document.getElementById(`rutina-contenido`),m=document.getElementById(`rutina-nombre`),h=document.getElementById(`rutina-meta`),g=document.getElementById(`tabs-dias`),_=document.getElementById(`dia-ejercicios`);function v(e){u&&(u.textContent=e),l?.classList.remove(`hidden`),l?.classList.add(`flex`)}function y(){g&&(g.innerHTML=Array.from({length:o},(e,t)=>{let n=t+1;return`<button type="button" data-dia="${n}" class="tab-dia flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${n===a?`bg-white text-zinc-900 shadow-sm`:`text-zinc-500 hover:text-zinc-700`}">Día ${n}</button>`}).join(``))}function b(){if(!_)return;let e=i.filter(e=>e.dia===a);if(e.length===0){_.innerHTML=`
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
        </div>`}}_.innerHTML=n}function x(e){a=e,document.querySelectorAll(`.tab-dia`).forEach(t=>{let n=Number(t.getAttribute(`data-dia`))===e;t.classList.toggle(`bg-white`,n),t.classList.toggle(`text-zinc-900`,n),t.classList.toggle(`shadow-sm`,n),t.classList.toggle(`text-zinc-500`,!n)}),b()}async function S(){if(!n)return;d&&(d.hidden=!1),p?.classList.add(`hidden`),f?.classList.add(`hidden`),l?.classList.add(`hidden`);let{data:a}=await e.from(`clientes`).select(`nombre`).eq(`id`,n).eq(`gimnasio_id`,t).maybeSingle();a&&c&&(c.textContent=a.nombre,s?.classList.remove(`hidden`));let{data:u,error:g}=await e.from(`rutinas`).select(`id, nombre, cliente_id, created_at`).eq(`cliente_id`,n).order(`created_at`,{ascending:!1}).limit(1).maybeSingle();if(g){d&&(d.hidden=!0),v(`Error al cargar la rutina: ${g.message}`);return}if(!u){d&&(d.hidden=!0),f?.classList.remove(`hidden`),f?.classList.add(`flex`);return}r=u;let{data:_,error:b}=await e.from(`rutina_ejercicio`).select(`id, rutina_id, ejercicio_id, dia, bloque_grupo, series, repeticiones, peso, descanso, aclaraciones, ejercicios(id, nombre, grupo_muscular)`).eq(`rutina_id`,r.id).order(`dia`,{ascending:!0}).order(`bloque_grupo`,{ascending:!0});if(b){d&&(d.hidden=!0),v(`Error al cargar los ejercicios: ${b.message}`);return}i=_??[];let S=new Set(i.map(e=>e.dia));if(o=S.size>0?Math.max(...S):1,m&&(m.textContent=r.nombre),h){let e=new Date(r.created_at).toLocaleDateString(`es-AR`,{day:`numeric`,month:`long`,year:`numeric`});h.textContent=`${i.length} ejercicios · ${o} día(s) · Creada el ${e}`}d&&(d.hidden=!0),p?.classList.remove(`hidden`),y(),x(1)}g?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-dia]`);t&&x(Number(t.dataset.dia))}),S();