import { Box, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import CollectionsItem from "./CollectionsItem";
import CollectionsItemCreate from "./CollectionsItemCreate";
import { useEffect, useState } from "react";
import { getCollections } from "../../service/service";
import { Collection } from "../../store/store";

const Collections = () => {
  const [collections, setCollection] = useState<Collection[]>([]);

  useEffect(() => {
    getCollections()
      .then((res) => {
        setCollection(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return collections ? (
    <>
      <Box paddingX={5} paddingY={5}>
        <HStack marginBottom={5} justifyContent={"space-between"}>
          <Heading fontSize="2xl">My Collections</Heading>
          <CollectionsItemCreate />
        </HStack>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
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
