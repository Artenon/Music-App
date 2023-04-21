import { createSlice } from "@reduxjs/toolkit";
import { NameSpace, From } from "../../const";
import { SongData } from "../../types/song.types";

const initialState: {
  currentTrack: SongData | null;
  isPlaying: boolean;
  from: From;
  position: number;
  autoPlay: boolean;
} = {
  currentTrack: null,
  isPlaying: false,
  from: From.None,
  position: 0,
  autoPlay: false,
};

export const trackSlice = createSlice({
  name: NameSpace.TRACK,
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
    },
    changeAutoPlay: (state, action) => {
      state.autoPlay = action.payload;
    }
  },
});

export default trackSlice.actions;
