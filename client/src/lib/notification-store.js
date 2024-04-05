import { create } from "zustand";

import { appAxios } from "./appAxios";

export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await appAxios("/users/notification");
    set({ number: res.data });
  },
  decrease: () => set((state) => ({ number: state.number - 1 })),
  reset: () => set({ number: 0 }),
}));
