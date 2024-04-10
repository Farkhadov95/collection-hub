import { HStack, Heading, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { routes } from "../../routing/Routes";
import { sortedItems } from "../../utils";
import MainItemSwiper from "./MainSwiper";
import SkeletonsGrid from "../skeletons/SkeletonsGrid";
import { useItemStore } from "../../store/itemStore";
import { useTranslation } from "react-i18next";

type MainItemsProps = {
  isLoading: boolean;
};

const MainItems = ({ isLoading }: MainItemsProps) => {
  const items = useItemStore((state) => state.items);
  const { t } = useTranslation();

  return (
    <Box mt={5}>
      <HStack justifyContent={"space-between"} mb={5}>
        <Heading fontSize={{ base: "medium", md: "large" }}>
          {t("main.latest5Items")}
        </Heading>
        <Button
          as={Link}
          to={routes.AllItems}
          variant="link"
          textDecoration={"underline"}
          fontSize={{ base: "small", md: "medium" }}
        >
          {t("tools.seeAll")}
        </Button>
      </HStack>
      {isLoading ? (
        <SkeletonsGrid />
      ) : items.length !== 0 && !isLoading ? (
        <MainItemSwiper items={sortedItems(items)} />
      ) : (
        <Heading>{t("main.noItems")}</Heading>
      )}
    </Box>
  );
};

export default MainItems;
