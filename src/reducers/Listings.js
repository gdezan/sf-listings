import { createSlice } from "@reduxjs/toolkit";
import { OrderingTypes } from "../constants";

import { fetchListings } from "./helpers/Listings";

const initialState = {
  entities: [],
  loading: false,
  error: null,
  orderingType: null,
  ordering: "asc",
  selectedListing: null,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setOrderingType: (state, action) => {
      const orderingType = action.payload;

      let newOrdering = state.ordering === "asc" ? "desc" : "asc";
      if (orderingType === state.orderingType) {
        state.ordering = newOrdering;
      } else {
        newOrdering = "asc";
        state.orderingType = orderingType;
        state.ordering = newOrdering;
      }

      state.entities = state.entities.sort((a, b) => {
        let orderField;
        switch (orderingType) {
          case OrderingTypes.PRICE:
            orderField = "price";
            break;
          case OrderingTypes.TIME_LISTED:
            orderField = "listedDate";
            break;
          case OrderingTypes.SQUARE_FOOTAGE:
            orderField = "squareFootage";
            break;
          default:
            throw new Error("Unexpected ordering type");
        }

        if (newOrdering === "asc") {
          return b[orderField] - a[orderField];
        }
        return a[orderField] - b[orderField];
      });
    },

    selectListing: (state, action) => {
      state.selectedListing = action.payload;
    },

    clearSelectedListing: state => {
      state.selectedListing = null;
    },
  },
  extraReducers: {
    [fetchListings.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchListings.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.entities = [];
      state.error = action.error;
    },
    [fetchListings.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
      state.error = null;
    },
  },
});

export { fetchListings } from "./helpers/Listings";

export const { setOrderingType, selectListing, clearSelectedListing } = listingsSlice.actions;
export default listingsSlice.reducer;
