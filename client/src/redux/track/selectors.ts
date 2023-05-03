import { From } from "../../const";
import { SongData } from "../../../../shared/types";
import { RootState } from "../../types/store.types"

export const getCurrentTrack = (state: RootState): SongData | null => state.TRACK.currentTrack;

export const getIsPlaying = (state: RootState): boolean => state.TRACK.isPlaying;

export const getFrom = (state: RootState): From => state.TRACK.from;

export const getPosition = (state: RootState): number => state.TRACK.position;

export const getAlbumPosition = (state: RootState): number => state.TRACK.albumPosition;

export const getIsAutoPlay = (state: RootState): boolean => state.TRACK.autoPlay;
