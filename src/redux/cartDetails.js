import { createSlice } from '@reduxjs/toolkit';

const cartDetails = createSlice({
  name: 'cart',
  initialState: {
    bookingDate: '',
    products: [],
    costs: { subtotal: 0, total: 0 },
    contactDetails: [],
  },
  reducers: {
    getCosts: (state, action) => {
      let productSubtotal = state.products.reduce(
        (subtotal, { price, quantity }) => subtotal + price * quantity,
        0
      );
      state.costs.subtotal = productSubtotal;
      state.costs.total = productSubtotal + 5.0 + productSubtotal * 0.05;
    },
    setBookingDate: (state, action) => {
      state.bookingDate = action.payload;
    },
    addToCart: (state, action) => {
      if (
        state.products.find((product) => product.id === action.payload.id) ==
        null
      ) {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity + 1,
        });
      } else {
        state.products = state.products.map((product) => {
          if (product.id !== action.payload.id) {
            return product;
          } else {
            return { ...product, quantity: product.quantity + 1 };
          }
        });
      }
    },
    changeBookingTime: (state, action) => {
      console.log(action.payload);
    },
    reduceQty: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const reducer = cartDetails.reducer;

export const {
  getCosts,
  setBookingDate,
  setBookingTime,
  addToCart,
  reduceQty,
  removeFromCart,
} = cartDetails.actions;