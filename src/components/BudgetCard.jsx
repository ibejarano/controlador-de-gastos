import React from "react";
import PropTypes from "prop-types";

import { Box, Heading, Progress, Center } from "@chakra-ui/react";

export default function BudgetCard({ section, current, limit }) {
  return (
    <Box maxW="400px" m="4" p="4" boxShadow="md">
      <Center m="0 0 20px 0">
        <Heading size="md">
          {section} ${current} / {limit ? `${limit}` : "Sin limite"}
        </Heading>
      </Center>
      <Progress value={limit ? (current / limit) * 100 : 0} />
    </Box>
  );
}

BudgetCard.propTypes = {
  section: PropTypes.string,
  current: PropTypes.number,
  limit: PropTypes.number,
};
