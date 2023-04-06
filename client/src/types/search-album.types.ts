type Genres = {
  data: [
    {
      id: number;
      name: string;
      picture: string;
    }
  ]
};

type Artist = {
  id: number;
  name: string;
  picture_small: string;
  type: string;
};

export type Track = {
  id: number;
  title: string;
  title_short: string;
  explicit_lyrics: boolean;
  preview: string;
  type: string;
};

export type AlbumData = {
  id: number;
  title: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  genres: Genres,
  label: string;
  release_date: string;
  record_type: string;
  explicit_lyrics: boolean;
  tracks: Track[];
  artist: Artist;
};
