export type Location = {
  name: string;
  timezone: string; // IANA string e.g. "Asia/Tokyo"
};

export type TripEvent = {
  id: string;
  title: string;
  type: 'hard' | 'flexible';
  durationMin: number;
  location: Location;
  startUtc: string;
  endUtc: string;
  order: number;
  color: string;
};

export type Trip = {
  id: string;
  title: string;
  startUtc: string;
  endUtc: string;
  displayTimezone: string;
  events: TripEvent[];
};

export type StoreState = {
  trip: Trip;
  setDisplayTimezone: (tz: string) => void;
  addEvent: (event: Omit<TripEvent, 'id' | 'startUtc' | 'endUtc' | 'order'>) => void;
  updateEvent: (id: string, updates: Partial<TripEvent>) => void;
  reorderEvents: (fromIndex: number, toIndex: number) => void;
};
