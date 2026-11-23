export const appointmentStorageKey = 'senai-hospital-appointments';

export const specialties = [
  'Clínica médica',
  'Cardiologia',
  'Pediatria',
  'Ortopedia',
  'Dermatologia',
  'Enfermagem',
] as const;

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
export type StatusFilter = AppointmentStatus | 'all';
export type Specialty = (typeof specialties)[number];

export interface Appointment {
  id: string;
  patient: string;
  specialty: Specialty;
  date: string;
  time: string;
  status: AppointmentStatus;
}

export const statusLabels: Record<AppointmentStatus, string> = {
  scheduled: 'Aguardando',
  confirmed: 'Confirmada',
  completed: 'Concluída',
  cancelled: 'Cancelada',
};

export const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Todos os status' },
  { value: 'scheduled', label: 'Aguardando' },
  { value: 'confirmed', label: 'Confirmadas' },
  { value: 'completed', label: 'Concluídas' },
  { value: 'cancelled', label: 'Canceladas' },
];

export function getLocalDateValue(date = new Date(), offset = 0): string {
  const localDate = new Date(date);
  localDate.setDate(localDate.getDate() + offset);

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function isValidDate(value: unknown): value is string {
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

export function isValidTime(value: unknown): value is string {
  return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function validateAppointment(
  patient: string,
  date: string,
  time: string,
  today: string,
): string | null {
  const name = patient.trim();
  if (name.length < 2 || name.length > 80) {
    return 'Informe o nome do paciente com 2 a 80 caracteres.';
  }

  if (!isValidDate(date) || date < today) {
    return 'Escolha uma data válida igual ou posterior a hoje.';
  }

  if (!isValidTime(time)) {
    return 'Informe um horário válido.';
  }

  return null;
}

function isAppointmentStatus(value: unknown): value is AppointmentStatus {
  return (
    value === 'scheduled' ||
    value === 'confirmed' ||
    value === 'completed' ||
    value === 'cancelled'
  );
}

export function isStatusFilter(value: unknown): value is StatusFilter {
  return value === 'all' || isAppointmentStatus(value);
}

export function isSpecialty(value: unknown): value is Specialty {
  return specialties.some((specialty) => specialty === value);
}

function isAppointment(value: unknown): value is Appointment {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return (
    'id' in value &&
    typeof value.id === 'string' &&
    value.id.length > 0 &&
    'patient' in value &&
    typeof value.patient === 'string' &&
    value.patient.trim().length >= 2 &&
    value.patient.length <= 80 &&
    'specialty' in value &&
    isSpecialty(value.specialty) &&
    'date' in value &&
    isValidDate(value.date) &&
    'time' in value &&
    isValidTime(value.time) &&
    'status' in value &&
    isAppointmentStatus(value.status)
  );
}

export function isAppointmentList(value: unknown): value is Appointment[] {
  return Array.isArray(value) && value.every(isAppointment);
}

export function createDemoAppointments(today: string): Appointment[] {
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
      date: getLocalDateValue(new Date(`${today}T12:00:00`), 1),
      time: '14:00',
      status: 'scheduled',
    },
  ];
}

export function formatAppointmentDate(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
    .format(new Date(`${value}T12:00:00`))
    .replace(/\.$/, '');
}

export function formatToday(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${value}T12:00:00`));
}
