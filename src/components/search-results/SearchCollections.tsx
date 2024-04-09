import { Heading, SimpleGrid, Box } from "@chakra-ui/react";
import CollectionCard from "../collection-card/CollectionCard";
import { useTranslation } from "react-i18next";
import { useCollectionStore } from "../../store/collectionStore";
import { useSearchStore } from "../../store/searchStore";
import { CollectionSearch } from "../../types/search";

const SearchCollections = () => {
  const { t } = useTranslation();
  const collections = useCollectionStore((state) => state.collections);
  const searchCollections = useSearchStore(
    (state) => state.searchedCollections
  );

  const getCollectionIDs = (searchedCollections: CollectionSearch[]) => {
    const collectionIDs = searchedCollections.map(
      (collection) => collection._id
    );
    return collectionIDs;
  };

  const findCollectionById = (collectionIDs: string[]) => {
    return collections.filter((c) => collectionIDs.includes(c._id) === true);
  };

  const displayCollections = (searchedCollections: CollectionSearch[]) => {
    const collectionIDs = getCollectionIDs(searchedCollections);
    const foundCollections = findCollectionById(collectionIDs);

    const collectionScoresMap = new Map(
      searchedCollections.map((collection) => [
        collection._id,
        collection.score,
      ])
    );

    foundCollections.sort((a, b) => {
      const scoreA = collectionScoresMap.get(a._id);
      const scoreB = collectionScoresMap.get(b._id);

      if (typeof scoreA === "number" && typeof scoreB === "number") {
        return scoreB - scoreA;
      }
      return 0;
    });

    return foundCollections;
  };

  return (
    <Box width={"100%"} mt={5}>
      <Heading fontSize={"large"}>
        ({searchCollections.length}) {t("item.collections")}
      </Heading>
      {searchCollections.length > 0 && (
        <SimpleGrid
          mt={5}
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          spacing={5}
        >
          {displayCollections(searchCollections).map((col) => (
            <CollectionCard key={col._id} collection={col} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default SearchCollections;
