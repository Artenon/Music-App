import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./user/user-slice";
import { dataSlice } from "./data/data-slice";
import { trackSlice } from "./track/track-slice";
import { NameSpace } from "../const";

export const rootReducer = combineReducers({
  [NameSpace.USER]: userSlice.reducer,
  [NameSpace.DATA]: dataSlice.reducer,
  [NameSpace.TRACK]: trackSlice.reducer,
});
