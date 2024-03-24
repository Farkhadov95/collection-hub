import { Box, HStack, Heading, SimpleGrid } from "@chakra-ui/react";
import CollectionTools from "../collection/CollectionTools";
import ItemCard from "./ItemCard";
import { useCollectionStore } from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItems } from "../../services/service";
import useErrorHandler from "../../hooks/useError";
import { useTranslation } from "react-i18next";

const ItemContainer = () => {
  const collectionID = useParams().id || "";
  const userItems = useCollectionStore((state) => state.userItems);
  const setUserItems = useCollectionStore((state) => state.setUserItems);
  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();

  useEffect(() => {
    getItems(collectionID)
      .then((res) => {
        setUserItems(res);
        console.log(res);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
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
      <SimpleGrid
        marginY={5}
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing={5}
      >
        {userItems &&
          userItems.map((item) => <ItemCard key={item._id} item={item} />)}
      </SimpleGrid>
    </Box>
  );
};

export default ItemContainer;
