import { Box, SimpleGrid } from "@chakra-ui/react";
import CollectionTools from "../CollectionTools";
import Item from "./Item";

const ItemsContainer = () => {
  return (
    <Box marginTop={5}>
      <CollectionTools />
      <SimpleGrid
        marginY={5}
        columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
        spacing={5}
      >
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
