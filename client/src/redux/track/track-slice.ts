import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { SearchData } from "../../types/search.data";

const initialState: {
  currentTrack: SearchData | null;
  isPlaying: boolean;
} = {
  currentTrack: null,
  isPlaying: false,
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
  },
});

export default trackSlice.actions;
