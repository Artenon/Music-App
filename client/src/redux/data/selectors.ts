import { RootState } from "../../types/store.types";
import { SongData } from "../../types/song.types";
import { AlbumData } from "../../types/album.types";

export const getIsLoading = (state: RootState): boolean => state.DATA.isLoading;

export const getSearchData = (state: RootState): SongData[] => state.DATA.searchData;

export const getAlbumData = (state: RootState): AlbumData | null => state.DATA.albumData;
