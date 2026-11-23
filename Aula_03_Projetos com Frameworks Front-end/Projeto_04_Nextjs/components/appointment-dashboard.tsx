'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { Appointment, AppointmentStatus, Specialty, StatusFilter } from '@/lib/appointments';
import {
  appointmentStorageKey,
  createDemoAppointments,
  formatAppointmentDate,
  formatToday,
  getLocalDateValue,
  isAppointmentList,
  isSpecialty,
  isStatusFilter,
  specialties,
  statusLabels,
  statusOptions,
  validateAppointment,
} from '@/lib/appointments';

type DashboardMode = 'overview' | 'appointments';

interface AppointmentDashboardProps {
  mode: DashboardMode;
  initialToday: string;
  initialFormattedToday: string;
  initialAppointments: Appointment[];
}

export function AppointmentDashboard({
  mode,
  initialToday,
  initialFormattedToday,
  initialAppointments,
}: AppointmentDashboardProps) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [storageError, setStorageError] = useState('');
  const [notice, setNotice] = useState('');
  const [noticeType, setNoticeType] = useState<'success' | 'error'>('success');
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [today, setToday] = useState(initialToday);
  const [formattedToday, setFormattedToday] = useState(initialFormattedToday);
  const [newAppointment, setNewAppointment] = useState<{
    patient: string;
    specialty: Specialty;
    date: string;
    time: string;
  }>({
    patient: '',
    specialty: specialties[0],
    date: initialToday,
    time: '09:00',
  });

  // Browser storage is restored after SSR so the server and hydration render the same markup.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const localToday = getLocalDateValue();
    setToday(localToday);
    setFormattedToday(formatToday(localToday));
    setNewAppointment((current) => ({ ...current, date: localToday }));

    try {
      const stored = window.localStorage.getItem(appointmentStorageKey);
      if (stored === null) {
        setAppointments(createDemoAppointments(localToday));
        return;
      }

      const parsed: unknown = JSON.parse(stored);
      if (isAppointmentList(parsed)) {
        setAppointments(parsed);
        return;
      }

      setStorageError(
        'Os dados salvos não estão no formato esperado. Cadastre uma nova consulta para continuar.',
      );
    } catch (error) {
      console.error('Não foi possível carregar as consultas salvas.', error);
      setStorageError('Não foi possível acessar as consultas salvas neste navegador.');
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const todayCount = useMemo(
    () => appointments.filter((appointment) => appointment.date === today).length,
    [appointments, today],
  );
  const waitingCount = useMemo(
    () => appointments.filter((appointment) => appointment.status === 'scheduled').length,
    [appointments],
  );
  const confirmedCount = useMemo(
    () => appointments.filter((appointment) => appointment.status === 'confirmed').length,
    [appointments],
  );
  const visibleAppointments = useMemo(() => {
    const search = query.trim().toLocaleLowerCase('pt-BR');

    return appointments
      .filter((appointment) => {
        const matchesSearch =
          search.length === 0 ||
          appointment.patient.toLocaleLowerCase('pt-BR').includes(search) ||
          appointment.specialty.toLocaleLowerCase('pt-BR').includes(search);
        const matchesStatus =
          selectedStatus === 'all' || appointment.status === selectedStatus;

        return matchesSearch && matchesStatus;
      })
      .slice()
      .sort(
        (first, second) =>
          first.date.localeCompare(second.date) || first.time.localeCompare(second.time),
      );
  }, [appointments, query, selectedStatus]);

  function persistAppointments(nextAppointments: Appointment[]): boolean {
    setAppointments(nextAppointments);

    try {
      window.localStorage.setItem(appointmentStorageKey, JSON.stringify(nextAppointments));
      setStorageError('');
      return true;
    } catch (error) {
      console.error('Não foi possível salvar as consultas neste navegador.', error);
      setStorageError('A alteração ficou apenas nesta sessão e não pôde ser salva no navegador.');
      return false;
    }
  }

  function handleCreateAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateAppointment(
      newAppointment.patient,
      newAppointment.date,
      newAppointment.time,
      today,
    );
    if (validationError) {
      setNotice(validationError);
      setNoticeType('error');
      return;
    }

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      patient: newAppointment.patient.trim(),
      specialty: newAppointment.specialty,
      date: newAppointment.date,
      time: newAppointment.time,
      status: 'scheduled',
    };
    const saved = persistAppointments([...appointments, appointment]);

    setNotice(
      saved
        ? 'Consulta adicionada à agenda.'
        : 'Consulta adicionada nesta sessão, mas não foi salva no navegador.',
    );
    setNoticeType(saved ? 'success' : 'error');
    setNewAppointment({
      patient: '',
      specialty: specialties[0],
      date: today,
      time: '09:00',
    });
  }

  function updateStatus(id: string, status: AppointmentStatus) {
    const appointmentExists = appointments.some((appointment) => appointment.id === id);
    if (!appointmentExists) {
      setNotice('A consulta selecionada não foi encontrada.');
      setNoticeType('error');
      return;
    }

    const saved = persistAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment,
      ),
    );
    setNotice(
      saved
        ? `Status atualizado para ${statusLabels[status].toLocaleLowerCase('pt-BR')}.`
        : 'Status atualizado nesta sessão, mas não foi salvo no navegador.',
    );
    setNoticeType(saved ? 'success' : 'error');
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navegação principal">
        <Link className="brand" href="/" aria-label="Atende+, início">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">
            atende<span>+</span>
          </span>
        </Link>

        <div className="sidebar-caption">GESTÃO HOSPITALAR</div>
        <nav className="navigation">
          <Link
            className={`navigation-link${mode === 'overview' ? ' is-active' : ''}`}
            href="/"
            aria-current={mode === 'overview' ? 'page' : undefined}
          >
            <span className="navigation-icon" aria-hidden="true">
              ⌂
            </span>
            Visão geral
          </Link>
          <Link
            className={`navigation-link${mode === 'appointments' ? ' is-active' : ''}`}
            href="/consultas"
            aria-current={mode === 'appointments' ? 'page' : undefined}
          >
            <span className="navigation-icon" aria-hidden="true">
              ▦
            </span>
            Consultas
          </Link>
          <Link
            className="navigation-link"
            href={mode === 'overview' ? '#novo-agendamento' : '/#novo-agendamento'}
          >
            <span className="navigation-icon" aria-hidden="true">
              ＋
            </span>
            Novo agendamento
          </Link>
        </nav>

        <div className="sidebar-note">
          <span className="note-icon" aria-hidden="true">
            +
          </span>
          <p>Organização simples para um atendimento mais humano.</p>
        </div>
        <div className="sidebar-footer">Projeto acadêmico · SENAI</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-date">
            <span className="date-dot" aria-hidden="true" />
            {formattedToday}
          </div>
        </header>

        <section className="page-heading" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">PAINEL DE ATENDIMENTO</p>
            <h1 id="page-title">
              {mode === 'overview' ? 'Olá, equipe' : 'Agenda de consultas'}{' '}
              {mode === 'overview' && <span aria-hidden="true">👋</span>}
            </h1>
            <p className="page-subtitle">
              Acompanhe a agenda e organize os próximos atendimentos.
            </p>
          </div>
          <a className="primary-button heading-action" href="#novo-agendamento">
            <span aria-hidden="true">＋</span>
            Nova consulta
          </a>
        </section>

        {storageError && (
          <div className="storage-alert" role="alert">
            <span aria-hidden="true">!</span>
            {storageError}
          </div>
        )}

        <section className="stats-grid" aria-label="Resumo das consultas">
          <article className="stat-card">
            <div className="stat-icon stat-icon--blue" aria-hidden="true">
              ▦
            </div>
            <div>
              <p className="stat-label">Consultas hoje</p>
              <p className="stat-value">{todayCount}</p>
            </div>
            <span className="stat-caption">na agenda</span>
          </article>
          <article className="stat-card">
            <div className="stat-icon stat-icon--amber" aria-hidden="true">
              ◷
            </div>
            <div>
              <p className="stat-label">Aguardando</p>
              <p className="stat-value">{waitingCount}</p>
            </div>
            <span className="stat-caption">confirmação</span>
          </article>
          <article className="stat-card">
            <div className="stat-icon stat-icon--green" aria-hidden="true">
              ✓
            </div>
            <div>
              <p className="stat-label">Confirmadas</p>
              <p className="stat-value">{confirmedCount}</p>
            </div>
            <span className="stat-caption">atendimentos</span>
          </article>
        </section>

        <section className="workspace-grid">
          <section id="agenda" className="panel appointments-panel" aria-labelledby="agenda-title">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">ACOMPANHAMENTO</p>
                <h2 id="agenda-title">Agenda de consultas</h2>
              </div>
              <span className="appointment-total">{appointments.length} registros</span>
            </div>

            <div className="filters">
              <label className="search-field">
                <span className="sr-only">Buscar por paciente ou especialidade</span>
                <span className="search-icon" aria-hidden="true">
                  ⌕
                </span>
                <input
                  type="search"
                  name="query"
                  placeholder="Buscar paciente ou especialidade"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <label className="filter-field">
                <span className="sr-only">Filtrar consultas por status</span>
                <select
                  name="status"
                  value={selectedStatus}
                  onChange={(event) => {
                    if (isStatusFilter(event.target.value)) {
                      setSelectedStatus(event.target.value);
                    }
                  }}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {notice && (
              <p
                className={`notice notice--${noticeType}`}
                role={noticeType === 'error' ? 'alert' : 'status'}
              >
                {notice}
              </p>
            )}

            {visibleAppointments.length > 0 ? (
              <div className="appointment-list">
                {visibleAppointments.map((appointment) => (
                  <article className="appointment-card" key={appointment.id}>
                    <div className="appointment-time">
                      <span>{appointment.time}</span>
                      <span>{formatAppointmentDate(appointment.date)}</span>
                    </div>
                    <div className="appointment-person">
                      <span className="avatar" aria-hidden="true">
                        {appointment.patient.slice(0, 1).toLocaleUpperCase('pt-BR')}
                      </span>
                      <div>
                        <h3>{appointment.patient}</h3>
                        <p>{appointment.specialty}</p>
                      </div>
                    </div>
                    <span className={`status-badge status--${appointment.status}`}>
                      {statusLabels[appointment.status]}
                    </span>
                    <div className="appointment-actions">
                      {appointment.status === 'scheduled' && (
                        <button
                          className="text-button"
                          type="button"
                          onClick={() => updateStatus(appointment.id, 'confirmed')}
                        >
                          Confirmar
                        </button>
                      )}
                      {appointment.status === 'confirmed' && (
                        <button
                          className="text-button"
                          type="button"
                          onClick={() => updateStatus(appointment.id, 'completed')}
                        >
                          Concluir
                        </button>
                      )}
                      {(appointment.status === 'scheduled' ||
                        appointment.status === 'confirmed') && (
                        <button
                          className="cancel-button"
                          type="button"
                          onClick={() => updateStatus(appointment.id, 'cancelled')}
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon" aria-hidden="true">
                  ⌕
                </span>
                <h3>Nenhuma consulta encontrada</h3>
                <p>Ajuste os filtros ou cadastre uma nova consulta para a agenda.</p>
              </div>
            )}
          </section>

          <section
            id="novo-agendamento"
            className="panel form-panel"
            aria-labelledby="form-title"
          >
            <div className="panel-heading">
              <div>
                <p className="eyebrow">AGENDA</p>
                <h2 id="form-title">Nova consulta</h2>
              </div>
              <span className="form-heading-icon" aria-hidden="true">
                ＋
              </span>
            </div>
            <p className="form-description">Preencha os dados para incluir um atendimento.</p>

            <form className="appointment-form" onSubmit={handleCreateAppointment}>
              <label className="form-field" htmlFor="patient">
                <span>Nome do paciente</span>
                <input
                  id="patient"
                  value={newAppointment.patient}
                  onChange={(event) =>
                    setNewAppointment((current) => ({ ...current, patient: event.target.value }))
                  }
                  type="text"
                  name="patient"
                  placeholder="Ex.: Joana Silva"
                  autoComplete="name"
                  minLength={2}
                  maxLength={80}
                  required
                />
              </label>

              <label className="form-field" htmlFor="specialty">
                <span>Especialidade</span>
                <select
                  id="specialty"
                  value={newAppointment.specialty}
                  onChange={(event) => {
                    const specialty = event.target.value;
                    if (isSpecialty(specialty)) {
                      setNewAppointment((current) => ({
                        ...current,
                        specialty,
                      }));
                    }
                  }}
                  name="specialty"
                  required
                >
                  {specialties.map((specialty) => (
                    <option key={specialty}>{specialty}</option>
                  ))}
                </select>
              </label>

              <div className="form-row">
                <label className="form-field" htmlFor="date">
                  <span>Data</span>
                  <input
                    id="date"
                    value={newAppointment.date}
                    onChange={(event) =>
                      setNewAppointment((current) => ({ ...current, date: event.target.value }))
                    }
                    type="date"
                    name="date"
                    min={today}
                    required
                  />
                </label>
                <label className="form-field" htmlFor="time">
                  <span>Horário</span>
                  <input
                    id="time"
                    value={newAppointment.time}
                    onChange={(event) =>
                      setNewAppointment((current) => ({ ...current, time: event.target.value }))
                    }
                    type="time"
                    name="time"
                    required
                  />
                </label>
              </div>

              <button className="primary-button submit-button" type="submit">
                <span aria-hidden="true">＋</span>
                Adicionar à agenda
              </button>
            </form>

            <div className="privacy-note">
              <span aria-hidden="true">ⓘ</span>
              Os dados deste protótipo ficam salvos apenas neste navegador.
            </div>
          </section>
        </section>

        <footer className="page-footer">
          <span>Atende+ · Protótipo acadêmico</span>
          <span>Next.js 16 + React 19</span>
        </footer>
      </main>
    </div>
  );
}
