const KEY_NAME = 'user-data';

export const getToken = (): string | null => {
  const userData = localStorage.getItem(KEY_NAME);
  return userData ? JSON.parse(userData) : null;
};

export const saveToken = (token: string): void => {
  localStorage.setItem(KEY_NAME, JSON.stringify(token));
};

export const removeToken = (): void => {
  localStorage.removeItem(KEY_NAME);
};


const THEME = 'theme';

export const getTheme = (): string | null => {
  return localStorage.getItem(THEME);
};

export const saveTheme = (theme: string): void => {
  localStorage.setItem(THEME, theme);
;}

export const removeTheme = (): void => {
  localStorage.removeItem(THEME);
};
