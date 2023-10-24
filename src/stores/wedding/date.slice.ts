import { StateCreator } from "zustand";

export interface DateSlice {
  eventDate: Date;
  eventYYYMMDD: () => string;
  eventHHMM: () => string;
  setEventDate: (eventDate: string) => void;
  setEventTime: (eventHour: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),
  eventYYYMMDD: () => {
    return get().eventDate.toISOString().split('T')[0];
  },
  eventHHMM: () => {
    const hours = get().eventDate.getHours().toString().padStart(2, '0');
    const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },
  setEventDate: (eventDate) => set(state => {
    const date = new Date(eventDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const newDate = new Date(state.eventDate);
    newDate.setFullYear(year, month, day);
    return { eventDate: newDate };
  }),
  setEventTime: (eventHour) => set(state => {
    const hours = parseInt(eventHour.split(':')[0]);
    const minutes = parseInt(eventHour.split(':')[1]);
    const newDate = new Date(state.eventDate);
    newDate.setHours(hours, minutes);
    return { eventDate: newDate };
  }),
});