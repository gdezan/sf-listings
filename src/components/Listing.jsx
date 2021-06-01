import React, { useState } from "react";
import { Grid, Heading, Stack, Text, Flex, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import Icon from "@chakra-ui/icon";
import { Link } from "@chakra-ui/layout";
import { BsCheckCircle } from "react-icons/bs";

import { ListingType } from "../types";
import ApartmentImage from "../assets/apartment.jpg";
import useIsMobile from "../hooks/useIsMobile";

import LikeButton from "./LikeButton";

const Listing = ({ listing, onClick, isSelected }) => {
  const [isLiked, setIsLiked] = useState(false);
  const isMobile = useIsMobile();
  const { bedrooms, addressLine1, bathrooms, price, formattedAddress } = listing;

  return (
    <Grid
      bgColor="white"
      my={4}
      templateColumns={["1fr", "1fr", "40% 50%"]}
      columnGap={8}
      _hover={{
        bgColor: "gray.100",
      }}
      px={[2, 2, 4]}
      py={[3, 3, 6]}
      borderRadius={12}
      transition="background-color 0.3s ease, border-color 0.3s ease"
      border="2px solid"
      borderColor={isSelected ? "blue.500" : "transparent"}
    >
      <Box onClick={onClick} cursor="pointer">
        <Image borderRadius={12} w="100%" src={ApartmentImage} alt="Apartment" />
      </Box>
      <Box mt={[4, 4, 0]}>
        <Box onClick={onClick} cursor="pointer">
          <Heading as="h2" fontSize={"2xl"} fontWeight={700} mb={2}>
            {addressLine1}
          </Heading>
          <Text
            isTruncated={!isMobile}
            fontSize={["sm", "sm", "md"]}
            opacity={0.6}
            mt={[2, 2, 4]}
            mb={[1, 1, 2]}
          >
            Address: {formattedAddress}
          </Text>
          <Text isTruncated fontSize={["sm", "sm", "md"]} opacity={0.6} mb={[1, 1, 2]}>
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
            <Text fontWeight="bold" fontSize={["lg", "lg", "xl"]}>{`$${price}/month`}</Text>
          </Flex>
        </Box>
        <Flex justify="space-between" mt={[2, 2, 4]} alignItems="center">
          <Link href="#" color="green" textDecoration="underline" fontSize={["sm", "sm", "md"]}>
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
  isSelected: PropTypes.bool,

  onClick: PropTypes.func.isRequired,
};

const InfoText = ({ children }) => (
  <Text fontWeight="500" fontSize={["sm", "sm", "lg"]} my={1}>
    {children}
  </Text>
);
InfoText.propTypes = {
  children: PropTypes.node,
};

export default Listing;
