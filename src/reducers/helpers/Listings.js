import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUnixTime } from "date-fns";

import listingsResponse from "../../mocks/listingsResponse";

export const fetchListings = createAsyncThunk("listings/fetch", async () => {
  let response;
  if (process.env.REACT_APP_USING_API !== "true") {
    response = await new Promise(resolve => setTimeout(() => resolve(listingsResponse), 1000));
  } else {
    const options = {
      method: "GET",
      url: "https://realty-mole-property-api.p.rapidapi.com/rentalListings",
      params: {
        bedrooms: "2",
        city: "San Francisco",
        state: "CA",
      },
      headers: {
        "x-rapidapi-key": "85580dcf96msh3f2a8cc0c66e4f2p184513jsn62876cda7304",
        "x-rapidapi-host": "realty-mole-property-api.p.rapidapi.com",
      },
    };

    response = await axios.request(options);
  }

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const filteredListings = response.data
    .filter(
      listing =>
        listing.price <= 5000 &&
        listing.propertyType === "Apartment" &&
        listing.status === "Active",
    )
    .map(listing => ({ ...listing, listedDate: getUnixTime(new Date(listing.listedDate)) }));

  return filteredListings;
});
