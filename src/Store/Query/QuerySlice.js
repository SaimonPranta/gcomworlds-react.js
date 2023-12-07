import { createSlice } from "@reduxjs/toolkit";

const QuerySlice = createSlice({
  name: "query",
    initialState: {
      data: "",
    }, 
  reducers: {
    addQuery: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { addQuery } = QuerySlice.actions;
export default QuerySlice.reducer;
