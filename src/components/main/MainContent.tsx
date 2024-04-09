import { Stack, Box, Heading, HStack, Button } from "@chakra-ui/react";
import {
  getBiggestCollections,
  getCollections,
} from "../../services/collection";
import { useCollectionStore } from "../../store/collectionStore";
import { useItemStore } from "../../store/itemStore";
import { useEffect, useState } from "react";
import { getAllItems } from "../../services/item";
import useErrorHandler from "../../hooks/useError";
import { ItemType } from "../../types/item";
import { useTranslation } from "react-i18next";
import MainItemSwiper from "./MainSwiper";
import MainSwiper from "./MainSwiper";
import SkeletonsGrid from "../skeletons/SkeletonsGrid";
import { Link } from "react-router-dom";
import { sortedItems } from "../../utils";
import { routes } from "../../routing/Routes";
import MainTags from "./MainTags";

const MainContent = () => {
  const setCollections = useCollectionStore((state) => state.setCollections);
  const biggestCollections = useCollectionStore(
    (state) => state.biggestCollections
  );
  const setBiggestCollections = useCollectionStore(
    (state) => state.setBiggestCollections
  );
  const items = useItemStore((state) => state.items);
  const setItems = useItemStore((state) => state.setItems);
  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const generateTags = (items: ItemType[]) => {
    const tagsSet = new Set<string>();
    items.forEach((item) => {
      const tagsArray = item.tags.split(" ");
      tagsArray.forEach((tag) => tagsSet.add(tag));
    });
    const uniqueTags = Array.from(tagsSet);
    setTags(uniqueTags);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getCollections(), getAllItems(), getBiggestCollections()])
      .then(([collectionsRes, itemsRes, biggestCollectionsRes]) => {
        setCollections(collectionsRes);
        setItems(itemsRes);
        generateTags(itemsRes);
        setBiggestCollections(biggestCollectionsRes);
        setIsLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
        setIsLoading(false);
      });
  }, [handleFail, setBiggestCollections, setCollections, setItems]);

  return (
    <Stack
      borderRadius={10}
      boxSizing={"border-box"}
      padding={{ base: 0, md: 5 }}
      marginTop={5}
    >
      <MainTags isLoading={isLoading} tags={tags} />
      <Box mt={5}>
        <HStack justifyContent={"space-between"} mb={5}>
          <Heading fontSize={{ base: "medium", md: "large" }}>
            {t("main.latest5Items")}
          </Heading>
          <Button
            as={Link}
            to={routes.AllItems}
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
            to={routes.AllCollections}
            variant="link"
            textDecoration={"underline"}
            fontSize={{ base: "small", md: "medium" }}
          >
            {t("tools.seeAll")}
          </Button>
        </HStack>
        {isLoading ? (
          <SkeletonsGrid />
        ) : biggestCollections ? (
          <MainSwiper collections={biggestCollections} />
        ) : (
          <Heading>{t("main.noCollections")}</Heading>
        )}
      </Box>
    </Stack>
  );
};

export default MainContent;
