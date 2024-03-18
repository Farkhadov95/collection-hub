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
import { ItemType } from "../../types/types";
import { Link } from "react-router-dom";
import { useCollectionStore } from "../../store/store";
import LikeButton from "../LikeButton";

type ItemProps = {
  item: ItemType;
};

const ItemCard = ({ item }: ItemProps) => {
  const { colorMode } = useColorMode();
  const collections = useCollectionStore((state) => state.collections);
  const currentUser = useCollectionStore((state) => state.currentUser);

  const collection = collections.find(
    (collection) => collection._id === item.collectionID
  );

  if (!item) {
    return <div>Loading...</div>;
  }

  const tagsToArray = (item.tags ?? "").split(" ");
  const isAuth = currentUser._id == item.userID || currentUser.isAdmin;

  return (
    <Card
      maxW="md"
      bgColor={colorMode === "dark" ? "gray.700" : "gray.50"}
      overflow={"hidden"}
    >
      <Box height={2} bgColor={"yellow.400"} />
      <CardHeader>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Heading size="sm">{item.name}</Heading>
            <Text fontWeight={"bold"} fontSize={"small"}>
              Collection: {collection?.name}
            </Text>
            <HStack mt={2} spacing={1} flexWrap={"wrap"}>
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
                    <MenuItem as={Link} to={`/item/edit/${item._id}`}>
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
            ? item.description.slice(0, 48).concat("  ...")
            : item.description}
        </Text>
      </CardBody>
      <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
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
          Open
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
