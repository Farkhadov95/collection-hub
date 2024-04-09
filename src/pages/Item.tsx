import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCollectionStore, useNonPersistStore } from "../store/store";
import { useCommentStore } from "../store/commentStore";
import { useItemStore } from "../store/itemStore";
import ItemAbout from "../components/item/ItemAbout";
import ItemComments from "../components/item/ItemCommentContainer";
import { useEffect } from "react";
import { getComments } from "../services/comment";
import useErrorHandler from "../hooks/useError";
import { useTranslation } from "react-i18next";

const Item = () => {
  const itemID = useParams().id || "";
  const items = useItemStore((state) => state.items);
  const collections = useCollectionStore((state) => state.collections);
  const setComments = useCommentStore((state) => state.setComments);
  const commentLoading = useNonPersistStore((state) => state.commentLoading);
  const setCommentLoading = useNonPersistStore(
    (state) => state.setCommentLoading
  );

  const item = items.find((item) => item._id === itemID);
  const parentCollection = collections?.find(
    (c) => c._id === item?.collectionID
  );
  const parentCollectionName = parentCollection?.name;
  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCommentLoading(true);
    getComments(itemID)
      .then((data) => {
        setComments(data);
        setCommentLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
        setCommentLoading(false);
      });
  }, [handleFail, itemID, setComments, setCommentLoading]);

  if (!item || !parentCollectionName) {
    return <Heading>{t("item.noItem")}</Heading>;
  }

  return (
    <Box padding={{ base: 2, md: 5 }}>
      <ItemAbout item={item} parentCollectionName={parentCollectionName} />
      <Divider marginY={5} />
      {commentLoading ? <Text>Loading...</Text> : <ItemComments />}
    </Box>
  );
};

export default Item;
