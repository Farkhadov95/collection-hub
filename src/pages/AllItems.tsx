import { VStack, Heading, SimpleGrid, HStack, Select } from "@chakra-ui/react";
import ItemCard from "../components/item-cards/ItemCard";
import { useItemStore } from "../store/itemStore";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getAllItems } from "../services/item";
import useErrorHandler from "../hooks/useError";
import SkeletonsGrid from "../components/skeletons/SkeletonsGrid";
import { handleSort } from "../utils";

const AllItems = () => {
  const items = useItemStore((state) => state.items);
  const setItems = useItemStore((state) => state.setItems);
  const { t } = useTranslation();
  const { handleFail } = useErrorHandler();

  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState("");

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
      <HStack width={"100%"} justifyContent={"space-between"} mb={5}>
        <Heading fontSize={{ base: "large", md: "x-large" }}>
          {t("main.allItems")}
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
      ) : items ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
          spacing={5}
        >
          {handleSort(items, sortType).map((item) => (
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
