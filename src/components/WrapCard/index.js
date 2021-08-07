import { Avatar, Box, HStack, Text, VStack, WrapItem } from "@chakra-ui/react";

// Currently it's very particular
// need to make it general components by adding props.children
const Card = () => {
  return (
    <WrapItem>
      <Box bg="purple.700" w="350px" p={4} rounded="lg">
        <HStack direction="row" align="center" justify="flex-start">
          <Avatar mr={3}></Avatar>
          <VStack align="flex-start" spacing="0.5">
            <Text fontSize="md">Assets under Management</Text>
            <Text fontSize="2xl" fontWeight="bold">
              $53,381,819.45
            </Text>
          </VStack>
        </HStack>
      </Box>
    </WrapItem>
  );
};

export default Card;
