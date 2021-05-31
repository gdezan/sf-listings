import React, { useState } from "react";
import { Grid, Heading, Stack, Text, Flex, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import Icon from "@chakra-ui/icon";
import { Link } from "@chakra-ui/layout";
import { BsCheckCircle } from "react-icons/bs";

import { ListingType } from "../types";
import ApartmentImage from "../assets/apartment.jpg";
import LikeButton from "./LikeButton";

const Listing = ({ listing, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { bedrooms, addressLine1, bathrooms, price, formattedAddress } = listing;

  return (
    <Grid
      bgColor="white"
      my={10}
      templateColumns="40% 50%"
      columnGap={8}
      cursor="pointer"
      onClick={onClick}
    >
      <Image borderRadius={12} w="100%" src={ApartmentImage} alt="Apartment" />
      <Box>
        <Heading as="h2" fontSize="2xl" fontWeight={700} mb={2}>
          {addressLine1}
        </Heading>
        <Text isTruncated opacity={0.6} mt={4} mb={2}>
          Address: {formattedAddress}
        </Text>
        <Text isTruncated opacity={0.6} mb={2}>
          Phone: +00 123456789
        </Text>
        <Flex justify="space-between">
          <Stack spacing={0}>
            <InfoText>
              <Icon as={BsCheckCircle} color="green" /> {`Bedrooms: ${bedrooms}`}
            </InfoText>
            <InfoText>
              <Icon as={BsCheckCircle} color="green" /> {`Bathrooms: ${bathrooms}`}
            </InfoText>
          </Stack>
          <Text fontWeight="bold" fontSize="xl">{`$${price}/month`}</Text>
        </Flex>
        <Flex justify="space-between" mt={4} alignItems="center">
          <Link href="#" color="green" textDecoration="underline">
            More details
          </Link>
          <LikeButton value={isLiked} setValue={() => setIsLiked(!isLiked)} />
        </Flex>
      </Box>
    </Grid>
  );
};

Listing.propTypes = {
  listing: ListingType,
};

const InfoText = ({ children }) => (
  <Text fontWeight="500" fontSize="lg" my={1}>
    {children}
  </Text>
);

export default Listing;
