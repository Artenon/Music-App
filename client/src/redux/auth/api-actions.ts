import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../types/store.types";
import { DefaultResponse, LoginResponse, AuthResponse, FavoriteResponse } from "../../types/server.types";
import { SongData } from "../../types/song.types";
import { User } from "../../types/auth.types";
import { NameSpace, APIRoute } from "../../const";

export const registerAction = createAsyncThunk<DefaultResponse, User, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.AUTH}/register`,
  async ({email, password, username}, {dispatch, extra: api}) => {
    const {data} = await api.post<DefaultResponse>(APIRoute.Register, {email, password, username});
    return data;
  }
);

export const loginAction = createAsyncThunk<LoginResponse, User, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.AUTH}/login`,
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<LoginResponse>(APIRoute.Login, {email, password});
    return data;
  }
);

export const logoutAction = createAsyncThunk<DefaultResponse, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.AUTH}/logout`,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.delete<DefaultResponse>(APIRoute.Logout);
    return data;
  }
);

export const getAuthStatus = createAsyncThunk<AuthResponse, undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.AUTH}/getAuthStatus`,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<AuthResponse>(APIRoute.Login);
    return data;
  }
);

export const addFavorite = createAsyncThunk<FavoriteResponse, SongData, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.AUTH}/addFavorite`,
  async (favorite, {dispatch, extra: api}) => {
    const {data} = await api.post<FavoriteResponse>(APIRoute.Favorites, {favorite});
    return data;
  }
);

export const removeFavorite = createAsyncThunk<FavoriteResponse, SongData, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.AUTH}/removeFavorite`,
  async (favorite, {dispatch, extra: api}) => {
    const {data} = await api.post<FavoriteResponse>(`${APIRoute.Favorites}${APIRoute.Remove}`, {favorite})
    return data;
  }
);
