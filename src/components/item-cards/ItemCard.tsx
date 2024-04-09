import {
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  Box,
  IconButton,
  Button,
  CardFooter,
  CardHeader,
  Flex,
  Tag,
  HStack,
  useColorMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ItemType } from "../../types/item";
import { Link } from "react-router-dom";
import { useCollectionStore } from "../../store/store";
import { useItemStore } from "../../store/itemStore";
import { useUserStore } from "../../store/userStore";
import LikeButton from "../LikeButton";
import placeholderImage from "../../assets/placeholder.jpg";
import useErrorHandler from "../../hooks/useError";
import { deleteItem } from "../../services/item";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";

type ItemProps = {
  item: ItemType;
};

const ItemCard = ({ item }: ItemProps) => {
  const { colorMode } = useColorMode();
  const collections = useCollectionStore((state) => state.collections);
  const currentUser = useUserStore((state) => state.currentUser);
  const items = useItemStore((state) => state.items);
  const userItems = useItemStore((state) => state.userItems);
  const setItems = useItemStore((state) => state.setItems);
  const setUserItems = useItemStore((state) => state.setUserItems);

  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();

  const collection = collections.find(
    (collection) => collection._id === item.collectionID
  );

  if (!item) {
    return <div>Loading...</div>;
  }

  const tagsToArray = (item.tags ?? "").split(" ");
  const isAuth = currentUser._id == item.userID || currentUser.isAdmin;

  const handleDelete = () => {
    deleteItem(item._id)
      .then(() => {
        const cleanItems = items.filter((c) => c._id !== item._id);
        setItems(cleanItems);
        const cleanUserItems = userItems.filter((c) => c._id !== item._id);
        setUserItems(cleanUserItems);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
  };

  return (
    <Card
      minW={"250px"}
      maxW={"400px"}
      height={"580px"}
      bgColor={colorMode === "dark" ? "gray.700" : "gray.50"}
      overflow={"hidden"}
    >
      <Box height={2} bgColor={"yellow.400"} />
      <CardHeader width={"100%"} overflow={"hidden"}>
        <Flex justifyContent={"space-between"}>
          <Box width={"100%"}>
            <HStack width={"100%"} justifyContent={"space-between"}>
              <Heading size="xs" width={"160px"} noOfLines={2}>
                {item.name}
              </Heading>
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
                        <MenuItem as={Link} to={`/item/edit/${item._id}`}>
                          {t("tools.edit")}
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              )}
            </HStack>
            <Text
              fontSize={"small"}
              as={Link}
              to={`/collections/${collection?._id}`}
              fontWeight={"bold"}
              noOfLines={1}
              _hover={{
                color: "green.200",
              }}
            >
              {t("item.collection")}
              {collection?.name}
            </Text>
            <HStack mt={2} spacing={1} overflow={"hidden"}>
              {tagsToArray[0] !== "" &&
                tagsToArray.slice(0, 3).map((tag: string, index) => (
                  <Tag
                    key={index}
                    bgColor={colorMode === "dark" ? "gray.600" : "gray.300"}
                  >
                    {tag}
                  </Tag>
                ))}
            </HStack>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody
        paddingY={0}
        mb={5}
        height={"50px"}
        overflow={"hidden"}
        fontSize={"sm"}
      >
        <Markdown>
          {item.description.length > 50
            ? item.description.slice(0, 48).concat("  ...")
            : item.description}
        </Markdown>
      </CardBody>
      <Image
        height={"300px"}
        width={"100%"}
        alt={item.name}
        objectFit="cover"
        objectPosition={item.image ? "0 0" : "center"}
        src={item.image !== "" ? item.image : placeholderImage}
      />

      <CardFooter justify="space-between" padding={3} gap={2}>
        {currentUser._id !== "" && <LikeButton item={item} />}

        <Button
          as={Link}
          to={`/item/${item._id}`}
          flex="1"
          variant="outline"
          colorScheme="yellow"
        >
          {t("tools.open")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
