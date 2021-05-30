import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsX } from "react-icons/bs";

import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";
import { Text } from "@chakra-ui/layout";

const SearchBar = ({ search, searchText: initialText }) => {
  const [searchText, setSearchText] = useState(initialText);

  const onSubmit = event => {
    event.preventDefault();
    search(searchText);
  };

  return (
    <Box as={"form"} px={8} pt={10} pb={5} onSubmit={onSubmit}>
      <InputGroup size="lg">
        <Input
          type={"text"}
          placeholder="Name, street, region"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          pr={16}
          borderColor="gray.300"
        />
        <InputRightElement width={14} mr={2}>
          <Button type="submit" px={4} h={8} colorScheme="blue">
            Find
          </Button>
        </InputRightElement>
      </InputGroup>
      <Collapse in={initialText.length > 0} unmountOnExit={false}>
        <Flex justify="flex-end">
          <Button
            variant="ghost"
            leftIcon={<BsX color="gray.500" />}
            mt={2}
            onClick={() => {
              search("");
              setSearchText("");
            }}
          >
            <Text fontWeight="400" color="gray.500">
              Clear search
            </Text>
          </Button>
        </Flex>
      </Collapse>
    </Box>
  );
};

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
};

export default SearchBar;
