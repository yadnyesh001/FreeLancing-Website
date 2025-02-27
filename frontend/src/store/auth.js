import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggedIn: localStorage.getItem('freelance_token') ? true : false,
  user: JSON.parse(localStorage.getItem('user')) || {},
  login: (token,user) => {
    localStorage.setItem('freelance_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ isLoggedIn: true,user:user });
  },
  logout: () => {
    localStorage.removeItem('freelance_token');
    localStorage.removeItem('user');
    set({ isLoggedIn: false,user:{} });
  }
}));
