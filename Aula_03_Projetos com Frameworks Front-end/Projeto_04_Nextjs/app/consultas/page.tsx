import { AppointmentDashboard } from '@/components/appointment-dashboard';
import { createDemoAppointments, formatToday, getLocalDateValue } from '@/lib/appointments';

export const dynamic = 'force-dynamic';

export default function ConsultationsPage() {
  const today = getLocalDateValue();

  return (
    <AppointmentDashboard
      mode="appointments"
      initialToday={today}
      initialFormattedToday={formatToday(today)}
      initialAppointments={createDemoAppointments(today)}
    />
  );
}
