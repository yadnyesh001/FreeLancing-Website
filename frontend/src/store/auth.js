import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggedIn: localStorage.getItem('freelance_token') ? true : false,
  login: (token) => {
    localStorage.setItem('freelance_token', token);
    set({ isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem('freelance_token');
    set({ isLoggedIn: false });
  }
}));
