import { AuthStatus } from "../../const";
import { Favorites } from "../../types/auth.types";
import { RootState } from "../../types/store.types";

export const getAuthStatus = (state: RootState): AuthStatus => state.USER.authStatus;

export const getUsername = (state: RootState): string => state.USER.username;

export const getFavorites = (state: RootState): Favorites => state.USER.favorites;

export const getIsLoading = (state: RootState): boolean => state.USER.isLoading;

export const getIsLoginLoading = (state: RootState): boolean => state.USER.isLoginLoading;
