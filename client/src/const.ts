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
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Register = '/register',
  Album = '/album'
}

export const toastifyOptions: ToastOptions = {
  theme: 'dark',
  position: 'top-right',
  autoClose: 2500,
  toastId: 1,
};

export enum AuthStatus {
  Authorized = 'Authorized',
  Unauthorized = 'Unauthorized'
};
