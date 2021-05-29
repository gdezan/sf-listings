import React from "react";
import { Flex } from "@chakra-ui/layout";

const Loading = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      bgColor="white"
      align="center"
      justify="center"
      fontSize="2xl"
      fontWeight="500"
      opacity={0.7}
    >
      Loading...
    </Flex>
  );
};

export default Loading;
