import { StateCreator, create } from "zustand";
import { User, AuthStatus } from "../../interfaces";
import { AuthService } from "../../services";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  checkAuthStatus: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const storeAPI: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: undefined,
  user: undefined,
  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
    }
  },
  login: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw new Error('Unauthorized');
    }
  },
  logout: () => set({ status: 'unauthorized', token: undefined, user: undefined })
})

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      storeAPI,
      { name: 'authStore' }
    )
  )
);