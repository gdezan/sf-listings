import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { search } = uiSlice.actions;
export default uiSlice.reducer;
