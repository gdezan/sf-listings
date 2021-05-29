import React from "react";
import { Box } from "@chakra-ui/layout";

import { ListingsType } from "../types";

import Listing from "./Listing";

const Listings = ({ listings }) => {
  return (
    <Box w="100%" h="100%" minH="100%" boxSizing="border-box" overflow="auto">
      {listings.map((listing) => (
        <Listing key={listing.id} listing={listing} />
      ))}
    </Box>
  );
};
Listings.propTypes = {
  listings: ListingsType,
};

export default Listings;
