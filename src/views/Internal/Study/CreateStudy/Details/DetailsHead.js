import React from "react";
import { Heading, Text } from "@chakra-ui/react";

function DetailsHead() {
  return (
    <>
      <Heading size="lg" mb="10px">
        Modifying Title and Description
      </Heading>
      <Text mb="10px" color="gray.500">
        StudyFind strives to make research studies as accessible as possible. To achieve this, we
        ask that researchers simplify the language used in the study description by avoiding medical
        jargon and making it readable for the general population to improve their partipant
        recruitment
      </Text>
    </>
  );
}

export default DetailsHead;