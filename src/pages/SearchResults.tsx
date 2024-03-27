import { VStack, Heading, SimpleGrid, Box } from "@chakra-ui/react";
import ItemCard from "../components/item-cards/ItemCard";
import { ItemSearch } from "../types/types";
import { useTranslation } from "react-i18next";
import { useCollectionStore, useNonPersistStore } from "../store/store";
import ItemComment from "../components/item/ItemComment";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const { t } = useTranslation();
  const items = useCollectionStore((state) => state.items);
  const searchedItems = useNonPersistStore((state) => state.searchedItems);
  const searchedComments = useNonPersistStore(
    (state) => state.searchedComments
  );

  const getItemIDs = (searchedItems: ItemSearch[]) => {
    const itemIDs = searchedItems.map((item) => item._id);
    return itemIDs;
  };

  const findItemsById = (itemIDs: string[]) => {
    return items.filter((item) => itemIDs.includes(item._id) === true);
  };

  const displayItems = (searchedItems: ItemSearch[]) => {
    const itemIDs = getItemIDs(searchedItems);
    const foundItems = findItemsById(itemIDs);
    const itemScoresMap = new Map(
      searchedItems.map((item) => [item._id, item.score])
    );

    foundItems.sort((a, b) => {
      const scoreA = itemScoresMap.get(a._id);
      const scoreB = itemScoresMap.get(b._id);

      if (typeof scoreA === "number" && typeof scoreB === "number") {
        return scoreB - scoreA;
      }
      return 0;
    });

    return foundItems;
  };

  console.log(searchedItems);

  return (
    <VStack alignItems={"start"} mt={5} padding={{ base: 0, md: 5 }}>
      <Heading fontSize={{ base: "large", md: "x-large" }}>
        {t("main.searchResults")}:
      </Heading>
      <Box width={"100%"} mt={5}>
        <Heading fontSize={"large"}>
          {searchedItems.length} {t("item.items")}
        </Heading>
        {searchedItems.length > 0 && (
          <SimpleGrid
            mt={5}
            columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
            spacing={5}
          >
            {displayItems(searchedItems).map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </SimpleGrid>
        )}
      </Box>

      <Box width={"100%"} mt={5}>
        <Heading fontSize={"large"}>
          {searchedComments.length} {t("item.comments")}
        </Heading>
        {searchedComments.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            marginY={5}
            maxHeight={"500px"}
            overflow={"scroll"}
          >
            {searchedComments.map((comment, index) => (
              <Link
                to={`/item/${comment.itemID}`}
                key={`${comment._id}-${index}`}
              >
                <ItemComment comment={comment} />
              </Link>
            ))}
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default SearchResults;
