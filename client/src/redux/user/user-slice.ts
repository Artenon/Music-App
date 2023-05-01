import { createSlice } from "@reduxjs/toolkit";
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
import { saveToken, removeToken } from "../../service/user-storage";
import { Favorites } from "../../types/auth.types";

const initialState: {
  isLoading: boolean;
  isLoginLoading: boolean;
  authStatus: AuthStatus;
  username: string;
  favorites: Favorites;
} = {
  isLoading: false,
  isLoginLoading: false,
  authStatus: AuthStatus.Unauthorized,
  username: '',
  favorites: {
    tracks: [],
    albums: []
  },
};

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
        state.isLoading = true;
      })
      .addCase(getAuthStatus.fulfilled, (state, action) => {
        state.authStatus = action.payload.message;
        state.username = action.payload.username;
        state.favorites = action.payload.favorites;
        state.isLoading = false;
      })
      .addCase(getAuthStatus.rejected, (state) => {
        state.authStatus = AuthStatus.Unauthorized;
        state.isLoading = false;
      })
      .addCase(addFavoriteTrack.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFavoriteTrack.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload.favorites;
      })
      .addCase(addFavoriteTrack.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeFavoriteTrack.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFavoriteTrack.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload.favorites;
      })
      .addCase(removeFavoriteTrack.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addFavoriteAlbum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFavoriteAlbum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload.favorites;
      })
      .addCase(addFavoriteAlbum.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeFavoriteAlbum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFavoriteAlbum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload.favorites;
      })
      .addCase(removeFavoriteAlbum.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
