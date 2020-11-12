import React from "react";
import styled from "styled-components";

import { Heading, Text, Box, Tag, TagLabel, Stack, Avatar } from "@chakra-ui/core";
import { FaVenusMars, FaBirthdayCake, FaHeart } from "react-icons/fa";

function StudyCardLarge({ study }) {
  const { researcher } = study;

  const getInitials = (name) => {
    if (!name) return "";
    const split = name.split(" ");
    return split[0] + " " + split[split.length - 1];
  };

  return (
    <Study borderWidth="1px" rounded="md" overflow="hidden" bg="white" p="20px">
      <Text fontSize="sm" color="gray.400">
        {study.nctID}
      </Text>
      <Heading size="md" mt="5px">
        {study.title}
      </Heading>
      <Conditions spacing={1} isInline mt="6px">
        {study.conditions &&
          study.conditions.map((condition, index) => (
            <Condition key={index} variant="solid" size="sm" variantColor="teal">
              <TagLabel>{condition}</TagLabel>
            </Condition>
          ))}
      </Conditions>
      <Text color="gray.500" my="15px">
        {study.description}
      </Text>
      <Details>
        <Eligibility>
          <Criterion>
            <Box as={FaVenusMars} color="teal.500" size="16px" />
            <Text fontWeight="500" fontSize="sm">
              {study.sex || "All"}
            </Text>
          </Criterion>
          <Criterion>
            <Box as={FaBirthdayCake} color="teal.500" size="16px" />
            <Text fontWeight="500" fontSize="sm">
              {study.age || "All"} years
            </Text>
          </Criterion>
          <Criterion>
            <Box as={FaHeart} color="teal.500" size="16px" />
            <Text fontWeight="500" fontSize="sm">
              {study.control === "Yes"
                ? "Accepts Healthy Volunteers"
                : "Does not accept healthy volunteers"}
            </Text>
          </Criterion>
        </Eligibility>
        {researcher && (
          <Researcher borderWidth="1px" rounded="md" overflow="hidden" bg="white" p="12px">
            <Avatar bg="teal.500" name={getInitials(researcher.name)} />
            <Box>
              <Text>{researcher.name}</Text>
              <Text color="gray.500">
                <a href={`mailto:${researcher.email}`}>{researcher.email}</a>
              </Text>
            </Box>
          </Researcher>
        )}
      </Details>
    </Study>
  );
}

const Study = styled(Box)``;

const Conditions = styled(Stack)`
  display: grid;
`;

const Condition = styled(Tag)``;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Eligibility = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const Criterion = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
`;

const Researcher = styled(Box)`
  display: flex;
  grid-gap: 10px;
  align-self: flex-end;
`;

export default StudyCardLarge;