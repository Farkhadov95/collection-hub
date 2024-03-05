import { Divider, Box, Heading } from "@chakra-ui/react";
import ItemsContainer from "../components/collection/item/ItemsContainer";
import About from "../components/collection/About";
import Properties from "../components/collection/properties/Features";
import { useParams } from "react-router-dom";
import { useCollectionStore } from "../store/store";

const Collection = () => {
  const collectionID = useParams().id;
  const collections = useCollectionStore((state) => state.collections);
  const currentCollection = collections?.find((c) => c._id === collectionID);

  if (!currentCollection) {
    return <Heading>Empty collection</Heading>;
  }

  console.log(currentCollection);

  return (
    <Box padding={{ base: 1, md: 5 }}>
      <About currentCollection={currentCollection} />
      <Divider marginY={5} />
      <Properties currentCollection={currentCollection} />
      <Divider marginY={5} />
      <ItemsContainer />
    </Box>
  );
};

export default Collection;
