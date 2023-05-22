import { AuthStatus } from "../const";
import { AlbumData, TrackData } from "./music.types";
import { Favorites } from "./auth.types";

export type DefaultResponse = {
  message: string;
  errors?: [];
};

export type LoginResponse = {
  message: string;
  token: string;
  userId: string;
  username: string;
  favorites: Favorites;
};

export type AuthResponse = {
  message: AuthStatus;
  username: string;
  favorites: Favorites;
};

export type SearchDataResponse = {
  data: TrackData[];
};

export type AlbumDataResponse = {
  data: AlbumData;
};

export type FavoriteResponse = {
  message: string;
  favorites: Favorites;
};
