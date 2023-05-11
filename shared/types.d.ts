export type ArtistInSearch = {
  id: number;
  name: string;
  picture_small: string;
  type: string;
};

export type Album = {
  id: number;
  title: string;
  cover_small: string;
  cover_medium: string;
  type: string;
};

export type SongData = {
  id: number;
  title: string;
  title_short: string;
  explicit_lyrics: boolean;
  preview: string;
  type: string;
  artist: ArtistInSearch;
  album: Album;
};

export type Artist = {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: string;
}