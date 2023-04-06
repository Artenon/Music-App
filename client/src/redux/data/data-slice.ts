import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { searchAction, getAlbum } from "./api-actions";
import { NameSpace, toastifyOptions } from "../../const";
import { SearchData } from "../../types/search-data.types";
import { AlbumData } from "../../types/search-album.types";

const initialState: {
  isLoading: boolean;
  searchData: SearchData[];
  albumData: AlbumData | null;
} = {
  isLoading: false,
  searchData: [],
  albumData: null,
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
      });
  }
});
