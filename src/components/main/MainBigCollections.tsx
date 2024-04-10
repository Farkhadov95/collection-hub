import { HStack, Heading, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { routes } from "../../routing/Routes";
import SkeletonsGrid from "../skeletons/SkeletonsGrid";
import MainSwiper from "./MainSwiper";
import { useCollectionStore } from "../../store/collectionStore";
import { useTranslation } from "react-i18next";

type MainBigCollectionsProps = {
  isLoading: boolean;
};

const MainBigCollections = ({ isLoading }: MainBigCollectionsProps) => {
  const { t } = useTranslation();
  const biggestCollections = useCollectionStore(
    (state) => state.biggestCollections
  );

  return (
    <Box mt={5}>
      <HStack justifyContent={"space-between"} mb={5}>
        <Heading fontSize={{ base: "medium", md: "large" }}>
          {t("main.largest5Collections")}
        </Heading>
        <Button
          as={Link}
          to={routes.AllCollections}
          variant="link"
          textDecoration={"underline"}
          fontSize={{ base: "small", md: "medium" }}
        >
          {t("tools.seeAll")}
        </Button>
      </HStack>
      {isLoading ? (
        <SkeletonsGrid />
      ) : biggestCollections && !isLoading ? (
        <MainSwiper collections={biggestCollections} />
      ) : (
        <Heading>{t("main.noCollections")}</Heading>
      )}
    </Box>
  );
};

export default MainBigCollections;
