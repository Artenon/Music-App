import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { SongData } from "../../../../shared/types";

const initialState: {
  currentTrack: SongData | null;
  isPlaying: boolean;
  position: number;
  autoPlay: boolean;
  queue: SongData[];
} = {
  currentTrack: null,
  isPlaying: false,
  position: 0,
  autoPlay: false,
  queue: [],
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
    changePosition: (state, action) => {
      state.position = action.payload;
    },
    changeAutoPlay: (state, action) => {
      state.autoPlay = action.payload;
    },
    clearQueue: (state) => {
      state.queue = [];
    },
    changeQueue: (state, action) => {
      state.queue = action.payload;
    },
  },
});

export default trackSlice.actions;
