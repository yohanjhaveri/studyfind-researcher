import React, { useState } from "react";
import { Heading, Text, Button, FormErrorMessage, Box, Flex } from "@chakra-ui/react";
import { resetStudy } from "database/studies";
import { format } from "functions";

function Update({ study }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = () => {
    setLoading(true);
    resetStudy(study.id)
      .then(console.log)
      .catch((err) => {
        console.log(err);
        setError(`Update failed: ${err}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box p="20px" borderBottom="1px solid #f1f2f3">
      <Heading mb="8px" size="md">
        Update Study
      </Heading>
      <Text color="gray.500" my="8px">
        Updating the study will retrieve any new data clinicaltrials.gov and update it accordingly.
        This action will not overwrite your edited study title, description and survey questions.
      </Text>
      <Flex mt="16px" mb="8px">
        <Text color="black" fontWeight="500">
          Last Updated:
        </Text>
        <Text color="gray.500" ml="4px">
          {format.date(study.updatedAt)}
        </Text>
      </Flex>
      <Button
        type="submit"
        onClick={handleUpdate}
        colorScheme="blue"
        isLoading={loading}
        loadingText="Updating"
      >
        Update
      </Button>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </Box>
  );
}

export default Update;
