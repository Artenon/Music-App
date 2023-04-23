import { AuthStatus } from "../../const";
import { SongData } from "../../types/song.types";
import { RootState } from "../../types/store.types";

export const getAuthStatus = (state: RootState): AuthStatus => state.USER.authStatus;

export const getUsername = (state: RootState): string => state.USER.username;

export const getFavorites = (state: RootState): SongData[] => state.USER.favorites;

export const getIsLoading = (state: RootState): boolean => state.USER.isLoading;
