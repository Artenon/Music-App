import { AuthStatus } from "../../const";
import { RootState } from "../../types/store.types";

export const getAuthStatus = (state: RootState): AuthStatus => state.AUTH.authStatus;

export const getUsername = (state: RootState): string => state.AUTH.username;

export const getFavorites = (state: RootState): number[] => state.AUTH.favorites;
