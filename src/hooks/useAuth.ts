import create, { SetState } from 'zustand';
import { AuthUser } from '@/features/auth';
import { devtools } from 'zustand/middleware';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
};

const authStore = (set: SetState<AuthState>) => ({
  user: null,

  setUser: (user: AuthUser | null) =>
    set((state) => {
      const isAdmin = user?.admin;

      if (user) {
        state.user = user;
        state.user.role = isAdmin ? Role.ADMIN : Role.USER;

        return;
      }

      state.user = null;
    }),
});

export const useAuthStore = create<AuthState>(devtools(authStore));
