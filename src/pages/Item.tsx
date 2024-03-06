import { Box, Divider, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCollectionStore } from "../store/store";
import ItemAbout from "../components/item/ItemAbout";
import ItemComments from "../components/item/ItemComments";

const Item = () => {
  const itemID = useParams().id;
  const items = useCollectionStore((state) => state.items);
  const collections = useCollectionStore((state) => state.collections);

  const item = items.find((item) => item._id === itemID);
  const parentCollection = collections?.find(
    (c) => c._id === item?.collectionID
  );
  const parentCollectionName = parentCollection?.name;

  if (!item || !parentCollectionName) {
    return <Heading>Empty item</Heading>;
  }

  console.log(item);

  return (
    <Box padding={{ base: 2, md: 5 }}>
      <ItemAbout item={item} parentCollectionName={parentCollectionName} />
      <Divider marginY={5} />
      <ItemComments />
    </Box>
  );
};

export default Item;
