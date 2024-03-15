import { Box, HStack, Heading, SimpleGrid } from "@chakra-ui/react";
import CollectionTools from "../collection/CollectionTools";
import ItemCard from "./ItemCard";
import { useCollectionStore } from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItems } from "../../services/service";
import useErrorHandler from "../../hooks/useError";

const ItemContainer = () => {
  const collectionID = useParams().id || "";
  const items = useCollectionStore((state) => state.items);
  const setItems = useCollectionStore((state) => state.setItems);
  const { handleFail } = useErrorHandler();

  useEffect(() => {
    getItems(collectionID)
      .then((res) => {
        setItems(res);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
  }, [collectionID, handleFail, setItems]);

  return (
    <Box marginTop={5}>
      <CollectionTools />
      {items.length === 0 && (
        <HStack justifyContent={"center"} paddingTop={"100px"}>
          <Heading fontSize={"large"}>
            No Items in this collection yet! Add some!
          </Heading>
        </HStack>
      )}
      <SimpleGrid
        marginY={5}
        columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
        spacing={5}
      >
        {items && items.map((item) => <ItemCard key={item._id} item={item} />)}
      </SimpleGrid>
    </Box>
  );
};

export default ItemContainer;
