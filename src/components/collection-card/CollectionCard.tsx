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
              Created by: {collection.userName}
            </Text>
            <Badge colorScheme="green" fontSize={"2xs"}>
              {collection.topic}
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
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
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
        <Text>
          {collection.description.length > 50
            ? collection.description.slice(0, 48).concat("  ...")
            : collection.description}
        </Text>
      </CardBody>
      <Image
        objectFit="cover"
        src={
          collection.image === ""
            ? "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            : collection.image
        }
        alt="Chakra UI"
      />

      <CardFooter padding={3}>
        <Button
          as={Link}
          to={`/collections/${collection._id}`}
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

export default CollectionCard;
