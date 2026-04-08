import { useStore } from '@/store/useStore';
import { format } from 'date-fns';
import { toUserTz } from '@/utils/time';

export function Header() {
  const { trip, setDisplayTimezone } = useStore();
  const zones = Intl.supportedValuesOf('timeZone');
  
  return (
    <header className="flex items-center justify-between p-4 bg-surface border-b border-gray-800">
      <div>
        <h1 className="text-xl font-bold text-text">{trip.title}</h1>
        <p className="text-xs text-muted">
          {format(toUserTz(trip.startUtc, trip.displayTimezone), 'MMM d')} →{' '}
          {format(toUserTz(trip.endUtc, trip.displayTimezone), 'MMM d, yyyy')}
        </p>
      </div>
      <div className="relative">
        <select
          value={trip.displayTimezone}
          onChange={(e) => setDisplayTimezone(e.target.value)}
          className="px-3 py-1.5 text-sm bg-accent/20 text-accent rounded hover:bg-accent/30 transition cursor-pointer"
        >
          {zones.map(z => <option key={z} value={z}>{z}</option>)}
        </select>
      </div>
    </header>
  );
}
