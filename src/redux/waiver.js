import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseClient from "firebase/client";

const initialState = {
  data: [],
  isLoaded: false,
  hasErrors: false,
  errorMsg: {},
};

const waiver = createSlice({
  name: "waiver",
  initialState,
  reducers: {
    getData: (state) => {},

    getDataSuccess: (state, action) => {
      state.isLoaded = true;
      state.data = action.payload;
    },

    getDataFailure: (state, action) => {
      state.isLoaded = true;
      state.hasErrors = true;
      state.errorMsg = action.payload;
    },

    createDataFailure: (state, action) => {
      state.hasErrors = true;
      state.errorMsg = action.payload;
    },
  },
});

export const reducer = waiver.reducer;

export const { getData, getDataSuccess, getDataFailure, createDataFailure } = waiver.actions;
