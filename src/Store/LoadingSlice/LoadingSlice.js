import { createSlice } from "@reduxjs/toolkit";

const LoadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
