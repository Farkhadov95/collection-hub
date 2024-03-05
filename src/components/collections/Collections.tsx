import { Box, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import CollectionsItem from "./CollectionsItem";
import CollectionsItemCreate from "./CollectionsItemCreate";
import { useEffect } from "react";
import { getCollections } from "../../service/service";
import { useCollectionStore } from "../../store/store";

const Collections = () => {
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);

  useEffect(() => {
    getCollections()
      .then((res) => {
        setCollections(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setCollections]);

  return collections ? (
    <>
      <Box paddingX={5} paddingY={5}>
        <HStack marginBottom={5} justifyContent={"space-between"}>
          <Heading fontSize="2xl">My Collections</Heading>
          <CollectionsItemCreate />
        </HStack>
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={5}
        >
          {collections.map((collection) => (
            <CollectionsItem key={collection._id} collection={collection} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  ) : (
    <Box>
      <Text>No Collection</Text>
    </Box>
  );
};

export default Collections;
