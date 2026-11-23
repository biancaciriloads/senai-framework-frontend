const statuses = {
  scheduled: { label: 'Aguardando', classes: 'bg-amber-soft text-amber-800' },
  confirmed: { label: 'Confirmada', classes: 'bg-brand-soft text-brand-dark' },
  completed: { label: 'Concluída', classes: 'bg-slate-100 text-slate-600' },
  cancelled: { label: 'Cancelada', classes: 'bg-rose-50 text-rose-700' },
};

const iconPaths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

export function icon(name, className = 'size-5') {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || ''}</svg>`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' })
    .format(new Date(`${value}T12:00:00`));
}

export function statCard({ id, label, description, iconName, iconClasses }) {
  return `
    <article class="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between"><span class="text-sm font-medium text-muted">${label}</span><span class="grid size-10 place-items-center rounded-xl ${iconClasses}">${icon(iconName)}</span></div>
      <p id="${id}" class="mt-5 text-3xl font-bold tracking-tight text-ink">0</p>
      <p class="mt-1 text-xs text-muted">${description}</p>
    </article>
  `;
}

export function appointmentCard(appointment) {
  const badge = statuses[appointment.status];
  const safeId = escapeHtml(appointment.id);
  const actions = [];
  if (appointment.status === 'scheduled') {
    actions.push(`<button type="button" data-action="confirm" data-id="${safeId}" class="rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-brand-dark transition hover:bg-brand-soft">Confirmar</button>`);
  }
  if (appointment.status === 'confirmed') {
    actions.push(`<button type="button" data-action="complete" data-id="${safeId}" class="rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-brand-dark transition hover:bg-brand-soft">Concluir</button>`);
  }
  if (['scheduled', 'confirmed'].includes(appointment.status)) {
    actions.push(`<button type="button" data-action="cancel" data-id="${safeId}" class="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50">Cancelar</button>`);
  }

  return `
    <li class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex min-w-0 items-start gap-3">
        <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-page text-sm font-bold text-brand">${escapeHtml(appointment.patient.trim().slice(0, 1).toLocaleUpperCase('pt-BR'))}</span>
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-2"><h3 class="truncate text-sm font-semibold text-ink">${escapeHtml(appointment.patient)}</h3><span class="rounded-full px-2.5 py-1 text-[10px] font-semibold ${badge.classes}">${badge.label}</span></div>
          <p class="mt-1 text-xs text-muted">${escapeHtml(appointment.specialty)}</p>
          <p class="mt-1 flex items-center gap-1.5 text-xs text-muted">${icon('clock', 'size-3.5')} ${formatDate(appointment.date)} · ${escapeHtml(appointment.time)}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5 pl-14 sm:justify-end sm:pl-0">${actions.join('')}</div>
    </li>
  `;
}
