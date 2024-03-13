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
import { getAllItems, getCollections } from "../../services/service";
import CollectionsItem from "../collection-card/CollectionCard";
import ItemCard from "../collection/item-cards/ItemCard";

const MainContent = () => {
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);
  const items = useCollectionStore((state) => state.items);
  const setItems = useCollectionStore((state) => state.setItems);

  useEffect(() => {
    Promise.all([getCollections(), getAllItems()])
      .then(([collectionsRes, itemsRes]) => {
        setCollections(collectionsRes);
        setItems(itemsRes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setCollections, setItems]);

  console.log(items);

  const sortedItems = items.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

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
          Top 5 Latest Items:{" "}
        </Heading>
        <HStack marginY={{ base: 2, md: 5 }}>
          {items.length !== 0 ? (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 5 }}
              spacing={5}
            >
              {sortedItems &&
                sortedItems
                  .slice(0, 5)
                  .map((item) => <ItemCard key={item._id} item={item} />)}
            </SimpleGrid>
          ) : (
            <Box>
              <Text>No Items</Text>
            </Box>
          )}
        </HStack>
      </Box>
      <Box>
        <Heading fontSize={{ base: "medium", md: "large" }}>
          Top 5 Largest Collections:
        </Heading>
        <HStack marginY={{ base: 2, md: 5 }}>
          {collections.length !== 0 ? (
            <SimpleGrid
              columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 5 }}
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
    </Stack>
  );
};

export default MainContent;
