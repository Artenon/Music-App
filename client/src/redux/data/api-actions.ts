import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../types/store.types";
import { SearchDataResponse, AlbumDataResponse } from "../../types/server.types";
import { SearchData } from "../../types/search-data.types";
import { NameSpace, APIRoute } from "../../const";
import { AlbumData } from "../../types/search-album.types";

export const searchAction = createAsyncThunk<SearchData[], string, {
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
