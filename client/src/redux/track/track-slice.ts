import { createSlice } from "@reduxjs/toolkit";
import { NameSpace, From } from "../../const";
import { SearchData } from "../../types/search-data.types";

const initialState: {
  currentTrack: SearchData | null;
  isPlaying: boolean;
  from: From;
  position: number;
} = {
  currentTrack: null,
  isPlaying: false,
  from: From.None,
  position: 0,
};

export const trackSlice = createSlice({
  name: NameSpace.DATA,
  initialState,
  reducers: {
    changeCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    changeIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    changeFrom: (state, action) => {
      state.from = action.payload;
    },
    changePosition: (state, action) => {
      state.position = action.payload;
    }
  },
});

export default trackSlice.actions;
