import { createSlice } from "@reduxjs/toolkit";

const AllUserSlice = createSlice({
  name: "allUser",
  initialState: {
    data: [],
  },
  reducers: {
    addALLUser: (state, action) => {
      state.data = [...action.payload];
    },
    removeAllUser: (state, action) => {},
  },
});
export const { addALLUser, removeAllUser } = AllUserSlice.actions;
export default AllUserSlice.reducer;
