import {
  Card,
  CardBody,
  Heading,
  Button,
  Image,
  Box,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Text,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Badge,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCollectionStore } from "../../store/store";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteCollection } from "../../services/service";
import { Collection } from "../../types/types";
import useErrorHandler from "../../hooks/useError";
import EditCollectionCard from "./EditCollectionCard";
import placeholderImage from "../../assets/placeholder.jpg";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";

type CollectionsItemProp = {
  collection: Collection;
};

const CollectionCard = ({ collection }: CollectionsItemProp) => {
  const collections = useCollectionStore((state) => state.collections);
  const userCollections = useCollectionStore((state) => state.userCollections);
  const currentUser = useCollectionStore((state) => state.currentUser);
  const items = useCollectionStore((state) => state.items);
  const setItems = useCollectionStore((state) => state.setItems);

  const { handleFail } = useErrorHandler();
  const setCollections = useCollectionStore((state) => state.setCollections);
  const setUserCollections = useCollectionStore(
    (state) => state.setUserCollections
  );

  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  const handleDelete = () => {
    deleteCollection(collection._id)
      .then(() => {
        setCollections(collections.filter((c) => c._id !== collection._id));
        setItems(items.filter((c) => c.collectionID !== collection._id));
        setUserCollections(
          userCollections.filter((c) => c._id !== collection._id)
        );
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
  };

  const isAuth = currentUser._id == collection.userID || currentUser.isAdmin;

  return (
    <Card
      maxW="md"
      bgColor={colorMode === "dark" ? "gray.700" : "gray.100"}
      overflow={"hidden"}
    >
      <Box height={2} bgColor={"green.300"} />
      <CardHeader>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Heading size="sm">{collection.name}</Heading>
            <Text fontWeight={"bold"} fontSize={"small"}>
              {t("collection.createdBy")} {collection.userName}
            </Text>
            <Badge colorScheme="green" fontSize={"2xs"}>
              {t(`collectionTopic.${collection.topic}`)}
            </Badge>
          </Box>
          {isAuth && (
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={IconButton}
                    size="sm"
                    isActive={isOpen}
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    icon={<BsThreeDotsVertical />}
                  />

                  <MenuList>
                    <MenuItem onClick={handleDelete}>
                      {t("tools.delete")}
                    </MenuItem>
                    <MenuItem>
                      <EditCollectionCard collection={collection} />
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          )}
        </Flex>
      </CardHeader>
      <CardBody paddingTop={0}>
        <Markdown>
          {collection.description.length > 50
            ? collection.description.slice(0, 48).concat("  ...")
            : collection.description}
        </Markdown>
      </CardBody>
      <Image
        height={"300px"}
        width={"100%"}
        objectFit="cover"
        objectPosition={collection.image ? "0 0" : "center"}
        src={collection.image === "" ? placeholderImage : collection.image}
        alt={collection.name}
      />

      <CardFooter padding={3}>
        <Button
          as={Link}
          to={`/collections/${collection._id}`}
          flex="1"
          variant="outline"
          colorScheme="green"
        >
          {t("tools.open")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollectionCard;
