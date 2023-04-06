import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth-slice";
import { dataSlice } from "./data/data-slice";
import { trackSlice } from "./track/track-slice";
import { NameSpace } from "../const";

export const rootReducer = combineReducers({
  [NameSpace.AUTH]: authSlice.reducer,
  [NameSpace.DATA]: dataSlice.reducer,
  [NameSpace.TRACK]: trackSlice.reducer,
});
