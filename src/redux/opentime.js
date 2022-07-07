import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseClient from "firebase/client";

const initialState = {
  timedata: {},
  timeisLoaded: false,
  timehasErrors: false,
  //add error?
};

const opentime = createSlice({
  name: "opentime",
  initialState,
  reducers: {
    getData: (state) => {},

    getDataSuccess: (state, action) => {
      state.timeisLoaded = true;
      state.timedata = action.payload;
    },

    getDataFailure: (state, action) => {
      state.timeisLoaded = true;
      state.timehasErrors = true;
    },

    createDataFailure: (state) => {
      state.timehasErrors = true;
      //add errors?
    },
  },
});

export const reducer = opentime.reducer;

export const { getData, getDataSuccess, getDataFailure, createDataFailure } =
  opentime.actions;

export const fetchOpenTimes = createAsyncThunk(
  "opentime/fetchOpenTimes",
  async (_, thunkAPI) => {
    // Set the loading state to true
    thunkAPI.dispatch(getData());

    try {
      const data = await _fetchOpenTimesFromDb();
      thunkAPI.dispatch(getDataSuccess(data));
    } catch (error) {
      console.error("error", error);
      // Set any erros while trying to fetch
      thunkAPI.dispatch(getDataFailure(error));
    }
  }
);

export const createOpenTime = createAsyncThunk(
  "opentime/createOpenTime",
  async (payload, thunkAPI) => {
    try {
      await _createOpenTime(payload.date, payload.open, payload.close);
    } catch (error) {
      console.error("error", error);
      thunkAPI.dispatch(createDataFailure());
    }
  }
);

async function _fetchOpenTimesFromDb() {
  const snapshot = await firebaseClient
    .firestore()
    .collection("opentime")
    .get();

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
}

async function _createOpenTime(date, open, close) {
  const doc = await firebaseClient
    .firestore()
    .collection("opentime")
    .add({ date, open, close });

  return doc;
}

//test function
export const fetchTime = createAsyncThunk(
  "time/fetchTime",
  async (_, thunkAPI) => {
    // Set the loading state to true
    thunkAPI.dispatch(getData());

    try {
      const data = await _fetchTimeFromDb();
      thunkAPI.dispatch(getDataSuccess(data));
    } catch (error) {
      console.error("error", error);
      // Set any erros while trying to fetch
      thunkAPI.dispatch(getDataFailure(error));
    }
  }
);


async function _fetchTimeFromDb() {
  const snapshot = await firebaseClient
    .firestore()
    .collection("opentime")
    .get();

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
}