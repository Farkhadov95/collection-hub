import { Box, Divider, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCollectionStore } from "../store/store";
import ItemAbout from "../components/item/ItemAbout";
import ItemComments from "../components/item/ItemCommentContainer";
// import { useEffect } from "react";
// import { getComments } from "../services/comment";
// import useErrorHandler from "../hooks/useError";

const Item = () => {
  const itemID = useParams().id || "";
  const items = useCollectionStore((state) => state.items);
  const collections = useCollectionStore((state) => state.collections);
  // const setComments = useCollectionStore((state) => state.setComments);

  const item = items.find((item) => item._id === itemID);
  const parentCollection = collections?.find(
    (c) => c._id === item?.collectionID
  );
  const parentCollectionName = parentCollection?.name;
  // const { handleFail } = useErrorHandler();

  // useEffect(() => {
  //   getComments(itemID)
  //     .then((data) => setComments(data))
  //     .catch((err) => {
  //       const errorMessage = err.message.toString();
  //       handleFail(errorMessage);
  //     });
  // }, [handleFail, itemID, setComments]);

  if (!item || !parentCollectionName) {
    return <Heading>Empty item</Heading>;
  }

  return (
    <Box padding={{ base: 2, md: 5 }}>
      <ItemAbout item={item} parentCollectionName={parentCollectionName} />
      <Divider marginY={5} />
      <ItemComments />
    </Box>
  );
};

export default Item;
