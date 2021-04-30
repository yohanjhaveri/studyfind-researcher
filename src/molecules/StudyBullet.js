import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

function StudyBullet({ icon, value, defaultValue }) {
  return (
    <Flex align="center" gridGap="10px">
      <Box as={icon} color="blue.500" size="16px" />
      <Text fontWeight="500" fontSize="sm">
        {value || defaultValue}
      </Text>
    </Flex>
  );
}

export default StudyBullet;
