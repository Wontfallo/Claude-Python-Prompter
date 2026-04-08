import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { format } from 'date-fns';

export const toUserTz = (utcIso: string, tz: string) => 
  utcToZonedTime(new Date(utcIso), tz);

export const toUtc = (localDate: Date, tz: string) => 
  zonedTimeToUtc(localDate, tz).toISOString();

export const fmt = (utcIso: string, tz: string, pattern: string = 'HH:mm') => 
  format(toUserTz(utcIso, tz), pattern);
