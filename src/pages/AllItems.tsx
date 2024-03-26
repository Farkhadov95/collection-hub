import { VStack, Heading, SimpleGrid } from "@chakra-ui/react";
import ItemCard from "../components/item-cards/ItemCard";
import { useCollectionStore } from "../store/store";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getAllItems } from "../services/service";
import useErrorHandler from "../hooks/useError";
import SkeletonsGrid from "../components/skeletons/SkeletonsGrid";
import { sortedItems } from "../utils";

const AllItems = () => {
  const items = useCollectionStore((state) => state.items);
  const setItems = useCollectionStore((state) => state.setItems);
  const { t } = useTranslation();
  const { handleFail } = useErrorHandler();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllItems()
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
        setIsLoading(false);
      });
  }, [handleFail, setItems]);

  return (
    <VStack alignItems={"start"} mt={5} padding={{ base: 0, md: 5 }}>
      <Heading fontSize={{ base: "large", md: "x-large" }} mb={5}>
        {t("main.allItems")}
      </Heading>

      {isLoading ? (
        <SkeletonsGrid />
      ) : items ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
          spacing={5}
        >
          {sortedItems(items).map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </SimpleGrid>
      ) : (
        <Heading>{t("main.noItems")}</Heading>
      )}
    </VStack>
  );
};

export default AllItems;
