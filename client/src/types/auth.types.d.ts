import { AlbumData } from "./album.types";
import { SongData } from "../../../shared/types";

export type User = {
  email: string,
  password: string,
  username?: string,
  favorites?: Favorites,
};

export type Favorites = {
  tracks: SongData[];
  albums: AlbumData[];
};
