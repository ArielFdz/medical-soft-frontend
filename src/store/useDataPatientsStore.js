import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDataPatientsStore = create(
  persist(
    (set) => ({
      userData: null,
      auth: false,
      setUserData: (userData) => set({ userData, auth: true }),
      clearUserData: () => {
        set({ userData: null, auth: false });
        localStorage.removeItem("patient-data");
      },
    }),
    {
      name: "patient-data",
      getStorage: () => localStorage,
    }
  )
);
