import React from "react";
import { Box, Flex, Text, HStack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { AiFillAppstore } from "react-icons/ai";
import { ImMenu } from "react-icons/im";

import { ListingsType } from "../types";

import Listing from "./Listing";
import OrderBy from "./OrderBy";

const Listings = ({ listings, setOrderingType, ordering, orderingType }) => {
  console.log(listings[0]);

  return (
    <Box px={8} py={5}>
      <Flex justify="space-between" align="center">
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
      <Box w="100%" h="100%" minH="100%" boxSizing="border-box" overflow="auto">
        {listings.map(listing => (
          <Listing key={listing.id} listing={listing} />
        ))}
      </Box>
    </Box>
  );
};
Listings.propTypes = {
  listings: ListingsType,
};

export default Listings;
