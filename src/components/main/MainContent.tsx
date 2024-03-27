import {
  Stack,
  Box,
  Heading,
  SimpleGrid,
  HStack,
  Button,
  useColorMode,
  Collapse,
  Spinner,
} from "@chakra-ui/react";
import { useCollectionStore } from "../../store/store";
import { useEffect, useState } from "react";
import { getAllItems, getCollections } from "../../services/service";
import ItemCard from "../item-cards/ItemCard";
import useErrorHandler from "../../hooks/useError";
import { ItemType } from "../../types/types";
import { useTranslation } from "react-i18next";
import MainItemSwiper from "./MainSwiper";
import MainSwiper from "./MainSwiper";
import SkeletonsGrid from "../skeletons/SkeletonsGrid";
import { Link } from "react-router-dom";
import { sortedItems } from "../../utils";

const MainContent = () => {
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);
  const items = useCollectionStore((state) => state.items);
  const setItems = useCollectionStore((state) => state.setItems);
  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getCollections(), getAllItems()])
      .then(([collectionsRes, itemsRes]) => {
        setCollections(collectionsRes);
        setItems(itemsRes);
        generateTags(itemsRes);
        setIsLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
        setIsLoading(false);
      });
  }, [handleFail, setCollections, setItems]);

  const generateTags = (items: ItemType[]) => {
    const tagsSet = new Set<string>();
    items.forEach((item) => {
      const tagsArray = item.tags.split(" ");
      tagsArray.forEach((tag) => tagsSet.add(tag));
    });
    const uniqueTags = Array.from(tagsSet);
    setTags(uniqueTags);
  };

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

  const isSelectedTag = selectedTags.length > 0;

  return (
    <Stack
      borderRadius={10}
      boxSizing={"border-box"}
      padding={{ base: 0, md: 5 }}
      marginTop={5}
    >
      <Box
        bgColor={
          colorMode === "dark" ? "RGBA(255, 255, 255, 0.36)" : "gray.200"
        }
        boxSizing="border-box"
        padding={5}
        borderRadius={10}
        width={"fit-content"}
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      >
        <HStack
          mb={isSelectedTag ? { base: 2, md: 5 } : { base: 0 }}
          flexDirection={{ base: "column", sm: "row" }}
          alignItems={{ base: "flex-start", sm: "center" }}
        >
          <Heading fontSize={{ base: "medium", md: "large" }}>
            {t("main.popularTags")}{" "}
          </Heading>
          <HStack flexWrap={"wrap"} gap={1}>
            {isLoading ? (
              <Spinner />
            ) : (
              tags.map((tag: string, index: number) => (
                <Button
                  variant={"outline"}
                  colorScheme={selectedTags.includes(tag) ? "yellow" : "white"}
                  borderRadius={10}
                  key={index}
                  fontSize={{ base: "small", md: "medium" }}
                  height={"fit-content"}
                  paddingY={1}
                  onClick={() => handleSelectTag(tag)}
                >
                  {tag}
                </Button>
              ))
            )}
          </HStack>
        </HStack>

        {filteredItems.length > 0 ? (
          <Collapse
            in={isSelectedTag}
            transition={{ enter: { duration: 0.5 } }}
          >
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4, "2xl": 5 }}
              spacing={5}
              mt={{ base: 2, sm: 0 }}
            >
              {filteredItems.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </SimpleGrid>
          </Collapse>
        ) : (
          <Heading>{t("main.noTags")}</Heading>
        )}
      </Box>
      <Box mt={5}>
        <HStack justifyContent={"space-between"} mb={5}>
          <Heading fontSize={{ base: "medium", md: "large" }}>
            {t("main.latest5Items")}
          </Heading>
          <Button
            as={Link}
            to={"items/all"}
            variant="link"
            textDecoration={"underline"}
            fontSize={{ base: "small", md: "medium" }}
          >
            {t("tools.seeAll")}
          </Button>
        </HStack>
        {isLoading ? (
          <SkeletonsGrid />
        ) : items.length !== 0 ? (
          <MainItemSwiper items={sortedItems(items)} />
        ) : (
          <Heading>{t("main.noItems")}</Heading>
        )}
      </Box>
      <Box mt={5}>
        <HStack justifyContent={"space-between"} mb={5}>
          <Heading fontSize={{ base: "medium", md: "large" }}>
            {t("main.largest5Collections")}
          </Heading>
          <Button
            as={Link}
            to={"collections/all"}
            variant="link"
            textDecoration={"underline"}
            fontSize={{ base: "small", md: "medium" }}
          >
            {t("tools.seeAll")}
          </Button>
        </HStack>
        {isLoading ? (
          <SkeletonsGrid />
        ) : collections.length !== 0 ? (
          <MainSwiper collections={collections} />
        ) : (
          <Heading>{t("main.noCollections")}</Heading>
        )}
      </Box>
    </Stack>
  );
};

export default MainContent;
