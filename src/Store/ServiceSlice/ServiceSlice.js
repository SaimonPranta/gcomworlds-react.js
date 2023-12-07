import { createSlice } from "@reduxjs/toolkit";

const ServiceSlice = createSlice({
  name: "services",
  initialState: {
    data: [],
  },
  reducers: {
    addService: (state, action) => {
      state.data = [...action.payload];
    }, 
  },
});
export const { addService } = ServiceSlice.actions;
export default ServiceSlice.reducer;
