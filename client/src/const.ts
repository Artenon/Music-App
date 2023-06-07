import { ToastOptions } from 'react-toastify';

export enum NameSpace {
  USER = 'USER',
  DATA = 'DATA',
  TRACK = 'TRACK',
}

export enum APIRoute {
  Register = '/auth/register',
  Login = '/auth/login',
  Logout = '/auth/logout',
  Search = '/search?q=',
  Album = '/album',
  Favorites = '/favorites',
  Track = '/track',
  Artist = '/artist',
  Total = '?total=',
  Themes = '/themes',
  User = '/user'
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Register = '/register',
  Album = '/album',
  Favorites = '/favorites',
  Artist = '/artist',
  User = '/user',
};

export const toastifyOptions: ToastOptions = {
  theme: 'dark',
  position: 'bottom-right',
  autoClose: 2500,
};

export enum AuthStatus {
  Authorized = 'Authorized',
  Unauthorized = 'Unauthorized',
};

export enum TabsFavorites {
  Songs = 'Songs',
  Albums = 'Albums'
};
