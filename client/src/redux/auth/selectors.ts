import { AuthStatus } from "../../const";
import { SearchData } from "../../types/search-data.types";
import { RootState } from "../../types/store.types";

export const getAuthStatus = (state: RootState): AuthStatus => state.AUTH.authStatus;

export const getUsername = (state: RootState): string => state.AUTH.username;

export const getFavorites = (state: RootState): SearchData[] => state.AUTH.favorites;
