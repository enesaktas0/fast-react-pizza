import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteCart(state, action);
    },
    deleteCart(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  updateCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.totalPrice;
  }, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
