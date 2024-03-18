import {
  Stack,
  Box,
  Heading,
  SimpleGrid,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useCollectionStore } from "../../store/store";
import { useEffect, useState } from "react";
import { getAllItems, getCollections } from "../../services/service";
import CollectionsItem from "../collection-card/CollectionCard";
import ItemCard from "../item-cards/ItemCard";
import useErrorHandler from "../../hooks/useError";
import { ItemType } from "../../types/types";

const MainContent = () => {
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);
  const items = useCollectionStore((state) => state.items);
  const setItems = useCollectionStore((state) => state.setItems);
  const { handleFail } = useErrorHandler();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);

  useEffect(() => {
    Promise.all([getCollections(), getAllItems()])
      .then(([collectionsRes, itemsRes]) => {
        setCollections(collectionsRes);
        setItems(itemsRes);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
  }, [handleFail, setCollections, setItems]);

  const sortedItems = items.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const tagsSet = new Set<string>();
  items.forEach((item) => {
    const tagsArray = item.tags.split(" ");
    tagsArray.forEach((tag) => tagsSet.add(tag));
  });
  const uniqueTags = Array.from(tagsSet);

  const handleSelectTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      return;
    }
    setSelectedTags([...selectedTags, tag]);
  };

  useEffect(() => {
    const filteredItemsByTag = items.filter((item) => {
      const itemTags = item.tags.split(" ");
      return selectedTags.every((tag) => itemTags.includes(tag));
    });
    setFilteredItems(filteredItemsByTag);
  }, [selectedTags, items]);

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
        <HStack flexWrap={"wrap"} gap={1}>
          {uniqueTags.map((tag: string, index: number) => (
            <Button
              variant={"outline"}
              colorScheme={selectedTags.includes(tag) ? "green" : "white"}
              borderRadius={10}
              key={index}
              fontSize={{ base: "small", md: "medium" }}
              height={"fit-content"}
              paddingY={1}
              onClick={() => handleSelectTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </HStack>
      </HStack>
      {selectedTags.length > 0 && (
        <HStack marginBottom={{ base: 2, md: 5 }} justifyContent={"center"}>
          {filteredItems.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 5 }}
              spacing={5}
            >
              {filteredItems.slice(0, 5).map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </SimpleGrid>
          ) : (
            <Heading>No Items on selected tags</Heading>
          )}
        </HStack>
      )}
      <Box>
        <Heading fontSize={{ base: "medium", md: "large" }}>
          Top 5 Latest Items:
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
              {collections.slice(0, 10).map((collection) => (
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
