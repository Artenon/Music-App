import { AuthStatus } from "../const";
import { AlbumData } from "./album.types";
import { SongData } from "./song.types";

export type DefaultResponse = {
  message: string;
  errors?: [];
};

export type LoginResponse = {
  message: string;
  token: string;
  userId: string;
  username: string;
  favorites: SongData[];
};

export type AuthResponse = {
  message: AuthStatus;
  username: string;
  favorites: SongData[];
};

export type SearchDataResponse = {
  data: SongData[];
};

export type AlbumDataResponse = {
  data: AlbumData;
};

export type FavoriteResponse = {
  message: string;
  favorites: SongData[];
};
