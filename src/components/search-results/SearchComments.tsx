import { Heading, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ItemComment from "../item/ItemComment";
import { useSearchStore } from "../../store/searchStore";
import { useTranslation } from "react-i18next";

const SearchComments = () => {
  const { t } = useTranslation();
  const searchedComments = useSearchStore((state) => state.searchedComments);
  return (
    <Box width={"100%"} mt={5}>
      <Heading fontSize={"large"}>
        ({searchedComments.length}) {t("item.comments")}
      </Heading>
      {searchedComments.length > 0 && (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          marginY={5}
          maxHeight={"500px"}
          overflow={"scroll"}
        >
          {searchedComments.map((comment, index) => (
            <Link
              to={`/item/${comment.itemID}`}
              key={`${comment._id}-${index}`}
            >
              <ItemComment comment={comment} />
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchComments;
