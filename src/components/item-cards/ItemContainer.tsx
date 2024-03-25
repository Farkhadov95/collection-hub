import { Box, HStack, Heading, SimpleGrid } from "@chakra-ui/react";
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
        console.log(res);
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
        <HStack justifyContent={"center"} paddingTop={"100px"}>
          <Heading fontSize={"large"}>{t("item.noItems")}</Heading>
        </HStack>
      )}
      {isLoading ? (
        <SkeletonsGrid />
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
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
