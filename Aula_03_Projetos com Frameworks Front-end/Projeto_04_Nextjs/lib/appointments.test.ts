import { describe, expect, it } from 'vitest';
import {
  createDemoAppointments,
  getLocalDateValue,
  isAppointmentList,
  isValidDate,
  isValidTime,
  validateAppointment,
} from './appointments';

describe('appointment helpers', () => {
  it('formats a local date without shifting calendar days', () => {
    expect(getLocalDateValue(new Date(2026, 10, 23, 12))).toBe('2026-11-23');
  });

  it('rejects impossible dates and accepts leap days', () => {
    expect(isValidDate('2026-02-29')).toBe(false);
    expect(isValidDate('2024-02-29')).toBe(true);
  });

  it('accepts only 24-hour times', () => {
    expect(isValidTime('23:59')).toBe(true);
    expect(isValidTime('24:00')).toBe(false);
    expect(isValidTime('9:00')).toBe(false);
  });

  it('validates patient data and prevents scheduling in the past', () => {
    expect(validateAppointment(' Ana Souza ', '2026-11-23', '09:00', '2026-11-23')).toBeNull();
    expect(validateAppointment('A', '2026-11-23', '09:00', '2026-11-23')).not.toBeNull();
    expect(validateAppointment('Ana Souza', '2026-11-22', '09:00', '2026-11-23')).not.toBeNull();
  });

  it('creates sample appointments with real local dates', () => {
    const appointments = createDemoAppointments('2026-11-23');

    expect(appointments).toHaveLength(3);
    expect(appointments[0].date).toBe('2026-11-23');
    expect(appointments[2].date).toBe('2026-11-24');
    expect(isAppointmentList(appointments)).toBe(true);
    expect(isAppointmentList([{ ...appointments[0], status: 'unknown' }])).toBe(false);
  });
});
