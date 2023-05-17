import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../types/store.types";
import { SearchDataResponse, AlbumDataResponse } from "../../types/server.types";
import { SongData } from "../../../../shared/types";
import { NameSpace, APIRoute } from "../../const";
import { AlbumData } from "../../types/album.types";
import { ArtistData } from "../../types/artist.types";

export const searchAction = createAsyncThunk<SongData[], string, {
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

export const getArtistTotal = createAsyncThunk<ArtistData, {artistID: string, total: string}, {
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
