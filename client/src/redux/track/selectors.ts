import { TabsFavorites } from "../../const";
import { RootState } from "../../types/store.types"
import { TrackData } from "../../types/music.types";

export const getCurrentTrack = (state: RootState): TrackData | null => state.TRACK.currentTrack;

export const getIsPlaying = (state: RootState): boolean => state.TRACK.isPlaying;

export const getPosition = (state: RootState): number => state.TRACK.position;

export const getIsAutoPlay = (state: RootState): boolean => state.TRACK.autoPlay;

export const getQueue = (state: RootState): TrackData[] => state.TRACK.queue;

export const getTab = (state: RootState): TabsFavorites => state.TRACK.tab;
