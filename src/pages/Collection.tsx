import { Divider, Box } from "@chakra-ui/react";
import ItemsContainer from "../components/collection/ItemsContainer";
import About from "../components/collection/About";

const Collection = () => {
  return (
    <Box padding={{ base: 1, md: 5 }}>
      <About />
      <Divider marginY={5} />
      <ItemsContainer />
    </Box>
  );
};

export default Collection;
