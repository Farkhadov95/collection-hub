import { Box, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import CollectionCard from "./CollectionCard";
import CollectionsItemCreate from "./AddCollectionCard";
import { useEffect } from "react";
import { getUserCollection } from "../../services/service";
import { useCollectionStore } from "../../store/store";
import useErrorHandler from "../../hooks/useError";

const CollectionContainer = () => {
  const userCollections = useCollectionStore((state) => state.userCollections);
  const setUserCollections = useCollectionStore(
    (state) => state.setUserCollections
  );
  const currentUser = useCollectionStore((state) => state.currentUser);
  const { handleFail } = useErrorHandler();

  useEffect(() => {
    getUserCollection(currentUser._id)
      .then((res) => {
        setUserCollections(res);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
  }, [currentUser._id, handleFail, setUserCollections]);

  return (
    <>
      <Box paddingX={5} paddingY={5}>
        <HStack marginBottom={5} justifyContent={"space-between"}>
          <Heading fontSize="2xl">My Collections</Heading>
          <CollectionsItemCreate />
        </HStack>
        {userCollections.length !== 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
            spacing={5}
          >
            {userCollections.map((collection) => (
              <CollectionCard key={collection._id} collection={collection} />
            ))}
          </SimpleGrid>
        ) : (
          <Box>
            <Text>No Collection</Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CollectionContainer;
