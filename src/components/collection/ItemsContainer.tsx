import { Box, SimpleGrid } from "@chakra-ui/react";
import CollectionTools from "./CollectionTools";
import Item from "./Item";

const ItemsContainer = () => {
  return (
    <Box marginTop={5}>
      <CollectionTools />
      <SimpleGrid marginY={5} columns={{ base: 1, md: 1, xl: 2 }} spacing={5}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </SimpleGrid>
    </Box>
  );
};

export default ItemsContainer;
