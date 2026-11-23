<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
type StatusFilter = AppointmentStatus | 'all'

interface Appointment {
  id: string
  patient: string
  specialty: string
  date: string
  time: string
  status: AppointmentStatus
}

const storageKey = 'senai-hospital-appointments'
const storageError = ref('')
const notice = ref('')
const noticeType = ref<'success' | 'error'>('success')
const query = ref('')
const selectedStatus = ref<StatusFilter>('all')

function localDateOffset(offset: number): string {
  const date = new Date()
  date.setDate(date.getDate() + offset)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const today = localDateOffset(0)
const demoAppointments: Appointment[] = [
  {
    id: 'demo-1',
    patient: 'Ana Souza',
    specialty: 'Cardiologia',
    date: today,
    time: '09:00',
    status: 'confirmed',
  },
  {
    id: 'demo-2',
    patient: 'Lucas Martins',
    specialty: 'Clínica médica',
    date: today,
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
]

function isAppointmentStatus(value: unknown): value is AppointmentStatus {
  return (
    value === 'scheduled' ||
    value === 'confirmed' ||
    value === 'completed' ||
    value === 'cancelled'
  )
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T12:00:00`)
  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === Number(value.slice(0, 4)) &&
    date.getMonth() + 1 === Number(value.slice(5, 7)) &&
    date.getDate() === Number(value.slice(8, 10))
  )
}

function isValidTime(value: unknown): value is string {
  return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
}

function isAppointment(value: unknown): value is Appointment {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return (
    'id' in value &&
    typeof value.id === 'string' &&
    'patient' in value &&
    typeof value.patient === 'string' &&
    'specialty' in value &&
    typeof value.specialty === 'string' &&
    'date' in value &&
    isValidDate(value.date) &&
    'time' in value &&
    isValidTime(value.time) &&
    'status' in value &&
    isAppointmentStatus(value.status)
  )
}

function isAppointmentList(value: unknown): value is Appointment[] {
  return Array.isArray(value) && value.every(isAppointment)
}

function loadAppointments(): Appointment[] {
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored === null) {
      return [...demoAppointments]
    }

    const parsed: unknown = JSON.parse(stored)
    if (isAppointmentList(parsed)) {
      return parsed
    }

    storageError.value = 'Os dados salvos não estão no formato esperado. Cadastre uma nova consulta para continuar.'
    return []
  } catch (error) {
    console.error('Não foi possível carregar as consultas salvas.', error)
    storageError.value = 'Não foi possível acessar as consultas salvas neste navegador.'
    return []
  }
}

const appointments = ref<Appointment[]>(loadAppointments())

const statusLabels: Record<AppointmentStatus, string> = {
  scheduled: 'Aguardando',
  confirmed: 'Confirmada',
  completed: 'Concluída',
  cancelled: 'Cancelada',
}

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Todos os status' },
  { value: 'scheduled', label: 'Aguardando' },
  { value: 'confirmed', label: 'Confirmadas' },
  { value: 'completed', label: 'Concluídas' },
  { value: 'cancelled', label: 'Canceladas' },
]

const form = reactive({
  patient: '',
  specialty: 'Clínica médica',
  date: today,
  time: '09:00',
})

const todayCount = computed(
  () => appointments.value.filter((appointment) => appointment.date === today).length,
)
const waitingCount = computed(
  () => appointments.value.filter((appointment) => appointment.status === 'scheduled').length,
)
const confirmedCount = computed(
  () => appointments.value.filter((appointment) => appointment.status === 'confirmed').length,
)
const visibleAppointments = computed(() => {
  const search = query.value.trim().toLocaleLowerCase('pt-BR')

  return appointments.value
    .filter((appointment) => {
      const matchesSearch =
        search.length === 0 ||
        appointment.patient.toLocaleLowerCase('pt-BR').includes(search) ||
        appointment.specialty.toLocaleLowerCase('pt-BR').includes(search)
      const matchesStatus =
        selectedStatus.value === 'all' || appointment.status === selectedStatus.value

      return matchesSearch && matchesStatus
    })
    .slice()
    .sort(
      (first, second) =>
        first.date.localeCompare(second.date) || first.time.localeCompare(second.time),
    )
})

const formattedToday = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(new Date())

function persistAppointments(nextAppointments: Appointment[]): boolean {
  appointments.value = nextAppointments

  try {
    localStorage.setItem(storageKey, JSON.stringify(nextAppointments))
    storageError.value = ''
    return true
  } catch (error) {
    console.error('Não foi possível salvar as consultas neste navegador.', error)
    storageError.value = 'A alteração ficou apenas nesta sessão e não pôde ser salva no navegador.'
    return false
  }
}

function createAppointment(): void {
  const patient = form.patient.trim()
  if (patient.length < 2) {
    notice.value = 'Informe o nome do paciente com pelo menos duas letras.'
    noticeType.value = 'error'
    return
  }

  if (!isValidDate(form.date) || form.date < today) {
    notice.value = 'Escolha uma data válida igual ou posterior a hoje.'
    noticeType.value = 'error'
    return
  }

  if (!isValidTime(form.time)) {
    notice.value = 'Informe um horário válido.'
    noticeType.value = 'error'
    return
  }

  const appointment: Appointment = {
    id: crypto.randomUUID(),
    patient,
    specialty: form.specialty,
    date: form.date,
    time: form.time,
    status: 'scheduled',
  }

  const saved = persistAppointments([...appointments.value, appointment])
  notice.value = saved
    ? 'Consulta adicionada à agenda.'
    : 'Consulta adicionada nesta sessão, mas não foi salva no navegador.'
  noticeType.value = saved ? 'success' : 'error'
  form.patient = ''
  form.specialty = 'Clínica médica'
  form.date = today
  form.time = '09:00'
}

function updateStatus(id: string, status: AppointmentStatus): void {
  const appointmentExists = appointments.value.some((appointment) => appointment.id === id)
  if (!appointmentExists) {
    notice.value = 'A consulta selecionada não foi encontrada.'
    noticeType.value = 'error'
    return
  }

  const saved = persistAppointments(
    appointments.value.map((appointment) =>
      appointment.id === id ? { ...appointment, status } : appointment,
    ),
  )
  notice.value = saved
    ? `Status atualizado para ${statusLabels[status].toLocaleLowerCase('pt-BR')}.`
    : 'Status atualizado nesta sessão, mas não foi salvo no navegador.'
  noticeType.value = saved ? 'success' : 'error'
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
    .format(new Date(`${value}T12:00:00`))
    .replace('.', '')
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar" aria-label="Navegação principal">
      <a class="brand" href="#inicio" aria-label="Atende, início">
        <span class="brand-mark" aria-hidden="true"><span></span></span>
        <span class="brand-name">atende<span>+</span></span>
      </a>

      <div class="sidebar-caption">GESTÃO HOSPITALAR</div>
      <nav class="navigation">
        <a class="navigation-link is-active" href="#inicio">
          <span class="navigation-icon" aria-hidden="true">⌂</span>
          Visão geral
        </a>
        <a class="navigation-link" href="#agenda">
          <span class="navigation-icon" aria-hidden="true">▦</span>
          Consultas
        </a>
        <a class="navigation-link" href="#novo-agendamento">
          <span class="navigation-icon" aria-hidden="true">＋</span>
          Novo agendamento
        </a>
      </nav>

      <div class="sidebar-note">
        <span class="note-icon" aria-hidden="true">+</span>
        <p>Organização simples para um atendimento mais humano.</p>
      </div>
      <div class="sidebar-footer">Projeto acadêmico · SENAI</div>
    </aside>

    <main id="inicio" class="main-content">
      <header class="topbar">
        <div class="mobile-brand">
          <span class="brand-mark" aria-hidden="true"><span></span></span>
          <span class="brand-name">atende<span>+</span></span>
        </div>
        <div class="topbar-date">
          <span class="date-dot" aria-hidden="true"></span>
          {{ formattedToday }}
        </div>
      </header>

      <section class="page-heading" aria-labelledby="page-title">
        <div>
          <p class="eyebrow">PAINEL DE ATENDIMENTO</p>
          <h1 id="page-title">Olá, equipe <span>👋</span></h1>
          <p class="page-subtitle">Acompanhe a agenda e organize os próximos atendimentos.</p>
        </div>
        <a class="primary-button heading-action" href="#novo-agendamento">
          <span aria-hidden="true">＋</span>
          Nova consulta
        </a>
      </section>

      <div v-if="storageError" class="storage-alert" role="alert">
        <span aria-hidden="true">!</span>
        {{ storageError }}
      </div>

      <section class="stats-grid" aria-label="Resumo das consultas">
        <article class="stat-card">
          <div class="stat-icon stat-icon--blue" aria-hidden="true">▦</div>
          <div>
            <p class="stat-label">Consultas hoje</p>
            <p class="stat-value">{{ todayCount }}</p>
          </div>
          <span class="stat-caption">na agenda</span>
        </article>
        <article class="stat-card">
          <div class="stat-icon stat-icon--amber" aria-hidden="true">◷</div>
          <div>
            <p class="stat-label">Aguardando</p>
            <p class="stat-value">{{ waitingCount }}</p>
          </div>
          <span class="stat-caption">confirmação</span>
        </article>
        <article class="stat-card">
          <div class="stat-icon stat-icon--green" aria-hidden="true">✓</div>
          <div>
            <p class="stat-label">Confirmadas</p>
            <p class="stat-value">{{ confirmedCount }}</p>
          </div>
          <span class="stat-caption">atendimentos</span>
        </article>
      </section>

      <section class="workspace-grid">
        <section id="agenda" class="panel appointments-panel" aria-labelledby="agenda-title">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">ACOMPANHAMENTO</p>
              <h2 id="agenda-title">Agenda de consultas</h2>
            </div>
            <span class="appointment-total">{{ appointments.length }} registros</span>
          </div>

          <div class="filters">
            <label class="search-field">
              <span class="sr-only">Buscar por paciente ou especialidade</span>
              <span class="search-icon" aria-hidden="true">⌕</span>
              <input
                v-model="query"
                type="search"
                placeholder="Buscar paciente ou especialidade"
              />
            </label>
            <label class="filter-field">
              <span class="sr-only">Filtrar consultas por status</span>
              <select v-model="selectedStatus">
                <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>
          </div>

          <p v-if="notice" class="notice" :class="`notice--${noticeType}`" role="status">
            {{ notice }}
          </p>

          <div v-if="visibleAppointments.length > 0" class="appointment-list">
            <article
              v-for="appointment in visibleAppointments"
              :key="appointment.id"
              class="appointment-card"
            >
              <div class="appointment-time">
                <span>{{ appointment.time }}</span>
                <span>{{ formatDate(appointment.date) }}</span>
              </div>
              <div class="appointment-person">
                <span class="avatar" aria-hidden="true">
                  {{ appointment.patient.slice(0, 1).toLocaleUpperCase('pt-BR') }}
                </span>
                <div>
                  <h3>{{ appointment.patient }}</h3>
                  <p>{{ appointment.specialty }}</p>
                </div>
              </div>
              <span class="status-badge" :class="`status--${appointment.status}`">
                {{ statusLabels[appointment.status] }}
              </span>
              <div class="appointment-actions">
                <button
                  v-if="appointment.status === 'scheduled'"
                  class="text-button"
                  type="button"
                  @click="updateStatus(appointment.id, 'confirmed')"
                >
                  Confirmar
                </button>
                <button
                  v-if="appointment.status === 'confirmed'"
                  class="text-button"
                  type="button"
                  @click="updateStatus(appointment.id, 'completed')"
                >
                  Concluir
                </button>
                <button
                  v-if="appointment.status === 'scheduled' || appointment.status === 'confirmed'"
                  class="cancel-button"
                  type="button"
                  @click="updateStatus(appointment.id, 'cancelled')"
                >
                  Cancelar
                </button>
              </div>
            </article>
          </div>
          <div v-else class="empty-state">
            <span class="empty-icon" aria-hidden="true">⌕</span>
            <h3>Nenhuma consulta encontrada</h3>
            <p>Ajuste os filtros ou cadastre uma nova consulta para a agenda.</p>
          </div>
        </section>

        <section id="novo-agendamento" class="panel form-panel" aria-labelledby="form-title">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">AGENDA</p>
              <h2 id="form-title">Nova consulta</h2>
            </div>
            <span class="form-heading-icon" aria-hidden="true">＋</span>
          </div>
          <p class="form-description">Preencha os dados para incluir um atendimento.</p>

          <form class="appointment-form" @submit.prevent="createAppointment">
            <label class="form-field">
              <span>Nome do paciente</span>
              <input
                v-model="form.patient"
                type="text"
                name="patient"
                placeholder="Ex.: Joana Silva"
                autocomplete="name"
                minlength="2"
                maxlength="80"
                required
              />
            </label>

            <label class="form-field">
              <span>Especialidade</span>
              <select v-model="form.specialty" name="specialty" required>
                <option>Clínica médica</option>
                <option>Cardiologia</option>
                <option>Pediatria</option>
                <option>Ortopedia</option>
                <option>Dermatologia</option>
                <option>Enfermagem</option>
              </select>
            </label>

            <div class="form-row">
              <label class="form-field">
                <span>Data</span>
                <input v-model="form.date" type="date" name="date" :min="today" required />
              </label>
              <label class="form-field">
                <span>Horário</span>
                <input v-model="form.time" type="time" name="time" required />
              </label>
            </div>

            <button class="primary-button submit-button" type="submit">
              <span aria-hidden="true">＋</span>
              Adicionar à agenda
            </button>
          </form>

          <div class="privacy-note">
            <span aria-hidden="true">ⓘ</span>
            Os dados deste protótipo ficam salvos apenas neste navegador.
          </div>
        </section>
      </section>

      <footer class="page-footer">
        <span>Atende+ · Protótipo acadêmico</span>
        <span>Vue 3 + TypeScript + Vite</span>
      </footer>
    </main>
  </div>
</template>
