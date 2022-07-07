import { createSlice } from '@reduxjs/toolkit';

const cartDetails = createSlice({
  name: 'cart',
  initialState: {
    bookingDate: '',
    products: [],
    addons: [],
    totalCost: 0,
    contactDetails: [],
  },
  reducers: {
    getCartDetails: (state) => [],
    setBookingDate: (state, action) => {
      state.bookingDate = action.payload;
    },
  },
});

export const reducer = cartDetails.reducer;

export const { setBookingDate } = cartDetails.actions;
