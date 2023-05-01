import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../types/store.types";
import { DefaultResponse, LoginResponse, AuthResponse, FavoriteResponse } from "../../types/server.types";
import { SongData } from "../../types/song.types";
import { AlbumData } from "../../types/album.types";
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

export const addFavoriteTrack = createAsyncThunk<FavoriteResponse, SongData, {
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

export const removeFavoriteTrack = createAsyncThunk<FavoriteResponse, SongData, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.USER}/removeFavoriteTrack`,
  async (favorite, {dispatch, extra: api}) => {
    const {data} = await api.post<FavoriteResponse>(`${APIRoute.Favorites}${APIRoute.Track}${APIRoute.Remove}`, {favorite})
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

export const removeFavoriteAlbum = createAsyncThunk<FavoriteResponse, AlbumData, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.USER}/removeFavoriteAlbum`,
  async (favorite, {dispatch, extra: api}) => {
    const {data} = await api.post<FavoriteResponse>(`${APIRoute.Favorites}${APIRoute.Album}${APIRoute.Remove}`, {favorite})
    return data;
  }
);
