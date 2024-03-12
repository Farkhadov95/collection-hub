import {
  Stack,
  Box,
  Heading,
  Tag,
  SimpleGrid,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useCollectionStore } from "../../store/store";
import { useEffect } from "react";
import { getCollections } from "../../services/service";
import CollectionsItem from "../collections/CollectionsItem";

const MainContent = () => {
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

  return (
    <Stack
      borderRadius={10}
      boxSizing={"border-box"}
      padding={{ base: 0, md: 5 }}
      marginTop={5}
    >
      <HStack mb={{ base: 2, md: 5 }}>
        <Heading fontSize={{ base: "medium", md: "large" }}>
          Popular tags:{" "}
        </Heading>
        <HStack flexWrap={"wrap"}>
          <Tag fontSize={{ base: "small", md: "medium" }}>Sample Tag</Tag>
          <Tag fontSize={{ base: "small", md: "medium" }}>Sample Tag</Tag>
          <Tag fontSize={{ base: "small", md: "medium" }}>Sample Tag</Tag>
          <Tag fontSize={{ base: "small", md: "medium" }}>Sample Tag</Tag>
          <Tag fontSize={{ base: "small", md: "medium" }}>Sample Tag</Tag>
        </HStack>
      </HStack>
      <Box>
        <Heading fontSize={{ base: "medium", md: "large" }}>
          Top 5 largest Collections:{" "}
        </Heading>
        <HStack marginY={{ base: 2, md: 5 }}>
          {collections.length !== 0 ? (
            <SimpleGrid
              columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
              spacing={5}
            >
              {collections.slice(0, 5).map((collection) => (
                <CollectionsItem key={collection._id} collection={collection} />
              ))}
            </SimpleGrid>
          ) : (
            <Box>
              <Text>No Collection</Text>
            </Box>
          )}
        </HStack>
      </Box>
      <Box>
        <Heading fontSize={{ base: "medium", md: "large" }}>
          Latest Collections:
        </Heading>
        <HStack marginY={{ base: 2, md: 5 }}>
          {collections.length !== 0 ? (
            <SimpleGrid
              columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
              spacing={5}
            >
              {collections.map((collection) => (
                <CollectionsItem key={collection._id} collection={collection} />
              ))}
            </SimpleGrid>
          ) : (
            <Box>
              <Text>No Collection</Text>
            </Box>
          )}
        </HStack>
      </Box>
    </Stack>
  );
};

export default MainContent;
