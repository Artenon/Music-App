import { RootState } from "../../types/store.types";
import { SearchData } from "../../types/search.data";
import { AlbumData } from "../../types/search.album";

export const getIsLoading = (state: RootState): boolean => state.DATA.isLoading;

export const getSearchData = (state: RootState): SearchData[] => state.DATA.searhData;

export const getAlbumData = (state: RootState): AlbumData | null => state.DATA.albumData;
