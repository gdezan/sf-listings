import { configureStore } from "@reduxjs/toolkit";

import listingsReducer from "../reducers/Listings";

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
  },
});
