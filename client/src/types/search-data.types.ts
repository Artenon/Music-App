type Artist = {
  id: number;
  name: string;
  picture_small: string;
  type: string;
};

type Album = {
  id: number;
  title: string;
  cover_small: string;
  cover_medium: string;
  type: string;
};

export type SearchData = {
  id: number;
  title: string;
  title_short: string;
  explicit_lyrics: boolean;
  preview: string;
  type: string;
  artist: Artist;
  album: Album;
};
