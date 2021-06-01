import React from "react";
import { Box, Flex, Text, HStack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { AiFillAppstore } from "react-icons/ai";
import { ImMenu } from "react-icons/im";

import { ListingsType, ListingType } from "../types";

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
    <Flex w="100%" maxH="100%" overflowY="hidden" direction="column">
      <Flex justify="space-between" align="center" px={[4, 4, 8]} h="40px">
        <Text color="gray.500" fontSize={["sm", "sm", "md"]}>{`Showing ${listings.length} result${
          listings.length === 1 ? "" : "s"
        }...`}</Text>
        <HStack>
          <OrderBy
            setOrderingType={setOrderingType}
            orderingType={orderingType}
            ordering={ordering}
          />
          <IconButton
            variant="ghost"
            colorScheme="blue"
            size={["md", "md", "lg"]}
            icon={<ImMenu />}
          />
          <IconButton
            variant="ghost"
            colorScheme="blue"
            size={["md", "md", "lg"]}
            icon={<AiFillAppstore />}
            isDisabled
          />
        </HStack>
      </Flex>
      <Box w="100%" h="calc(100% -40px)" minH="calc(100% -40px)" overflow="auto" px={[2, 2, 4]}>
        {listings.map(listing => (
          <Listing
            key={listing.id}
            listing={listing}
            onClick={() => onListingClick(listing)}
            isSelected={listing.id === selectedListing?.id}
          />
        ))}
      </Box>
    </Flex>
  );
};
Listings.propTypes = {
  listings: ListingsType,
  ordering: PropTypes.string,
  orderingType: PropTypes.string,
  selectedListing: ListingType,

  setOrderingType: PropTypes.func.isRequired,
  selectListing: PropTypes.func.isRequired,
  clearSelectedListing: PropTypes.func.isRequired,
};

export default Listings;
