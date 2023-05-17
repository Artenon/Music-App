import { AlbumData, TrackData } from "./music.types";

export type User = {
  email: string,
  password: string,
  username?: string,
  favorites?: Favorites,
};

export type Favorites = {
  tracks: TrackData[];
  albums: AlbumData[];
};
