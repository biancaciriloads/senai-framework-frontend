import { afterNextRender, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
type StatusFilter = AppointmentStatus | 'all';

interface Appointment {
  id: string;
  patient: string;
  specialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

const storageKey = 'senai-hospital-appointments';

function localDateOffset(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function isAppointmentStatus(value: unknown): value is AppointmentStatus {
  return (
    value === 'scheduled' ||
    value === 'confirmed' ||
    value === 'completed' ||
    value === 'cancelled'
  );
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T12:00:00`);
  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === Number(value.slice(0, 4)) &&
    date.getMonth() + 1 === Number(value.slice(5, 7)) &&
    date.getDate() === Number(value.slice(8, 10))
  );
}

function isValidTime(value: unknown): value is string {
  return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function isAppointment(value: unknown): value is Appointment {
  if (typeof value !== 'object' || value === null) {
    return false;
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
  );
}

function isAppointmentList(value: unknown): value is Appointment[] {
  return Array.isArray(value) && value.every(isAppointment);
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly appointments = signal<Appointment[]>([]);
  protected readonly storageError = signal('');
  protected readonly notice = signal('');
  protected readonly noticeType = signal<'success' | 'error'>('success');
  protected readonly query = signal('');
  protected readonly selectedStatus = signal<StatusFilter>('all');
  protected readonly today = signal('');
  protected readonly formattedToday = signal('');

  protected readonly statusLabels: Record<AppointmentStatus, string> = {
    scheduled: 'Aguardando',
    confirmed: 'Confirmada',
    completed: 'Concluída',
    cancelled: 'Cancelada',
  };

  protected readonly statusOptions: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'Todos os status' },
    { value: 'scheduled', label: 'Aguardando' },
    { value: 'confirmed', label: 'Confirmadas' },
    { value: 'completed', label: 'Concluídas' },
    { value: 'cancelled', label: 'Canceladas' },
  ];

  protected newAppointment = {
    patient: '',
    specialty: 'Clínica médica',
    date: '',
    time: '09:00',
  };

  protected readonly todayCount = computed(
    () => this.appointments().filter((appointment) => appointment.date === this.today()).length,
  );
  protected readonly waitingCount = computed(
    () => this.appointments().filter((appointment) => appointment.status === 'scheduled').length,
  );
  protected readonly confirmedCount = computed(
    () => this.appointments().filter((appointment) => appointment.status === 'confirmed').length,
  );
  protected readonly visibleAppointments = computed(() => {
    const search = this.query().trim().toLocaleLowerCase('pt-BR');

    return this.appointments()
      .filter((appointment) => {
        const matchesSearch =
          search.length === 0 ||
          appointment.patient.toLocaleLowerCase('pt-BR').includes(search) ||
          appointment.specialty.toLocaleLowerCase('pt-BR').includes(search);
        const matchesStatus =
          this.selectedStatus() === 'all' || appointment.status === this.selectedStatus();

        return matchesSearch && matchesStatus;
      })
      .slice()
      .sort(
        (first, second) =>
          first.date.localeCompare(second.date) || first.time.localeCompare(second.time),
      );
  });

  constructor() {
    afterNextRender(() => this.restoreAppointments());
  }

  protected createAppointment(): void {
    const patient = this.newAppointment.patient.trim();
    if (patient.length < 2) {
      this.notice.set('Informe o nome do paciente com pelo menos duas letras.');
      this.noticeType.set('error');
      return;
    }

    if (!isValidDate(this.newAppointment.date) || this.newAppointment.date < this.today()) {
      this.notice.set('Escolha uma data válida igual ou posterior a hoje.');
      this.noticeType.set('error');
      return;
    }

    if (!isValidTime(this.newAppointment.time)) {
      this.notice.set('Informe um horário válido.');
      this.noticeType.set('error');
      return;
    }

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      patient,
      specialty: this.newAppointment.specialty,
      date: this.newAppointment.date,
      time: this.newAppointment.time,
      status: 'scheduled',
    };

    const saved = this.persistAppointments([...this.appointments(), appointment]);
    this.notice.set(
      saved
        ? 'Consulta adicionada à agenda.'
        : 'Consulta adicionada nesta sessão, mas não foi salva no navegador.',
    );
    this.noticeType.set(saved ? 'success' : 'error');
    this.newAppointment = {
      patient: '',
      specialty: 'Clínica médica',
      date: '',
      time: '09:00',
    };
  }

  protected updateStatus(id: string, status: AppointmentStatus): void {
    const appointmentExists = this.appointments().some((appointment) => appointment.id === id);
    if (!appointmentExists) {
      this.notice.set('A consulta selecionada não foi encontrada.');
      this.noticeType.set('error');
      return;
    }

    const saved = this.persistAppointments(
      this.appointments().map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment,
      ),
    );
    this.notice.set(
      saved
        ? `Status atualizado para ${this.statusLabels[status].toLocaleLowerCase('pt-BR')}.`
        : 'Status atualizado nesta sessão, mas não foi salvo no navegador.',
    );
    this.noticeType.set(saved ? 'success' : 'error');
  }

  protected formatDate(value: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    })
      .format(new Date(`${value}T12:00:00`))
      .replace('.', '');
  }

  private restoreAppointments(): void {
    const today = localDateOffset(0);
    this.today.set(today);
    this.formattedToday.set(
      new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(new Date()),
    );

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === null) {
        this.appointments.set(this.createDemoAppointments(today));
        return;
      }

      const parsed: unknown = JSON.parse(stored);
      if (isAppointmentList(parsed)) {
        this.appointments.set(parsed);
        return;
      }

      this.storageError.set(
        'Os dados salvos não estão no formato esperado. Cadastre uma nova consulta para continuar.',
      );
    } catch (error) {
      console.error('Não foi possível carregar as consultas salvas.', error);
      this.storageError.set('Não foi possível acessar as consultas salvas neste navegador.');
    }
  }

  private createDemoAppointments(today: string): Appointment[] {
    return [
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
    ];
  }

  private persistAppointments(nextAppointments: Appointment[]): boolean {
    this.appointments.set(nextAppointments);

    try {
      localStorage.setItem(storageKey, JSON.stringify(nextAppointments));
      this.storageError.set('');
      return true;
    } catch (error) {
      console.error('Não foi possível salvar as consultas neste navegador.', error);
      this.storageError.set(
        'A alteração ficou apenas nesta sessão e não pôde ser salva no navegador.',
      );
      return false;
    }
  }
}
