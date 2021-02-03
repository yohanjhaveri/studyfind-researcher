import React from "react";
import { Heading, Text, Switch, Badge, Box, Flex } from "@chakra-ui/react";
import { updateStudy } from "database/studies";

function Activate({ study }) {
  const handleToggle = () => {
    updateStudy(study.id, { activated: !study.activated });
  };

  return (
    <Box p="20px" borderBottom="1px solid #f1f2f3">
      <Flex align="center" mb="8px">
        <Heading size="md" mr="10px">
          Recruitment Status
        </Heading>
        <Badge colorScheme={study.activated ? "green" : "red"} fontSize="0.8rem">
          {study.activated ? "ACTIVE" : "INACTIVE"}
        </Badge>
      </Flex>
      <Text color="gray.500" my="8px">
        Your study recruitment status corresponds to whether you are accepting participants into
        your study. A status of active allows participants to enroll while a status of inactive
        prevents participants from enrolling.
      </Text>

      <Switch
        size="lg"
        isDisabled={!study.published}
        isChecked={study.activated}
        onChange={handleToggle}
      />
    </Box>
  );
}

export default Activate;