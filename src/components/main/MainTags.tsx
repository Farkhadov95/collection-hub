import {
  HStack,
  Heading,
  Spinner,
  Button,
  Box,
  Collapse,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ItemCard from "../item-cards/ItemCard";
import { ItemType } from "../../types/item";
import { useItemStore } from "../../store/itemStore";
import { useTranslation } from "react-i18next";

type MainTagsProps = {
  isLoading: boolean;
  tags: string[];
};

const MainTags = ({ isLoading, tags }: MainTagsProps) => {
  const items = useItemStore((state) => state.items);
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);

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
    <Box
      bgColor={colorMode === "dark" ? "RGBA(255, 255, 255, 0.36)" : "gray.200"}
      boxSizing="border-box"
      padding={{ base: 2, sm: 5 }}
      borderRadius={10}
      width={"fit-content"}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <HStack
            mb={isSelectedTag ? { base: 2, md: 5 } : { base: 0 }}
            flexDirection={{ base: "column", sm: "row" }}
            alignItems={{ base: "flex-start", sm: "center" }}
          >
            <Heading fontSize={{ base: "medium", md: "large" }}>
              {t("main.popularTags")}{" "}
            </Heading>
            <HStack flexWrap={"wrap"} gap={1}>
              {tags.map((tag: string, index: number) => (
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
              ))}
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
        </>
      )}
    </Box>
  );
};

export default MainTags;
