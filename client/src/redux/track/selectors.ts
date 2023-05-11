import { SongData } from "../../../../shared/types";
import { TabsFavorites } from "../../const";
import { RootState } from "../../types/store.types"

export const getCurrentTrack = (state: RootState): SongData | null => state.TRACK.currentTrack;

export const getIsPlaying = (state: RootState): boolean => state.TRACK.isPlaying;

export const getPosition = (state: RootState): number => state.TRACK.position;

export const getIsAutoPlay = (state: RootState): boolean => state.TRACK.autoPlay;

export const getQueue = (state: RootState): SongData[] => state.TRACK.queue;

export const getTab = (state: RootState): TabsFavorites => state.TRACK.tab;
