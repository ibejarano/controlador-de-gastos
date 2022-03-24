import React from "react";
import { Box, Heading, Progress, Text, Center } from "@chakra-ui/react";

export default function BudgetCard({ section, current, limit }) {
  return (
    <Box maxW="400px" p="4" boxShadow="md">
      <Center m="0 0 20px 0">
        <Heading size="md">
          {section} ${current} / ${limit}
        </Heading>
      </Center>
      {limit > 0 ? (
        <Progress value={(current / limit) * 100} />
      ) : (
        <Text>Presupuesto no asignado</Text>
      )}
    </Box>
  );
}
