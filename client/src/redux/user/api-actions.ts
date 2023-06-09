import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../types/store.types";
import { DefaultResponse, LoginResponse, AuthResponse, FavoriteResponse, UserResponse } from "../../types/server.types";
import { AlbumData, TrackData } from "../../types/music.types";
import { User } from "../../types/auth.types";
import { NameSpace, APIRoute } from "../../const";

export const registerAction = createAsyncThunk<DefaultResponse, User, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.USER}/register`,
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
  `${NameSpace.USER}/login`,
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
  `${NameSpace.USER}/logout`,
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
  `${NameSpace.USER}/getAuthStatus`,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<AuthResponse>(APIRoute.Login);
    return data;
  }
);

export const addFavoriteTrack = createAsyncThunk<FavoriteResponse, TrackData, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.USER}/addFavoriteTrack`,
  async (favorite, {dispatch, extra: api}) => {
    const {data} = await api.post<FavoriteResponse>(`${APIRoute.Favorites}${APIRoute.Track}`, {favorite});
    return data;
  }
);

export const removeFavoriteTrack = createAsyncThunk<FavoriteResponse, number, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.USER}/removeFavoriteTrack`,
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.delete<FavoriteResponse>(`${APIRoute.Favorites}${APIRoute.Track}/${id}`);
    return data;
  }
);

export const addFavoriteAlbum = createAsyncThunk<FavoriteResponse, AlbumData, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.USER}/addFavoriteAlbum`,
  async (favorite, {dispatch, extra: api}) => {
    const {data} = await api.post<FavoriteResponse>(`${APIRoute.Favorites}${APIRoute.Album}`, {favorite});
    return data;
  }
);

export const removeFavoriteAlbum = createAsyncThunk<FavoriteResponse, number, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.USER}/removeFavoriteAlbum`,
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.delete<FavoriteResponse>(`${APIRoute.Favorites}${APIRoute.Album}/${id}`);
    return data;
  }
);

export const updateUser = createAsyncThunk<UserResponse, {username: string, email: string}, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.USER}/updateUser`,
  async ({username, email}, {dispatch, extra: api}) => {
    const {data} = await api.put<UserResponse>(APIRoute.User, {username, email});
    return data;
  }
);
