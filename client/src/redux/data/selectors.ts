import { RootState } from "../../types/store.types";
import { SearchData } from "../../types/search-data.types";
import { AlbumData } from "../../types/search-album.types";

export const getIsLoading = (state: RootState): boolean => state.DATA.isLoading;

export const getSearchData = (state: RootState): SearchData[] => state.DATA.searchData;

export const getAlbumData = (state: RootState): AlbumData | null => state.DATA.albumData;
