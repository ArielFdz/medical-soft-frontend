import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDataDoctoresStore = create(
  persist(
    (set) => ({
      userData: null,
      auth: false,
      setUserData: (userData) => set({ userData, auth: true }),
      clearUserData: () => {
        set({ userData: null, auth: false });
        localStorage.removeItem("user-data");
      },
    }),
    {
      name: "user-data",
      getStorage: () => localStorage,
    }
  )
);
