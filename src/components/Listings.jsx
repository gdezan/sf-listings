import React from "react";
import { Box, Flex, Text, HStack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { AiFillAppstore } from "react-icons/ai";
import { ImMenu } from "react-icons/im";

import { ListingsType } from "../types";

import Listing from "./Listing";
import OrderBy from "./OrderBy";

const Listings = ({
  listings,
  setOrderingType,
  ordering,
  orderingType,
  selectedListing,
  selectListing,
  clearSelectedListing,
}) => {
  console.log(listings[0]);

  const onListingClick = listing => {
    if (listing.id === selectedListing?.id) {
      clearSelectedListing();
      return;
    }

    selectListing(listing);
  };

  return (
    <Box w="100%" h="100%" minH="100%" boxSizing="border-box">
      <Flex justify="space-between" align="center" px={8}>
        <Text color="gray.500">{`Showing ${listings.length} result${
          listings.length === 1 ? "" : "s"
        }...`}</Text>
        <HStack>
          <OrderBy
            setOrderingType={setOrderingType}
            orderingType={orderingType}
            ordering={ordering}
          />
          <IconButton variant="ghost" colorScheme="blue" size="lg" icon={<ImMenu />} />
          <IconButton
            variant="ghost"
            colorScheme="blue"
            size="lg"
            icon={<AiFillAppstore />}
            isDisabled
          />
        </HStack>
      </Flex>
      <Box w="100%" h="100%" minH="100%" overflow="auto" px={8}>
        {listings.map(listing => (
          <Listing key={listing.id} listing={listing} onClick={() => onListingClick(listing)} />
        ))}
      </Box>
    </Box>
  );
};
Listings.propTypes = {
  listings: ListingsType,
};

export default Listings;
