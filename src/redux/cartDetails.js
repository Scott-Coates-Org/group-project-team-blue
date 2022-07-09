import { createSlice } from '@reduxjs/toolkit';

const cartDetails = createSlice({
  name: 'cart',
  initialState: {
    bookingDate: '',
    products: [],
    costs: { subtotal: 0, total: 0 },
    contactDetails: [],
    headcount: 0,
  },
  reducers: {
    getHeadcount: (state, action) => {
      state.headcount = state.products
        .filter((product) => product.type === 'product')
        .reduce((total, { quantity }) => total + quantity, 0);
    },
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
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          } else {
            return product;
          }
        });
      }
    },
    setBookingTime: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, time: action.payload.time };
        } else {
          return product;
        }
      });
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
  getHeadcount,
  getCosts,
  setBookingDate,
  setBookingTime,
  addToCart,
  reduceQty,
  removeFromCart,
} = cartDetails.actions;
