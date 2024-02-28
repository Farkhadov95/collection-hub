import { Divider, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import CollectionContent from "../components/collection/CollectionContent";
import CollectionAbout from "../components/collection/CollectionAbout";

const Collection = () => {
  return (
    <Box padding={5}>
      <Navbar />
      <Divider marginY={5} />
      <CollectionAbout />
      <Divider marginY={5} />
      <CollectionContent />
    </Box>
  );
};

export default Collection;
