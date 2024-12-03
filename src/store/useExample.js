import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExample = create(
  persist(
    (set) => ({
      userData: null,
      auth: false,
      setUserData: (userData) => set({ userData, auth: true }),
      clearUserData: () => set({ userData: null, auth: false }),
    }),
    {
      name: "example", // Nombre del storage en localStorage
      getStorage: () => localStorage, // Usa localStorage como almacenamiento
    }
  )
);
