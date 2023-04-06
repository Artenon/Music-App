import { AuthStatus } from "../const";
import { AlbumData } from "./search.album";
import { SearchData } from "./search.data";

export type DefaultResponse = {
  message: string,
  errors?: [],
};

export type LoginResponse = {
  message: string,
  token: string,
  userId: string,
  username: string,
};

export type AuthResponse = {
  message: AuthStatus,
};

export type SearchDataResponse = {
  data: SearchData[]
};

export type AlbumDataResponse = {
  data: AlbumData;
}
