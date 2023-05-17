import { createSlice } from "@reduxjs/toolkit";
import { NameSpace, TabsFavorites } from "../../const";
import { TrackData } from "../../types/music.types";

const initialState: {
  currentTrack: TrackData | null;
  isPlaying: boolean;
  position: number;
  autoPlay: boolean;
  queue: TrackData[];
  tab: TabsFavorites;
} = {
  currentTrack: null,
  isPlaying: false,
  position: 0,
  autoPlay: false,
  queue: [],
  tab: TabsFavorites.Songs,
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
    changeTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export default trackSlice.actions;
