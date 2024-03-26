import { HStack, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import CollectionCard from "./CollectionCard";
import CollectionsItemCreate from "./AddCollectionCard";
import { useEffect, useState } from "react";
import { getUserCollection } from "../../services/service";
import { useCollectionStore } from "../../store/store";
import useErrorHandler from "../../hooks/useError";
import { useTranslation } from "react-i18next";
import SkeletonsGrid from "../skeletons/SkeletonsGrid";

const CollectionContainer = () => {
  const userCollections = useCollectionStore((state) => state.userCollections);
  const setUserCollections = useCollectionStore(
    (state) => state.setUserCollections
  );
  const currentUser = useCollectionStore((state) => state.currentUser);
  const { handleFail } = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    getUserCollection(currentUser._id)
      .then((res) => {
        setUserCollections(res);
        setIsLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
        setIsLoading(false);
      });
  }, [currentUser._id, handleFail, setUserCollections]);

  return (
    <>
      <VStack alignItems={"start"}>
        <HStack
          marginBottom={5}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Heading fontSize={{ base: "xl", md: "2xl" }}>
            {t("nav.myCollections")}
          </Heading>
          <CollectionsItemCreate />
        </HStack>
        {isLoading ? (
          <SkeletonsGrid />
        ) : userCollections.length !== 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
            spacing={5}
          >
            {userCollections.map((collection) => (
              <CollectionCard key={collection._id} collection={collection} />
            ))}
          </SimpleGrid>
        ) : (
          <Heading>{t("main.noCollections")}</Heading>
        )}
      </VStack>
    </>
  );
};

export default CollectionContainer;
