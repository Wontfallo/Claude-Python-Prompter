import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

export const toUserTz = (utcIso: string, tz: string) => 
  toZonedTime(new Date(utcIso), tz);

export const toUtc = (localDate: Date, tz: string) => 
  fromZonedTime(localDate, tz).toISOString();

export const fmt = (utcIso: string, tz: string, pattern: string = 'HH:mm') => 
  format(toUserTz(utcIso, tz), pattern);
