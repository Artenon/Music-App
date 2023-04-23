import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { NameSpace, toastifyOptions, AuthStatus } from "../../const";
import { registerAction, loginAction, logoutAction, getAuthStatus, addFavorite, removeFavorite } from "./api-actions";
import { saveToken, removeToken } from "../../service/user-storage";
import { SongData } from "../../types/song.types";

const initialState: {
  isLoading: boolean;
  authStatus: AuthStatus;
  username: string;
  favorites: SongData[];
} = {
  isLoading: false,
  authStatus: AuthStatus.Unauthorized,
  username: '',
  favorites: [],
};

export const userSlice = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message, toastifyOptions);
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authStatus = AuthStatus.Authorized;
        state.username = action.payload.username;
        state.favorites = action.payload.favorites;
        toast.success(action.payload.message, toastifyOptions);
        Reflect.deleteProperty(action.payload, 'message');
        saveToken(action.payload.token);
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Unauthorized;
        state.username = '';
        state.favorites = [];
        state.isLoading = false;
        toast.warn(action.payload.message, toastifyOptions);
        removeToken();
      })
      .addCase(registerAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAuthStatus.fulfilled, (state, action) => {
        state.authStatus = action.payload.message;
        state.username = action.payload.username;
        state.favorites = action.payload.favorites;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload.favorites;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload.favorites;
      });
  }
});
