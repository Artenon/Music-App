import { ToastOptions } from 'react-toastify';

export enum NameSpace {
  AUTH = 'AUTH',
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
  Remove = '/remove',
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Register = '/register',
  Album = '/album',
  Favorites = '/favorites',
};

export const toastifyOptions: ToastOptions = {
  theme: 'dark',
  position: 'bottom-right',
  autoClose: 2500,
  toastId: 1,
};

export enum AuthStatus {
  Authorized = 'Authorized',
  Unauthorized = 'Unauthorized'
};

export enum From {
  Search = 'Search',
  Album = 'Album',
  Favorites = 'Favorites',
  None = 'None'
};
