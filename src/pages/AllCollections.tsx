import { VStack, Heading, SimpleGrid } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useCollectionStore } from "../store/store";
import CollectionCard from "../components/collection-card/CollectionCard";
import { useEffect, useState } from "react";
import { getCollections } from "../services/service";
import useErrorHandler from "../hooks/useError";
import SkeletonsGrid from "../components/skeletons/SkeletonsGrid";

const AllCollections = () => {
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);
  const { t } = useTranslation();
  const { handleFail } = useErrorHandler();

  const [isLoading, setIsLoading] = useState(false);

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
    <VStack alignItems={"start"} mt={5}>
      <Heading fontSize={{ base: "large", md: "x-large" }} mb={5}>
        {t("main.allCollections")}
      </Heading>

      {isLoading ? (
        <SkeletonsGrid />
      ) : collections ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
          spacing={5}
        >
          {collections.map((collection) => (
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
