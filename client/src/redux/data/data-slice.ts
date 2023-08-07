import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { searchAction, getAlbum, getArtist, getArtistTotal, getThemesAction } from "./api-actions";
import { NameSpace, toastifyOptions } from "../../const";
import { AlbumData, ArtistData, TrackData } from "../../types/music.types";
import { Theme } from "../../types/theme.types";

const initialState: {
  isLoading: boolean;
  isMoreLoading: boolean;
  isThemesLoading: boolean;
  searchData: TrackData[];
  albumData: AlbumData | null;
  artistData: ArtistData | null;
  themes: Theme[];
} = {
  isLoading: false,
  isMoreLoading: false,
  isThemesLoading: false,
  searchData: [],
  albumData: null,
  artistData: null,
  themes: [],
};

export const dataSlice = createSlice({
  name: NameSpace.DATA,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchData = action.payload;
        state.albumData = null;
      })
      .addCase(searchAction.rejected, (state) => {
        state.isLoading = false;
        toast.error('Error occurred', toastifyOptions);
      })
      .addCase(getAlbum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlbum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.albumData = action.payload;
      })
      .addCase(getAlbum.rejected, (state) => {
        state.isLoading = false;
        toast.error('Error occurred', toastifyOptions);
      })
      .addCase(getArtist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArtist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artistData = action.payload;
      })
      .addCase(getArtist.rejected, (state) => {
        state.isLoading = false;
        toast.error('Error occurred', toastifyOptions);
      })
      .addCase(getArtistTotal.pending, (state) => {
        state.isMoreLoading = true;
      })
      .addCase(getArtistTotal.fulfilled, (state, action) => {
        if (state.artistData) {
          state.isMoreLoading = false;
          state.artistData.data = state.artistData.data.concat(action.payload.data);
        };
      })
      .addCase(getArtistTotal.rejected, (state) => {
        state.isMoreLoading = false;
        toast.error('Error occurred', toastifyOptions);
      })
      .addCase(getThemesAction.pending, (state) => {
        state.isThemesLoading = true;
      })
      .addCase(getThemesAction.fulfilled, (state, action) => {
        state.themes = action.payload;
        state.isThemesLoading = false;
      })
      .addCase(getThemesAction.rejected, (state) => {
        state.isThemesLoading = false;
      });
  }
});
