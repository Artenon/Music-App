import { RootState } from "../../types/store.types";
import { AlbumData, ArtistData, TrackData } from "../../types/music.types";
import { Theme } from "../../types/theme.types";

export const getIsLoading = (state: RootState): boolean => state.DATA.isLoading;

export const getIsMoreLoading = (state: RootState): boolean => state.DATA.isMoreLoading;

export const getIsThemesLoading = (state: RootState): boolean => state.DATA.isThemesLoading;

export const getSearchData = (state: RootState): TrackData[] => state.DATA.searchData;

export const getAlbumData = (state: RootState): AlbumData | null => state.DATA.albumData;

export const getArtistData = (state: RootState): ArtistData | null => state.DATA.artistData;

export const getThemes = (state: RootState): Theme[] => state.DATA.themes;
