import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user) => {
        set({ token, user });
        console.log('Auth data after login:', { token, user });
      },
      logout: () => {
        set({ token: null, user: null });
        console.log('Auth data after logout:', { token: null, user: null });
      }
    }),
    {
      name: 'auth-storage', 
    }
  )
);

export const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return { token, user, login, logout };
};
