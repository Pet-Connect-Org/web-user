import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthStoreAction {
  clearToken: () => void;
  setToken: (token: string | null) => void;
  setRole: (role: string) => void;
}

export interface AuthStoreState {
  token: string | null;
  role: string | null;
  actions?: AuthStoreAction;
}

export const useAuthStore = create<
  AuthStoreState,
  [["zustand/persist", AuthStoreState], ["zustand/immer", AuthStoreState]]
>(
  persist(
    immer((set) => ({
      token: null,
      role: null,
      actions: {
        setRole: (role) =>
          set((state) => {
            state.role = role;
          }),
        setToken: (token) =>
          set((state) => {
            state.token = token;
          }),
        clearToken: () => {
          set((state) => {
            state.token = null;
            state.role = null;
          });
          localStorage.removeItem("token");
        },
      },
    })),
    {
      name: "AuthStore",
      partialize: (state) => ({ token: state.token, role: state.role }),
    }
  )
);
