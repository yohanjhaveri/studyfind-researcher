import React from "react";
import { Heading, Text, Box, Icon, Center, Flex } from "@chakra-ui/react";
import { FaTimesCircle, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export const Message = ({ status, title, description, children, ...rest }) => {
  const statuses = {
    success: {
      icon: FaCheckCircle,
      color: "green",
    },
    neutral: {
      icon: FaExclamationCircle,
      color: "blue",
    },
    failure: {
      icon: FaTimesCircle,
      color: "red",
    },
  };

  const { icon, color } = statuses[status] || statuses.neutral;

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      h="100%"
      w="100%"
      bg={`${color}.50`}
      p="30px"
      rounded="md"
      borderWidth="1px"
      borderColor={`${color}.400`}
      {...rest}
    >
      <Center maxW="400px">
        <Flex direction="column" align="center" textAlign="center">
          <Icon as={icon} h="36px" w="36px" color={`${color}.400`} />
          <Heading fontSize="24px" mt="12px" mb="6px">
            {title}
          </Heading>
          <Text color="gray.500">{description}</Text>
          {children && <Box mb="15px">{children}</Box>}
        </Flex>
      </Center>
    </Flex>
  );
};
