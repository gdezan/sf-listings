import React from "react";
import { Grid, Heading, Stack, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

import { ListingType } from "../types";
import ApartmentImage from "../assets/apartment.jpg";
import { currency } from "../formatters";

const Listing = ({ listing }) => {
  const { bedrooms, addressLine1, bathrooms, price, formattedAddress } =
    listing;

  return (
    <Grid
      bgColor="white"
      px={8}
      py={2}
      my={4}
      templateColumns="calc(40% - 16px) calc(60% - 16px)"
      columnGap={8}
    >
      <Image borderRadius={12} w="100%" src={ApartmentImage} alt="Apartment" />
      <Stack>
        <Heading as="h2" fontSize="2xl" fontWeight={700} mb={2}>
          {addressLine1}
        </Heading>
        <Text isTruncated opacity={0.6} mb={2}>
          Address: {formattedAddress}
        </Text>
        <Text isTruncated opacity={0.6} mb={2}>
          Phone: +00 123456789
        </Text>
        <Text>{`${currency(price)}`}</Text>
        <Text>{`Bedrooms: ${bedrooms} - Bathrooms: ${bathrooms}`}</Text>
      </Stack>
    </Grid>
  );
};

Listing.propTypes = {
  listing: ListingType,
};

export default Listing;
