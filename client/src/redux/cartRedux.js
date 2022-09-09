import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      if (state.products.some((e) => e._id === action.payload._id)) {
        // addQty(action.payload);
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.qty;
      }
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload._id),
        1
      );
      state.total -= action.payload.price * action.payload.qty;
    },
    addQty: (state, action) => {
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ].qty += 1;
      state.total += action.payload.price;
    },
    descQty: (state, action) => {
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ].qty -= 1;
      state.total -= action.payload.price;
    },
    emptyCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, addQty, descQty, emptyCart, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
