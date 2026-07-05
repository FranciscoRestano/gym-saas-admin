export const POR_PAGINA = 10;

export interface EstadoPagina {
  items: unknown[];
  paginaActual: number;
}

export function totalPaginas(totalItems: number): number {
  return Math.max(1, Math.ceil(totalItems / POR_PAGINA));
}

export function itemsPagina<T>(items: T[], pagina: number): T[] {
  const inicio = (pagina - 1) * POR_PAGINA;
  return items.slice(inicio, inicio + POR_PAGINA);
}

export function renderizarPaginacion(
  containerId: string,
  estado: EstadoPagina,
  onPageChange: (pagina: number) => void
): void {
  const nav = document.getElementById(containerId);
  if (!nav) return;

  const total = totalPaginas(estado.items.length);
  const infoEl = document.getElementById(`${containerId}-info`);
  const numbersEl = document.getElementById(`${containerId}-numbers`);
  const prevBtn = nav.querySelector('[data-page-btn="prev"]') as HTMLButtonElement | null;
  const nextBtn = nav.querySelector('[data-page-btn="next"]') as HTMLButtonElement | null;

  if (estado.items.length === 0) {
    nav.classList.add('hidden');
    return;
  }

  nav.classList.remove('hidden');

  const inicio = (estado.paginaActual - 1) * POR_PAGINA + 1;
  const fin = Math.min(estado.paginaActual * POR_PAGINA, estado.items.length);
  if (infoEl) infoEl.textContent = `Mostrando ${inicio}–${fin} de ${estado.items.length}`;

  if (prevBtn) prevBtn.disabled = estado.paginaActual <= 1;
  if (nextBtn) nextBtn.disabled = estado.paginaActual >= total;

  if (numbersEl) {
    const maxVisible = 5;
    let start = Math.max(1, estado.paginaActual - Math.floor(maxVisible / 2));
    const end = Math.min(total, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

    let html = '';
    if (start > 1) {
      html += `<button type="button" data-page="1" class="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-zinc-700 hover:bg-zinc-100">1</button>`;
      if (start > 2) html += `<span class="px-1 text-zinc-400">…</span>`;
    }
    for (let i = start; i <= end; i++) {
      const activo = i === estado.paginaActual;
      html += `<button type="button" data-page="${i}" class="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${activo ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-700 hover:bg-zinc-100'}">${i}</button>`;
    }
    if (end < total) {
      if (end < total - 1) html += `<span class="px-1 text-zinc-400">…</span>`;
      html += `<button type="button" data-page="${total}" class="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-zinc-700 hover:bg-zinc-100">${total}</button>`;
    }
    numbersEl.innerHTML = html;
  }

  const handler = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.matches('[data-page-btn="prev"]')) {
      if (estado.paginaActual > 1) onPageChange(estado.paginaActual - 1);
    } else if (target.matches('[data-page-btn="next"]')) {
      if (estado.paginaActual < total) onPageChange(estado.paginaActual + 1);
    } else if (target.matches('[data-page]')) {
      const page = Number(target.getAttribute('data-page'));
      if (page && page !== estado.paginaActual) onPageChange(page);
    }
  };

  nav.removeEventListener('click', handler);
  nav.addEventListener('click', handler);
}
