import { configureStore } from "@reduxjs/toolkit";

import listingsReducer from "../reducers/Listings";
import uiReducer from "../reducers/Ui";

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    ui: uiReducer,
  },
});
