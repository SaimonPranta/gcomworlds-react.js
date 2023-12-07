import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: 0,
  },
  reducers: {
    addCart: (state, action) => {
      console.log(action);
      if (action.payload) {
        state.data = action.payload;
      } else {
        state.data = state.data + 1;
      }
    },
    removeCart: (state, action) => {
      if (action.payload) {
        if (action.payload < state.data) {
          state.data = state.data - action.payload;
        }
      } else {
        state.data = state.data - 1;
      }
    },
  },
});
export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
