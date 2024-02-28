import { Box, List } from "@chakra-ui/react";
import CollectionTools from "./CollectionTools";
import CollectionContentItem from "./CollectionContentItem";

const CollectionContent = () => {
  return (
    <Box marginTop={5}>
      <CollectionTools />
      <List marginY={5}>
        <CollectionContentItem />
        <CollectionContentItem />
        <CollectionContentItem />
        <CollectionContentItem />
      </List>
    </Box>
  );
};

export default CollectionContent;
