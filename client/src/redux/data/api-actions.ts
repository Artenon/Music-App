import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../types/store.types";
import { SearchDataResponse, AlbumDataResponse, ThemesResponse } from "../../types/server.types";
import { NameSpace, APIRoute } from "../../const";
import { AlbumData, ArtistData, TrackData } from "../../types/music.types";
import { Theme } from "../../types/theme.types";

export const searchAction = createAsyncThunk<TrackData[], string, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.DATA}/search`,
  async (query, {dispatch, extra: api}) => {
    const {data} = await api.get<SearchDataResponse>(`${APIRoute.Search}${query}`);
    return data.data;
  }
);

export const getAlbum = createAsyncThunk<AlbumData, string, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.DATA}/getAlbum`,
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<AlbumDataResponse>(`${APIRoute.Album}/${id}`);
    return data.data;
  }
);

export const getArtist = createAsyncThunk<ArtistData, string, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.DATA}/getArtist`,
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<ArtistData>(`${APIRoute.Artist}/${id}`);
    return data;
  }
);

export const getArtistTotal = createAsyncThunk<ArtistData, {artistID: string, total: number}, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.DATA}/getArtistTotal`,
  async ({artistID, total}, {dispatch, extra: api}) => {
    const {data} = await api.get<ArtistData>(`${APIRoute.Artist}/${artistID}${APIRoute.Total}${total}`);
    return data;
  }
);

export const getThemesAction = createAsyncThunk<Theme[], undefined, {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
}
>(
  `${NameSpace.DATA}/getThemes`,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<ThemesResponse>(APIRoute.Themes);
    return data.data;
  }
);
