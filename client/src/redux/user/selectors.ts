import { AuthStatus } from "../../const";
import { Favorites } from "../../types/auth.types";
import { RootState } from "../../types/store.types";

export const getAuthStatus = (state: RootState): AuthStatus => state.USER.authStatus;

export const getUsername = (state: RootState): string => state.USER.username;

export const getEmail = (state: RootState): string => state.USER.email;

export const getFavorites = (state: RootState): Favorites => state.USER.favorites;

export const getIsAuthLoading = (state: RootState): boolean => state.USER.isAuthLoading;

export const getIsLoginLoading = (state: RootState): boolean => state.USER.isLoginLoading;

export const getIsAddingFavTrack = (state: RootState): boolean => state.USER.isAddingFavTrack;

export const getIsAddingFavAlbum = (state: RootState): boolean => state.USER.isAddingFavAlbum;

export const getIsUserUpdating = (state: RootState): boolean => state.USER.isUserUpdating;

export const getTheme = (state: RootState): string | null => state.USER.theme;
