import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
  },
  reducers: {
    addProducts: (state, action) => {
      state.data = [...action.payload];
    }, 
  },
});
export const { addProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
