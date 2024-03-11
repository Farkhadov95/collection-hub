import { Divider, Box, Heading } from "@chakra-ui/react";
import ItemsContainer from "../components/collection/item-cards/ItemContainer";
import About from "../components/collection/About";
import Features from "../components/collection/features/Features";
import { useParams } from "react-router-dom";
import { useCollectionStore } from "../store/store";

const Collection = () => {
  const collectionID = useParams().id;
  const userCollections = useCollectionStore((state) => state.userCollections);
  const currentCollection = userCollections?.find(
    (c) => c._id === collectionID
  );

  if (!currentCollection) {
    return <Heading>Empty collection</Heading>;
  }

  console.log(currentCollection);

  return (
    <Box padding={{ base: 1, md: 5 }}>
      <About currentCollection={currentCollection} />
      <Divider marginY={5} />
      <Features currentCollection={currentCollection} />
      <Divider marginY={5} />
      <ItemsContainer />
    </Box>
  );
};

export default Collection;
