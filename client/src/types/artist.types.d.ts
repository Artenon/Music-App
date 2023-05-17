export type ArtistData = {
  data: Data[];
  total: number;
  next?: string;
  artist?: Artist;
};

type Artist = {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album?: number;
  nb_fan?: number;
  radio: boolean;
  tracklist: string;
  type: string;
  role?: string;
};

type Data = {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  contributors: Artist[];
  md5_image: string;
  artist: ArtistShortInfo;
  album: Album;
  type: string;
};

type Album = {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
};

type ArtistShortInfo = {
  id: number;
  name: string;
  tracklist: string;
  type: string;
};
