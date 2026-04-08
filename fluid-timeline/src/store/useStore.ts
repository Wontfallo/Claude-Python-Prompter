import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StoreState, TripEvent } from '@/types'

const uid = () => Math.random().toString(36).slice(2, 10);

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      trip: {
        id: uid(),
        title: 'My Week Abroad',
        startUtc: new Date().toISOString(),
        endUtc: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        displayTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        events: []
      },
      setDisplayTimezone: (tz) => set((s) => ({ trip: { ...s.trip, displayTimezone: tz } })),
      addEvent: (data) => set((s) => {
        const newEvent: TripEvent = {
          ...data,
          id: uid(),
          order: s.trip.events.length,
          startUtc: new Date().toISOString(), // placeholder, will be scheduled
          endUtc: new Date().toISOString()
        };
        return { trip: { ...s.trip, events: [...s.trip.events, newEvent] } };
      }),
      updateEvent: (id, updates) => set((s) => ({
        trip: {
          ...s.trip,
          events: s.trip.events.map(e => e.id === id ? { ...e, ...updates } : e)
        }
      })),
      reorderEvents: () => set(() => ({})) // placeholder for DnD
    }),
    { name: 'fluid-timeline-db' } // persists to localStorage automatically
  )
)
