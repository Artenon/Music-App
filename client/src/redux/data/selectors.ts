import { RootState } from "../../types/store.types";
import { SongData } from "../../../../shared/types";
import { AlbumData } from "../../types/album.types";
import { ArtistData } from "../../types/artist.types";

export const getIsLoading = (state: RootState): boolean => state.DATA.isLoading;

export const getSearchData = (state: RootState): SongData[] => state.DATA.searchData;

export const getAlbumData = (state: RootState): AlbumData | null => state.DATA.albumData;

export const getArtistData = (state: RootState): ArtistData | null => state.DATA.artistData;
