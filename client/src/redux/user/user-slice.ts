import { createSlice, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { NameSpace, toastifyOptions, AuthStatus } from "../../const";
import {
  registerAction,
  loginAction,
  logoutAction,
  getAuthStatus,
  addFavoriteTrack,
  removeFavoriteTrack,
  addFavoriteAlbum,
  removeFavoriteAlbum
} from "./api-actions";
import { saveToken, removeToken, getTheme, saveTheme } from "../../service/user-storage";
import { Favorites } from "../../types/auth.types";

const initialState: {
  isAuthLoading: boolean;
  isLoginLoading: boolean;
  isAddingFavAlbum: boolean;
  isAddingFavTrack: boolean;
  authStatus: AuthStatus;
  username: string;
  email: string;
  favorites: Favorites;
  theme: string | null;
} = {
  isAuthLoading: false,
  isLoginLoading: false,
  isAddingFavAlbum: false,
  isAddingFavTrack: false,
  authStatus: AuthStatus.Unauthorized,
  username: '',
  email: '',
  favorites: {
    tracks: [],
    albums: []
  },
  theme: getTheme(),
};

export const changeTheme = createAction<string>('USER/changeTheme');

export const userSlice = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        toast.success(action.payload.message, toastifyOptions);
      })
      .addCase(registerAction.rejected, (state) => {
        state.isLoginLoading = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.authStatus = AuthStatus.Authorized;
        state.username = action.payload.username;
        state.favorites = action.payload.favorites;
        toast.success(action.payload.message, toastifyOptions);
        Reflect.deleteProperty(action.payload, 'message');
        saveToken(action.payload.token);
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoginLoading = false;
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Unauthorized;
        state.username = '';
        state.favorites = {
          tracks: [],
          albums: []
        };
        state.isLoginLoading = false;
        toast.warn(action.payload.message, toastifyOptions);
        removeToken();
      })
      .addCase(getAuthStatus.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(getAuthStatus.fulfilled, (state, action) => {
        state.authStatus = action.payload.message;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.favorites = action.payload.favorites;
        state.isAuthLoading = false;
      })
      .addCase(getAuthStatus.rejected, (state) => {
        state.authStatus = AuthStatus.Unauthorized;
        state.isAuthLoading = false;
      })
      .addCase(addFavoriteTrack.pending, (state) => {
        state.isAddingFavTrack = true;
      })
      .addCase(addFavoriteTrack.fulfilled, (state, action) => {
        state.isAddingFavTrack = false;
        state.favorites = action.payload.favorites;
      })
      .addCase(addFavoriteTrack.rejected, (state) => {
        state.isAddingFavTrack = false;
      })
      .addCase(removeFavoriteTrack.pending, (state) => {
        state.isAddingFavTrack = true;
      })
      .addCase(removeFavoriteTrack.fulfilled, (state, action) => {
        state.isAddingFavTrack = false;
        state.favorites = action.payload.favorites;
      })
      .addCase(removeFavoriteTrack.rejected, (state) => {
        state.isAddingFavTrack = false;
      })
      .addCase(addFavoriteAlbum.pending, (state) => {
        state.isAddingFavAlbum = true;
      })
      .addCase(addFavoriteAlbum.fulfilled, (state, action) => {
        state.isAddingFavAlbum = false;
        state.favorites = action.payload.favorites;
      })
      .addCase(addFavoriteAlbum.rejected, (state) => {
        state.isAddingFavAlbum = false;
      })
      .addCase(removeFavoriteAlbum.pending, (state) => {
        state.isAddingFavAlbum = true;
      })
      .addCase(removeFavoriteAlbum.fulfilled, (state, action) => {
        state.isAddingFavAlbum = false;
        state.favorites = action.payload.favorites;
      })
      .addCase(removeFavoriteAlbum.rejected, (state) => {
        state.isAddingFavAlbum = false;
      })
      .addCase(changeTheme, (state, action) => {
        state.theme = action.payload;
        saveTheme(action.payload);
      }); 
  }
});
