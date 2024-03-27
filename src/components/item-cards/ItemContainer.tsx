import { Box, HStack, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import CollectionTools from "../collection/CollectionTools";
import ItemCard from "./ItemCard";
import { useCollectionStore } from "../../store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItems } from "../../services/service";
import useErrorHandler from "../../hooks/useError";
import { useTranslation } from "react-i18next";
import SkeletonsGrid from "../skeletons/SkeletonsGrid";

const ItemContainer = () => {
  const collectionID = useParams().id || "";
  const userItems = useCollectionStore((state) => state.userItems);
  const setUserItems = useCollectionStore((state) => state.setUserItems);
  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getItems(collectionID)
      .then((res) => {
        setUserItems(res);
        setIsLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
        setIsLoading(false);
      });
  }, [collectionID, handleFail, setUserItems]);

  return (
    <Box marginTop={5}>
      <CollectionTools />
      {userItems.length === 0 && (
        <VStack padding={"10%"}>
          <HStack justifyContent={"center"}>
            <Heading fontSize={"large"}>{t("item.noItems")}</Heading>
          </HStack>
        </VStack>
      )}
      {isLoading ? (
        <SkeletonsGrid />
      ) : (
        <SimpleGrid
          width={"fit-content"}
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          spacing={5}
        >
          {userItems &&
            userItems.map((item) => <ItemCard key={item._id} item={item} />)}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ItemContainer;
