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
import { BiLike, BiSolidLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ItemType } from "../../types/types";
import { Link } from "react-router-dom";
import { useCollectionStore } from "../../store/store";
import { updateItem } from "../../services/service";
import useErrorHandler from "../../hooks/useError";

type ItemProps = {
  item: ItemType;
};

const ItemCard = ({ item }: ItemProps) => {
  const { colorMode } = useColorMode();
  const currentUser = useCollectionStore((state) => state.currentUser);
  const collections = useCollectionStore((state) => state.collections);
  const items = useCollectionStore((state) => state.items);
  const setItems = useCollectionStore((state) => state.setItems);
  const collection = collections.find(
    (collection) => collection._id === item.collectionID
  );
  const { handleFail } = useErrorHandler();

  const isLiked = item.likeIDs.includes(currentUser._id);

  const handleLike = () => {
    let updatedLike;
    if (isLiked) {
      updatedLike = item.likeIDs.filter((id) => id !== currentUser._id);
    } else {
      updatedLike = [...item.likeIDs, currentUser._id];
    }

    updateItem({
      ...item,
      likeIDs: updatedLike,
    })
      .then((res) => {
        setItems(
          items.map((item) => {
            if (item._id === res._id) {
              return res;
            }
            return item;
          })
        );
      })
      .catch((err) => {
        handleFail(err.message.toString());
      });
  };

  // const handleDelete = () => {

  // }

  if (!item) {
    return <div>Loading...</div>;
  }

  const tagsToArray = (item.tags ?? "").split(" ");
  const isAuth = currentUser._id == item.userID || currentUser.isAdmin;

  return (
    <Card maxW="md" bgColor={colorMode === "dark" ? "gray.700" : "gray.100"}>
      <CardHeader>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Heading size="sm">{item.name}</Heading>
            <Text fontWeight={"bold"} fontSize={"small"}>
              Collection: {collection?.name}
            </Text>
            <HStack mt={2} spacing={1} flexWrap={"wrap"}>
              {tagsToArray[0] !== ""
                ? tagsToArray.slice(0, 3).map((tag: string, index) => (
                    <Tag
                      key={index}
                      bgColor={colorMode === "dark" ? "gray.600" : "gray.300"}
                    >
                      {tag}
                    </Tag>
                  ))
                : null}
            </HStack>
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
                    <MenuItem>Delete</MenuItem>
                    <MenuItem onClick={() => alert("Kagebunshin")}>
                      Edit
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          )}
        </Flex>
      </CardHeader>
      <CardBody paddingTop={0}>
        <Text maxHeight={"50px"} overflow={"hidden"}>
          {item.description.length > 50
            ? item.description.slice(0, 50).concat("  ...")
            : item.description}
        </Text>
      </CardBody>
      <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
      />

      <CardFooter justify="space-between" padding={3} gap={2}>
        {currentUser._id !== "" && (
          <Button
            flex="1"
            variant="ghost"
            leftIcon={isLiked ? <BiSolidLike /> : <BiLike />}
            colorScheme={isLiked ? "green" : "white"}
            onClick={handleLike}
          >
            {isLiked ? "Liked" : "Like"}
          </Button>
        )}

        <Button
          as={Link}
          to={`/item/${item._id}`}
          flex="1"
          variant="outline"
          colorScheme="green"
        >
          Open
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
