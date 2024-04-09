import { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import MainBigCollections from "../components/main/MainBigCollections";
import MainItems from "../components/main/MainItems";
import MainTags from "../components/main/MainTags";
import useErrorHandler from "../hooks/useError";
import { getCollections, getBiggestCollections } from "../services/collection";
import { getAllItems } from "../services/item";
import { useCollectionStore } from "../store/collectionStore";
import { useItemStore } from "../store/itemStore";
import { ItemType } from "../types/item";

const Main = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

export default Main;
