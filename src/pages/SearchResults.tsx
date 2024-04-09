import { VStack, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import SearchCollections from "../components/search-results/SearchCollections";
import SearchItems from "../components/search-results/SearchItems";
import SearchComments from "../components/search-results/SearchComments";

const SearchResults = () => {
  const { t } = useTranslation();
  return (
    <VStack alignItems={"start"} mt={5} padding={{ base: 0, md: 5 }}>
      <Heading fontSize={{ base: "large", md: "x-large" }}>
        {t("main.searchResults")}:
      </Heading>
      <SearchCollections />
      <SearchItems />
      <SearchComments />
    </VStack>
  );
};

export default SearchResults;
