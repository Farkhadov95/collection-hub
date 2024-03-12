import { Divider, Box, Heading } from "@chakra-ui/react";
import ItemsContainer from "../components/collection/item-cards/ItemContainer";
import About from "../components/collection/About";
import Features from "../components/collection/features/Features";
import { useParams } from "react-router-dom";
import { useCollectionStore } from "../store/store";

const Collection = () => {
  const collectionID = useParams().id;
  const collections = useCollectionStore((state) => state.collections);
  console.log(collections);
  console.log(collectionID);
  const currentCollection = collections?.find((c) => c._id === collectionID);
  const currentUser = useCollectionStore((state) => state.currentUser);

  console.log(currentUser);
  if (!currentCollection) {
    return <Heading>Empty collection</Heading>;
  }

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
