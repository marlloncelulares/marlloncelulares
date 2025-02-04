import { create } from 'zustand';

type Store = {
  sendSchedule: (date: string, time: string) => Promise<void>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useSchedulerStore = create<Store>((set) => ({
  sendSchedule: async (date, time) => {
    await fetch('/api/sendSchedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, time }),
    });
  },
}));
