import { AuthStatus } from "../const";
import { AlbumData } from "./album.types";
import { Favorites } from "./auth.types";
import { SongData } from "../../../shared/types";
import { ArtistData } from "./artist.types";

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
  data: SongData[];
};

export type AlbumDataResponse = {
  data: AlbumData;
};

export type FavoriteResponse = {
  message: string;
  favorites: Favorites;
};
