import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    error: false,
  },
  reducers: {
    updateList: (state, action) => {
      state.products = action.payload;
      state.error = false;
    },
    updateFailed: (state) => {
      state.error = true;
    },
    changeState: (state) => {
      state.error = false;
    },
  },
});

export const { updateList, updateFailed, changeState } = wishlistSlice.actions;
export default wishlistSlice.reducer;
