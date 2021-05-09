import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

import listingsResponse from "../mocks/listingsResponse";

const initialState = { entities: [], loading: false, error: null };

export const fetchListings = createAsyncThunk("listings/fetch", async () => {
  // const options = {
  //   method: "GET",
  //   url: "https://realty-mole-property-api.p.rapidapi.com/rentalListings",
  //   params: {
  //     bedrooms: "2",
  //     city: "San Francisco",
  //     state: "CA",,
  //   },
  //   headers: {
  //     "x-rapidapi-key": "85580dcf96msh3f2a8cc0c66e4f2p184513jsn62876cda7304",
  //     "x-rapidapi-host": "realty-mole-property-api.p.rapidapi.com",
  //   },
  // };

  // const response = await axios.request(options);
  const response = await new Promise((resolve) =>
    setTimeout(() => resolve(listingsResponse), 1000)
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const filteredListings = response.data.filter(
    (listing) =>
      listing.price <= 5000 &&
      listing.propertyType === "Apartment" &&
      listing.status === "Active"
  );

  return filteredListings;
});

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {},
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

export default listingsSlice.reducer;
