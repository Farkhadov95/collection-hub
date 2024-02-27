import { Box, HStack, Heading, SimpleGrid } from "@chakra-ui/react";
import CollectionsItem from "./CollectionsItem";

const Collections = () => {
  return (
    <Box paddingX={5} paddingY={5}>
      <HStack marginBottom={5} justifyContent={"space-between"}>
        <Heading fontSize="2xl">My Collections</Heading>
      </HStack>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={5}>
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
        <CollectionsItem />
      </SimpleGrid>
    </Box>
  );
};

export default Collections;
