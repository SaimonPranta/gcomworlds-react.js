import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    data: {},
  },
  reducers: {
    addConfig: (state, action) => {
      state.data = { ...action.payload };
    }
  },
});
export const { addConfig } = configSlice.actions;
export default configSlice.reducer;
