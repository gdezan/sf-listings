import React from "react";
import { Button } from "@chakra-ui/button";
import { MenuItem, MenuButton, MenuList, Menu } from "@chakra-ui/menu";
import { Text, Box } from "@chakra-ui/layout";
import { BsChevronDown } from "react-icons/bs";

import { OrderingTypes } from "../constants";

const OrderByMenuItem = ({ label, value, ordering, orderingType, setOrderingType }) => (
  <MenuItem
    value={value}
    icon={
      <Box
        opacity={value === orderingType ? 1 : 0}
        transition="all 0.1s ease"
        transform={`rotate(${ordering === "asc" ? -180 : 0}deg)`}
      >
        <BsChevronDown color="blue" />
      </Box>
    }
    onClick={() => setOrderingType(value)}
  >
    {label}
  </MenuItem>
);
OrderByMenuItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  orderingType: PropTypes.string.isRequired,
  ordering: PropTypes.string.isRequired,

  setOrderingType: PropTypes.func.isRequired,
};

const OrderBy = ({ orderingType, ordering, setOrderingType }) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} variant="ghost" rightIcon={<BsChevronDown />}>
        <Text fontWeight="400" color="gray.500" fontSize={["sm", "sm", "md"]}>
          Order by
        </Text>
      </MenuButton>
      <MenuList minWidth="240px" boxShadow="lg" mt={2}>
        <OrderByMenuItem
          label="Time listed"
          value={OrderingTypes.TIME_LISTED}
          ordering={ordering}
          orderingType={orderingType}
          setOrderingType={setOrderingType}
        />
        <OrderByMenuItem
          label="Price"
          value={OrderingTypes.PRICE}
          ordering={ordering}
          orderingType={orderingType}
          setOrderingType={setOrderingType}
        />
      </MenuList>
    </Menu>
  );
};

OrderBy.propTypes = {
  orderingType: PropTypes.string.isRequired,
  ordering: PropTypes.string.isRequired,

  setOrderingType: PropTypes.func.isRequired,
};

export default OrderBy;
