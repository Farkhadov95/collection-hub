import { Stack } from "@chakra-ui/react";
import {
  getBiggestCollections,
  getCollections,
} from "../../services/collection";
import { useCollectionStore } from "../../store/collectionStore";
import { useItemStore } from "../../store/itemStore";
import { useEffect, useState } from "react";
import { getAllItems } from "../../services/item";
import useErrorHandler from "../../hooks/useError";
import { ItemType } from "../../types/item";
import MainTags from "./MainTags";
import MainItems from "./MainItems";
import MainBigCollections from "./MainBigCollections";

const MainContent = () => {
  const setCollections = useCollectionStore((state) => state.setCollections);
  const setBiggestCollections = useCollectionStore(
    (state) => state.setBiggestCollections
  );
  const setItems = useItemStore((state) => state.setItems);
  const { handleFail } = useErrorHandler();

  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const generateTags = (items: ItemType[]) => {
    const tagsSet = new Set<string>();
    items.forEach((item) => {
      const tagsArray = item.tags.split(" ");
      tagsArray.forEach((tag) => tagsSet.add(tag));
    });
    const uniqueTags = Array.from(tagsSet);
    setTags(uniqueTags);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getCollections(), getAllItems(), getBiggestCollections()])
      .then(([collectionsRes, itemsRes, biggestCollectionsRes]) => {
        setCollections(collectionsRes);
        setItems(itemsRes);
        generateTags(itemsRes);
        setBiggestCollections(biggestCollectionsRes);
        setIsLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
        setIsLoading(false);
      });
  }, [handleFail, setBiggestCollections, setCollections, setItems]);

  return (
    <Stack
      borderRadius={10}
      boxSizing={"border-box"}
      padding={{ base: 0, md: 5 }}
      marginTop={5}
    >
      <MainTags isLoading={isLoading} tags={tags} />
      <MainItems isLoading={isLoading} />
      <MainBigCollections isLoading={isLoading} />
    </Stack>
  );
};

export default MainContent;
