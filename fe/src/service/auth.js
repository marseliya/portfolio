// src/service/auth.js
const USER_KEY = 'portfolio_user';

export const login = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  if (user) {
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getUser();
};