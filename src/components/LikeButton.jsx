import React from "react";
import PropTypes from "prop-types";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { keyframes } from "@chakra-ui/system";

const LikeButton = ({ value, setValue }) => {
  return (
    <Box onClick={setValue} cursor="pointer">
      {value ? (
        <Icon boxSize={5} as={BsHeartFill} color="red" animation={`${heart} 0.2s linear`} />
      ) : (
        <Icon boxSize={5} color="gray.400" as={BsHeart} />
      )}
    </Box>
  );
};

const heart = keyframes`
  0% { opacity: 0; transform: scale(0) }
  50% { opacity: 1; transform: scale(1.3) }
  100% { transform: scale(1) }
`;

LikeButton.propTypes = {
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default LikeButton;
