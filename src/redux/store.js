// https://dev.to/thatgalnatalie/how-to-get-started-with-redux-toolkit-41e
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reducer as user } from "./user";
import { reducer as widget } from "./widget";
import { reducer as product } from "./product";
import { reducer as room } from "./room";
import { reducer as opentime } from "./opentime";
import { reducer as customer } from "./customer";

const reducer = combineReducers({
  user,
  widget,
  product,
  room,
  opentime,
  customer,
  cartDetails,
});

const store = configureStore({
  reducer,
});

export default store;
