import { VStack, Heading, SimpleGrid, HStack, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useCollectionStore } from "../store/store";
import CollectionCard from "../components/collection-card/CollectionCard";
import { useEffect, useState } from "react";
import { getCollections } from "../services/collection";
import useErrorHandler from "../hooks/useError";
import SkeletonsGrid from "../components/skeletons/SkeletonsGrid";
import { handleSort } from "../utils";

const AllCollections = () => {
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);
  const { t } = useTranslation();
  const { handleFail } = useErrorHandler();

  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getCollections()
      .then((collectionsRes) => {
        setCollections(collectionsRes);
        setIsLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
        setIsLoading(false);
      });
  }, [handleFail, setCollections]);

  return (
    <VStack alignItems={"start"} mt={5} padding={{ base: 0, md: 5 }}>
      <HStack width={"100%"} justifyContent={"space-between"} mb={5}>
        <Heading fontSize={{ base: "large", md: "x-large" }}>
          {t("main.allCollections")}
        </Heading>
        <Select
          width={"fit-content"}
          placeholder={t("tools.sortDefault")}
          fontSize={{ base: "sm", md: "medium" }}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="newest">{t("tools.sortNew")}</option>
          <option value="oldest">{t("tools.sortOld")}</option>
          <option value="nameAZ">{t("tools.sortNameAZ")}</option>
          <option value="nameZA">{t("tools.sortNameZA")}</option>
        </Select>
      </HStack>

      {isLoading ? (
        <SkeletonsGrid />
      ) : collections ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
          spacing={5}
        >
          {handleSort(collections, sortType).map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
        </SimpleGrid>
      ) : (
        <Heading>{t("main.noCollections")}</Heading>
      )}
    </VStack>
  );
};

export default AllCollections;
