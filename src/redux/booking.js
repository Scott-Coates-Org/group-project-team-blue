import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseClient from "firebase/client";

const initialState = {
  data: [],
  isLoaded: false,
  hasErrors: false,
};

const booking = createSlice({
  name: "booking",
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

export const reducer = booking.reducer;

export const { getData, getDataSuccess, getDataFailure, createDataFailure } = booking.actions;

export const fetchAllBookings = createAsyncThunk(
  "booking/fetchAllBookings",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(getData());

    try {
      const data = await _fetchAllBookingsFromDb();
      thunkAPI.dispatch(getDataSuccess(data));
    } catch (error) {
      console.error("error", error);
      thunkAPI.dispatch(getDataFailure(error.message));
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  "booking/fetchBookingById",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(getData());

    try {
      const data = await _fetchBookingByIdFromDb(payload.id);
      thunkAPI.dispatch(getDataSuccess(data));
    } catch (error) {
      console.error("error", error);
      thunkAPI.dispatch(getDataFailure(error.message));
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (payload, thunkAPI) => {
    try {
      await _createBooking(payload.customer, payload.order, payload.stripe, payload.waiver);
    } catch (error) {
      console.error("error", error);
      thunkAPI.dispatch(createDataFailure(error.message));
    }
  }
);

export const updateBooking = createAsyncThunk(
  "booking/createBooking",
  async (payload, thunkAPI) => {
    try {
      await _updateBooking(
        payload.docID,
        payload.customer,
        payload.order,
        payload.stripe,
        payload.waiver
      );
    } catch (error) {
      console.error("error", error);
      thunkAPI.dispatch(createDataFailure(error.message));
    }
  }
);

export const createBookingWithID = createAsyncThunk(
  "booking/createBookingWithID",
  async (payload, thunkAPI) => {
    try {
      await _createBookingWithID(
        payload.docID,
        payload.customer,
        payload.order,
        payload.stripe,
        payload.participants,
        payload.status
      );
    } catch (error) {
      console.error("error", error);
      thunkAPI.dispatch(createDataFailure(error.message));
    }
  }
);

async function _fetchAllBookingsFromDb() {
  const snapshot = await firebaseClient.firestore().collection("bookings").get();

  const bookingData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return bookingData;
}

async function _fetchBookingByIdFromDb(id) {
  const snapshot = await firebaseClient.firestore().collection("bookings").doc(id).get();
  const bookingData = snapshot ? { id: snapshot.id, ...snapshot.data() } : null;

  return bookingData;
}

async function _createBooking(customer, order, stripe, waiver) {
  const doc = await firebaseClient.firestore().collection("bookings").add({
    customer,
    order,
    stripe,
    waiver,
  });

  return doc;
}

async function _updateCustomer(customer, order, stripe, waiver) {
  const doc = await firebaseClient
    .firestore()
    .collection("bookings")
    .doc(docID)
    .update({ stripe });

  return doc;
}

async function _createBookingWithID(docID, customer, order, stripe, participants, status) {
  const doc = await firebaseClient
    .firestore()
    .collection("bookings")
    .doc(docID)
    .set({
      customer,
      order,
      stripe,
      participants,
      status
    });

  return doc;
}
