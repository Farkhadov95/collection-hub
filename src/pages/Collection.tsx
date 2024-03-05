import { Divider, Box } from "@chakra-ui/react";
import ItemsContainer from "../components/collection/item/ItemsContainer";
import About from "../components/collection/About";
import Properties from "../components/collection/properties/Properties";
import { useParams } from "react-router-dom";

const Collection = () => {
  const id = useParams().id;
  console.log(id);
  return (
    <Box padding={{ base: 1, md: 5 }}>
      <About />
      <Divider marginY={5} />
      <Properties />
      <Divider marginY={5} />
      <ItemsContainer />
    </Box>
  );
};

export default Collection;
