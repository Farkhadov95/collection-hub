import { Button, HStack, Icon, Select, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";
import { useCollectionStore } from "../../store/store";
import { useTranslation } from "react-i18next";

const CollectionTools = () => {
  const collectionID = useParams().id;
  const collections = useCollectionStore((state) => state.collections);
  const currentCollection = collections.find((c) => c._id === collectionID);
  const currentUser = useCollectionStore((state) => state.currentUser);
  const { t } = useTranslation();

  const isAuth =
    currentUser._id === currentCollection?.userID || currentUser.isAdmin;

  return (
    <HStack justifyContent={"space-between"} mb={5}>
      <HStack>
        <Select
          placeholder={t("tools.sortBy")}
          fontSize={{ base: "sm", md: "medium" }}
        >
          <option value="old">{t("tools.sortOld")}</option>
          <option value="new">{t("tools.sortNew")}</option>
          <option value="nameAZ">{t("tools.sortNameAZ")}</option>
          <option value="nameZA">{t("tools.sortNameZA")}</option>
        </Select>
        <Select
          placeholder={t("tools.filterBy")}
          fontSize={{ base: "sm", md: "medium" }}
        >
          <option value="image">{t("tools.filterImage")}</option>
          <option value="likes">{t("tools.filterLikes")}</option>
          <option value="comments">{t("tools.filterComments")}</option>
        </Select>
      </HStack>
      {isAuth && (
        <Button
          as={NavLink}
          to={`/collections/${collectionID}/create`}
          variant="outline"
        >
          <Icon as={IoMdAdd} display={{ base: "none", sm: "initial" }} />
          <Text paddingLeft={1} fontSize={{ base: "sm", md: "medium" }}>
            {t("tools.create")}
          </Text>
        </Button>
      )}
    </HStack>
  );
};

export default CollectionTools;
