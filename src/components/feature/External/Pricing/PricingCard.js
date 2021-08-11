import {
  Box,
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
  Button,
} from "@chakra-ui/react";
import { HiCheckCircle } from "react-icons/hi";
import PricingBadge from "./PricingBadge";

function PricingCard({
  icon,
  name,
  price,
  features,
  billedAnnually,
  isPopular,
}) {
  const background = useColorModeValue("white", "gray.900");
  const accentColor = useColorModeValue("blue.600", "blue.400");

  return (
    <Flex
      paddingX="24px"
      paddingBottom="24px"
      paddingTop="48px"
      position="relative"
      overflow="hidden"
      shadow="lg"
      width="100%"
      direction="column"
      background={background}
      rounded={{ sm: "xl" }}
    >
      {isPopular && <PricingBadge>Popular</PricingBadge>}
      <VStack spacing={6}>
        <Icon aria-hidden as={icon} fontSize="4xl" color={accentColor} />
        <Heading size="lg" fontWeight="bold">
          {name}
        </Heading>
      </VStack>
      <Box marginY="6">
        <Flex
          align="flex-end"
          justify="center"
          fontWeight="extrabold"
          color={accentColor}
        >
          <Heading
            size="xl"
            fontWeight="inherit"
            lineHeight="0.9em"
            marginRight="2px"
          >
            {price[billedAnnually ? 1 : 0]}
          </Heading>
          <Text fontWeight="inherit" fontSize="lg">
            / month
          </Text>
        </Flex>
        <Text
          color="gray.500"
          marginTop="4px"
          fontWeight="500"
          textAlign="center"
        >
          billed {billedAnnually ? "annually" : "monthly"}
        </Text>
      </Box>
      <List spacing="4" marginBottom="8" maxWidth="28ch" marginX="auto">
        {features.map((feature, index) => (
          <ListItem fontWeight="medium" key={index}>
            <ListIcon
              fontSize="xl"
              as={HiCheckCircle}
              marginEnd={2}
              color={accentColor}
            />
            {feature}
          </ListItem>
        ))}
      </List>
      <Button marginTop="auto" colorScheme="blue" size="lg">
        Buy Now
      </Button>
    </Flex>
  );
}

export default PricingCard;
