import { SongData } from "./song.types";
import { AlbumData } from "./album.types";

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
