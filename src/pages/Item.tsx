import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCollectionStore, useNonPersistStore } from "../store/store";
import ItemAbout from "../components/item/ItemAbout";
import ItemComments from "../components/item/ItemCommentContainer";
import { useEffect } from "react";
import { getComments } from "../services/comment";
import useErrorHandler from "../hooks/useError";
import { useTranslation } from "react-i18next";

const Item = () => {
  const itemID = useParams().id || "";
  const items = useCollectionStore((state) => state.items);
  const collections = useCollectionStore((state) => state.collections);
  const setComments = useCollectionStore((state) => state.setComments);
  const loading = useNonPersistStore((state) => state.loading);
  const setLoading = useNonPersistStore((state) => state.setLoading);

  const item = items.find((item) => item._id === itemID);
  const parentCollection = collections?.find(
    (c) => c._id === item?.collectionID
  );
  const parentCollectionName = parentCollection?.name;
  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    getComments(itemID)
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
        setLoading(false);
      });
  }, [handleFail, itemID, setComments, setLoading]);

  if (!item || !parentCollectionName) {
    return <Heading>{t("item.noItem")}</Heading>;
  }

  return (
    <Box padding={{ base: 2, md: 5 }}>
      <ItemAbout item={item} parentCollectionName={parentCollectionName} />
      <Divider marginY={5} />
      {loading ? <Text>Loading...</Text> : <ItemComments />}
    </Box>
  );
};

export default Item;
