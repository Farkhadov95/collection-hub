import { Divider, Box, Heading } from "@chakra-ui/react";
import ItemsContainer from "../components/item-cards/ItemContainer";
import About from "../components/collection/About";
import Features from "../components/collection/features/Features";
import { useParams } from "react-router-dom";
import { useCollectionStore } from "../store/store";
import { useUserStore } from "../store/userStore";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Collection = () => {
  const collectionID = useParams().id;
  const collections = useCollectionStore((state) => state.collections);
  const currentCollection = collections?.find((c) => c._id === collectionID);
  const currentUser = useUserStore((state) => state.currentUser);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!currentCollection) {
    return <Heading>{t("collection.noCollection")}</Heading>;
  }

  const isAuth =
    currentUser._id === currentCollection?.userID || currentUser.isAdmin;

  return (
    <Box padding={{ base: 1, md: 5 }}>
      <About currentCollection={currentCollection} />
      <Divider marginY={5} />
      {isAuth && (
        <>
          <Features currentCollection={currentCollection} />
          <Divider marginY={5} />
        </>
      )}
      <ItemsContainer />
    </Box>
  );
};

export default Collection;
