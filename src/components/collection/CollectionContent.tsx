import { Box, SimpleGrid } from "@chakra-ui/react";
import CollectionTools from "./CollectionTools";
import CollectionContentItem from "./CollectionContentItem";

const CollectionContent = () => {
  return (
    <Box marginTop={5}>
      <CollectionTools />
      <SimpleGrid marginY={5} columns={{ base: 1, md: 1, xl: 2 }} spacing={5}>
        <CollectionContentItem />
        <CollectionContentItem />
        <CollectionContentItem />
        <CollectionContentItem />
        <CollectionContentItem />
        <CollectionContentItem />
        <CollectionContentItem />
      </SimpleGrid>
    </Box>
  );
};

export default CollectionContent;
