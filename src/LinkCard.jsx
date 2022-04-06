import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Link, Box } from "@chakra-ui/react";

const VARIANT_MAPPING = {
  primary: "teal.400",
  secondary: "red.400",
  disabled: "blackAlpha.400",
};

function LinkCard({ variant, to, children }) {
  return (
    <Box
      color={VARIANT_MAPPING[variant]}
      fontWeight="bold"
      shadow="md"
      p="16px"
    >
      <Link as={RouterLink} to={to}>
        {children}
      </Link>
    </Box>
  );
}

LinkCard.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "disabled"]),
  to: PropTypes.string,
  children: PropTypes.string,
};

LinkCard.defaultProps = {
  variant: "primary",
};

export default LinkCard;
