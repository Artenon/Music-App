import { SearchData } from "../../types/search.data";
import { RootState } from "../../types/store.types"

export const getCurrentTrack = (state: RootState): SearchData | null => state.TRACK.currentTrack;

export const getIsPlaying = (state: RootState): boolean => state.TRACK.isPlaying;
