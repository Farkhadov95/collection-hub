import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import CollectionsItem from "./CollectionsItem";

const Collections = () => {
  return (
    <Box paddingX={5} paddingY={5}>
      <Heading fontSize="2xl" mb={4}>
        My Collections
      </Heading>
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
