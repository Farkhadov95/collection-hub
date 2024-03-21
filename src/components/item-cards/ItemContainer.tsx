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
  const userItems = useCollectionStore((state) => state.userItems);
  const setUserItems = useCollectionStore((state) => state.setUserItems);
  const { handleFail } = useErrorHandler();

  useEffect(() => {
    getItems(collectionID)
      .then((res) => {
        setUserItems(res);
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
        {userItems &&
          userItems.map((item) => <ItemCard key={item._id} item={item} />)}
      </SimpleGrid>
    </Box>
  );
};

export default ItemContainer;
