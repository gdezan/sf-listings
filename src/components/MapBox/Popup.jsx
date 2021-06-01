import React from "react";
import { Box, Heading, Text, Flex, Link } from "@chakra-ui/layout";
import { ListingType } from "../../types";

const Popup = ({ listing }) => {
  const { addressLine1, formattedAddress, price } = listing;
  return (
    <Box>
      <Heading as="h2" fontSize={"2xl"} fontWeight={700} mb={2}>
        {addressLine1}
      </Heading>
      <Text fontSize={"md"} opacity={0.6} mt={4} mb={4}>
        {formattedAddress}
      </Text>
      <Flex justify="space-between">
        <Link href="#" color="green" textDecoration="underline" fontSize={["sm", "sm", "md"]}>
          More details
        </Link>
        <Text fontWeight="bold" fontSize={["lg", "lg", "xl"]}>{`$${price}/month`}</Text>
      </Flex>
    </Box>
  );
};

Popup.propTypes = {
  listing: ListingType,
};

export default Popup;
