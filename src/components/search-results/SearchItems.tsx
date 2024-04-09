import { Heading, SimpleGrid, Box } from "@chakra-ui/react";
import ItemCard from "../item-cards/ItemCard";
import { useTranslation } from "react-i18next";
import { useItemStore } from "../../store/itemStore";
import { useSearchStore } from "../../store/searchStore";
import { ItemSearch } from "../../types/search";

const SearchItems = () => {
  const { t } = useTranslation();
  const items = useItemStore((state) => state.items);
  const searchedItems = useSearchStore((state) => state.searchedItems);

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

  return (
    <Box width={"100%"} mt={5}>
      <Heading fontSize={"large"}>
        ({searchedItems.length}) {t("item.items")}
      </Heading>
      {searchedItems.length > 0 && (
        <SimpleGrid
          mt={5}
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          spacing={5}
        >
          {displayItems(searchedItems).map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default SearchItems;
