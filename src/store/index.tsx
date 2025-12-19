import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AppStateType {
  started: boolean;
  step: number;
  attemps: number;
  status: "started" | "failed" | "success";
  password_quest_HINT: string;
  setStarted: (started: boolean) => void;
  setStep: (step: number) => void;
  setAttemps: (attemps: number) => void;
  setStatus: (status: AppStateType["status"]) => void;
}

export const useAppStore = create<AppStateType>()(
  persist(
    (set) => ({
      started: false,
      step: 0,
      attemps: 10,
      status: "started",
      password_quest_HINT: "3 parts!",
      setStarted: (started) => set((state) => ({ ...state, started })),
      setStep: (step) => set((state) => ({ ...state, step })),
      setAttemps: (attemps) => set((state) => ({ ...state, attemps })),
      setStatus: (status) => set((state) => ({ ...state, status })),
    }),
    {
      name: "app-storage",
    }
  )
);
