import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDataUserStore = create(
  persist(
    (set) => ({
      userData: null,
      auth: false,
      setUserData: (userData) => set({ userData, auth: true }),
      clearUserData: () => set({ userData: null, auth: false }),
    }),
    {
      name: "user-data", // Nombre del storage en localStorage
      getStorage: () => localStorage, // Usa localStorage como almacenamiento
    }
  )
);
