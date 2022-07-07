import { createSlice } from '@reduxjs/toolkit';

const cartDetails = createSlice({
  name: 'cart',
  initialState: {
    bookingDate: '',
    products: [
      {
        id: 1,
        title: '60-min Pass',
        type: 'product',
        room: null,
        duration: 60,
        price: 30,
        photo:
          'https://res.cloudinary.com/dxzcdb0pm/image/upload/v1656913968/samples/allday_wxg2gs.jpg',
        quantity: 0,
        desc: 'Access to all parts of the park for an hour.',
      },
      {
        id: 2,
        title: '60-min Pass',
        type: 'product',
        room: null,
        duration: 60,
        price: 30,
        photo:
          'https://res.cloudinary.com/dxzcdb0pm/image/upload/v1656913968/samples/allday_wxg2gs.jpg',
        quantity: 0,
        desc: 'Access to all parts of the park for an hour.',
      },
    ],
    totalCost: 0,
    contactDetails: [],
  },
  reducers: {
    setBookingDate: (state, action) => {
      state.bookingDate = action.payload;
    },
    // addToCart: (state, action) => {
    //   state.products = action.payload;
    //   console.log(state);
    // },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const reducer = cartDetails.reducer;

export const { setBookingDate, removeFromCart } = cartDetails.actions;
