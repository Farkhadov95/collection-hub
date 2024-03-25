import { HStack, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import CollectionCard from "./CollectionCard";
import CollectionsItemCreate from "./AddCollectionCard";
import { useEffect } from "react";
import { getUserCollection } from "../../services/service";
import { useCollectionStore } from "../../store/store";
import useErrorHandler from "../../hooks/useError";
import { useTranslation } from "react-i18next";

const CollectionContainer = () => {
  const userCollections = useCollectionStore((state) => state.userCollections);
  const setUserCollections = useCollectionStore(
    (state) => state.setUserCollections
  );
  const currentUser = useCollectionStore((state) => state.currentUser);
  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();

  useEffect(() => {
    getUserCollection(currentUser._id)
      .then((res) => {
        setUserCollections(res);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
  }, [currentUser._id, handleFail, setUserCollections]);

  return (
    <>
      <VStack>
        <HStack
          marginBottom={5}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Heading fontSize="2xl">{t("nav.myCollections")}</Heading>
          <CollectionsItemCreate />
        </HStack>
        {userCollections.length !== 0 ? (
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
