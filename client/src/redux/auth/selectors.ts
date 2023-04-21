import { AuthStatus } from "../../const";
import { SongData } from "../../types/song.types";
import { RootState } from "../../types/store.types";

export const getAuthStatus = (state: RootState): AuthStatus => state.AUTH.authStatus;

export const getUsername = (state: RootState): string => state.AUTH.username;

export const getFavorites = (state: RootState): SongData[] => state.AUTH.favorites;

export const getIsLoading = (state: RootState): boolean => state.AUTH.isLoading;
