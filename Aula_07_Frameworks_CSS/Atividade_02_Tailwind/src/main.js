import './style.css';
import { appointmentCard, icon, statCard } from './components.js';

const storageKey = 'aula07-tailwind-atendimentos';
const app = document.querySelector('#app');

function localDateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return date.getFullYear() === Number(value.slice(0, 4))
    && date.getMonth() + 1 === Number(value.slice(5, 7))
    && date.getDate() === Number(value.slice(8, 10));
}

function isAppointment(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.patient === 'string'
    && typeof value.specialty === 'string'
    && isValidDate(value.date)
    && /^([01]\d|2[0-3]):[0-5]\d$/.test(value.time)
    && ['scheduled', 'confirmed', 'completed', 'cancelled'].includes(value.status);
}

const demoAppointments = [
  {
    id: 'demo-1',
    patient: 'Ana Souza',
    specialty: 'Cardiologia',
    date: localDateOffset(0),
    time: '09:00',
    status: 'confirmed',
  },
  {
    id: 'demo-2',
    patient: 'Lucas Martins',
    specialty: 'Clínica médica',
    date: localDateOffset(0),
    time: '10:30',
    status: 'scheduled',
  },
  {
    id: 'demo-3',
    patient: 'Mariana Costa',
    specialty: 'Pediatria',
    date: localDateOffset(1),
    time: '14:00',
    status: 'scheduled',
  },
];

let storageNotice = '';
let appointments;

try {
  const saved = localStorage.getItem(storageKey);
  if (saved === null) {
    appointments = demoAppointments;
  } else {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(isAppointment)) {
      appointments = [];
      storageNotice = 'Os dados locais não estão no formato esperado. Crie uma nova consulta para continuar.';
    } else {
      appointments = parsed;
    }
  }
} catch (error) {
  appointments = [];
  storageNotice = 'Não foi possível ler os dados deste navegador.';
  console.error('Falha ao carregar os atendimentos locais.', error);
}

app.innerHTML = `
  <div class="min-h-screen md:flex">
    <aside class="hidden w-64 shrink-0 border-r border-line bg-white px-5 py-7 md:flex md:flex-col">
      <a href="#" class="mb-10 flex items-center gap-3 text-xl font-bold tracking-tight text-ink">
        <span class="grid size-10 place-items-center rounded-xl bg-brand text-white">${icon('plus', 'size-6')}</span>
        Atende<span class="-ml-3 text-brand">+</span>
      </a>
      <p class="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-muted">Menu</p>
      <nav class="space-y-1" aria-label="Navegação principal">
        <a href="#agenda" class="flex items-center gap-3 rounded-xl bg-brand-soft px-3 py-3 text-sm font-semibold text-brand-dark">${icon('grid')}Visão geral</a>
        <a href="#agenda" class="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted transition hover:bg-page hover:text-ink">${icon('calendar')}Consultas</a>
      </nav>
      <div class="mt-auto rounded-2xl bg-page p-4">
        <p class="text-sm font-semibold text-ink">Projeto acadêmico</p>
        <p class="mt-1 text-xs leading-5 text-muted">Dados fictícios, salvos apenas neste navegador.</p>
      </div>
    </aside>

    <main class="min-w-0 flex-1">
      <header class="flex items-center justify-between border-b border-line bg-white px-5 py-4 sm:px-8 lg:px-10">
        <div class="flex items-center gap-3">
          <span class="grid size-10 place-items-center rounded-xl bg-brand text-white md:hidden">${icon('plus')}</span>
          <div>
            <p class="text-sm font-semibold text-ink md:text-base">Atende<span class="text-brand">+</span></p>
            <p class="text-xs text-muted md:hidden">Agenda de consultas</p>
            <p class="hidden text-xs text-muted md:block">Painel de atendimento</p>
          </div>
        </div>
        <span class="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-2 text-xs font-medium text-brand-dark">
          <span class="size-2 rounded-full bg-brand"></span>Modo demonstração
        </span>
      </header>

      <div class="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <section class="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">AULA 07 · TAILWIND CSS</p>
            <h1 class="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Bom dia! <span aria-hidden="true">☀</span></h1>
            <p class="mt-2 text-sm text-muted">Acompanhe a agenda e organize os atendimentos de hoje.</p>
          </div>
          <button type="button" data-action="focus-form" class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-panel transition hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand/20">
            ${icon('plus', 'size-4')}Nova consulta
          </button>
        </section>

        <section class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumo da agenda">
          ${statCard({ id: 'stat-today', label: 'Consultas hoje', description: 'na agenda do dia', iconName: 'calendar', iconClasses: 'bg-brand-soft text-brand' })}
          ${statCard({ id: 'stat-waiting', label: 'Aguardando', description: 'precisam de confirmação', iconName: 'clock', iconClasses: 'bg-amber-soft text-amber-700' })}
          ${statCard({ id: 'stat-confirmed', label: 'Confirmadas', description: 'horários confirmados', iconName: 'check', iconClasses: 'bg-sky-50 text-sky-700' })}
          ${statCard({ id: 'stat-total', label: 'Total na agenda', description: 'todos os atendimentos', iconName: 'user', iconClasses: 'bg-violet-50 text-violet-700' })}
        </section>

        <section class="grid items-start gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.8fr)]">
          <div id="agenda" class="min-w-0 rounded-2xl border border-line bg-white shadow-panel">
            <div class="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div><h2 class="text-lg font-bold text-ink">Agenda de consultas</h2><p class="mt-1 text-xs text-muted">Consulte e atualize o status dos atendimentos.</p></div>
              <button type="button" data-action="clear-search" class="self-start rounded-lg p-2 text-muted transition hover:bg-page hover:text-ink sm:self-auto" aria-label="Limpar filtros">${icon('close')}</button>
            </div>
            <div class="grid gap-3 border-b border-line p-5 sm:grid-cols-[minmax(0,1fr)_190px] sm:px-6">
              <label class="flex h-11 items-center gap-2 rounded-xl border border-line px-3 text-muted focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
                ${icon('search', 'size-4 shrink-0')}
                <input id="search" type="search" class="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted" placeholder="Buscar por paciente ou especialidade" aria-label="Buscar consultas" />
              </label>
              <label class="sr-only" for="status-filter">Filtrar por status</label>
              <select id="status-filter" class="h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand focus:ring-4 focus:ring-brand/10">
                <option value="all">Todos os status</option>
                <option value="scheduled">Aguardando</option>
                <option value="confirmed">Confirmadas</option>
                <option value="completed">Concluídas</option>
                <option value="cancelled">Canceladas</option>
              </select>
            </div>
            <div id="feedback" class="hidden px-5 pt-4 sm:px-6" role="status" aria-live="polite"></div>
            <ul id="appointment-list" class="divide-y divide-line px-5 sm:px-6" aria-label="Lista de consultas"></ul>
            <div id="empty-state" class="hidden px-6 py-12 text-center">
              <span class="mx-auto grid size-12 place-items-center rounded-2xl bg-page text-muted">${icon('calendar', 'size-6')}</span>
              <h3 class="mt-4 text-sm font-semibold text-ink">Nenhuma consulta encontrada</h3>
              <p class="mt-1 text-xs text-muted">Tente outro filtro ou cadastre uma nova consulta.</p>
            </div>
          </div>

          <section id="new-appointment" class="rounded-2xl border border-line bg-white p-5 shadow-panel sm:p-6">
            <div class="mb-5 flex items-start justify-between gap-3">
              <div><p class="text-xs font-semibold uppercase tracking-widest text-brand">NOVO HORÁRIO</p><h2 class="mt-1 text-lg font-bold text-ink">Agendar consulta</h2></div>
              <span class="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">${icon('plus')}</span>
            </div>
            <form id="appointment-form" class="space-y-4">
              <div>
                <label for="patient" class="mb-1.5 block text-xs font-semibold text-ink">Paciente</label>
                <input id="patient" name="patient" type="text" maxlength="80" autocomplete="off" required placeholder="Nome fictício" class="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-4 focus:ring-brand/10" />
              </div>
              <div>
                <label for="specialty" class="mb-1.5 block text-xs font-semibold text-ink">Especialidade</label>
                <select id="specialty" name="specialty" class="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand focus:ring-4 focus:ring-brand/10">
                  <option>Clínica médica</option><option>Cardiologia</option><option>Pediatria</option><option>Dermatologia</option><option>Ortopedia</option><option>Oftalmologia</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div><label for="date" class="mb-1.5 block text-xs font-semibold text-ink">Data</label><input id="date" name="date" type="date" required class="h-11 w-full min-w-0 rounded-xl border border-line bg-white px-2 text-sm text-ink outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" /></div>
                <div><label for="time" class="mb-1.5 block text-xs font-semibold text-ink">Horário</label><input id="time" name="time" type="time" required class="h-11 w-full min-w-0 rounded-xl border border-line bg-white px-2 text-sm text-ink outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" /></div>
              </div>
              <p class="rounded-xl bg-page p-3 text-xs leading-5 text-muted">Use apenas dados fictícios. Este protótipo não é conectado a um serviço de saúde.</p>
              <button type="submit" class="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-panel transition hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand/20">
                ${icon('check', 'size-4')}Adicionar à agenda
              </button>
            </form>
          </section>
        </section>
        <footer class="mt-8 flex flex-col gap-2 border-t border-line pt-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Atende+ · Protótipo acadêmico com Tailwind CSS</p><p>Dados fictícios armazenados neste navegador.</p>
        </footer>
      </div>
    </main>
  </div>
`;

const form = document.querySelector('#appointment-form');
const list = document.querySelector('#appointment-list');
const searchInput = document.querySelector('#search');
const filterSelect = document.querySelector('#status-filter');
const feedback = document.querySelector('#feedback');
const emptyState = document.querySelector('#empty-state');
const dateInput = document.querySelector('#date');
dateInput.min = localDateOffset(0);

function showFeedback(message, isError = false) {
  feedback.textContent = message;
  feedback.className = `mx-5 mt-4 rounded-xl px-3 py-2 text-xs sm:mx-6 ${isError ? 'bg-rose-50 text-rose-700' : 'bg-brand-soft text-brand-dark'}`;
}

function persist(nextAppointments) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(nextAppointments));
  } catch (error) {
    console.error('Falha ao salvar os atendimentos locais.', error);
    showFeedback('Não foi possível salvar neste navegador. Seus dados não foram alterados.', true);
    return false;
  }
  appointments = nextAppointments;
  storageNotice = '';
  return true;
}

function render() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  const filtered = appointments
    .filter((appointment) => filterSelect.value === 'all' || appointment.status === filterSelect.value)
    .filter((appointment) => !query
      || appointment.patient.toLocaleLowerCase('pt-BR').includes(query)
      || appointment.specialty.toLocaleLowerCase('pt-BR').includes(query))
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  list.innerHTML = filtered.map(appointmentCard).join('');
  list.classList.toggle('hidden', filtered.length === 0);
  emptyState.classList.toggle('hidden', filtered.length !== 0);

  document.querySelector('#stat-today').textContent = appointments.filter((item) => item.date === localDateOffset(0)).length;
  document.querySelector('#stat-waiting').textContent = appointments.filter((item) => item.status === 'scheduled').length;
  document.querySelector('#stat-confirmed').textContent = appointments.filter((item) => item.status === 'confirmed').length;
  document.querySelector('#stat-total').textContent = appointments.length;

  if (storageNotice) showFeedback(storageNotice, true);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const patient = String(formData.get('patient') || '').trim();
  const specialty = String(formData.get('specialty') || '').trim();
  const date = String(formData.get('date') || '');
  const time = String(formData.get('time') || '');

  if (!patient || !specialty || !isValidDate(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    showFeedback('Preencha os campos com um nome fictício, uma data e um horário válidos.', true);
    return;
  }

  const appointment = {
    id: crypto.randomUUID(),
    patient,
    specialty,
    date,
    time,
    status: 'scheduled',
  };

  if (persist([...appointments, appointment])) {
    form.reset();
    dateInput.min = localDateOffset(0);
    dateInput.value = localDateOffset(0);
    render();
    showFeedback('Consulta adicionada à agenda.');
  }
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  if (button.dataset.action === 'focus-form') {
    document.querySelector('#new-appointment').scrollIntoView({ block: 'center' });
    document.querySelector('#patient').focus({ preventScroll: true });
    return;
  }

  if (button.dataset.action === 'clear-search') {
    searchInput.value = '';
    filterSelect.value = 'all';
    render();
    return;
  }

  const transitions = {
    confirm: { from: 'scheduled', to: 'confirmed', message: 'Consulta confirmada.' },
    complete: { from: 'confirmed', to: 'completed', message: 'Consulta concluída.' },
    cancel: { from: ['scheduled', 'confirmed'], to: 'cancelled', message: 'Consulta cancelada.' },
  };
  const transition = transitions[button.dataset.action];
  const appointment = appointments.find((item) => item.id === button.dataset.id);
  if (!transition || !appointment) return;
  const allowedFrom = Array.isArray(transition.from) ? transition.from : [transition.from];
  if (!allowedFrom.includes(appointment.status)) return;

  const nextAppointments = appointments.map((item) => (
    item.id === appointment.id ? { ...item, status: transition.to } : item
  ));
  if (persist(nextAppointments)) {
    render();
    showFeedback(transition.message);
  }
});

searchInput.addEventListener('input', render);
filterSelect.addEventListener('change', render);
dateInput.value = localDateOffset(0);
render();
