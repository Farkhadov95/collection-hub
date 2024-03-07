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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCollectionStore } from "../../store/store";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteCollection } from "../../service/service";
import { Collection } from "../../types/types";

type CollectionsItemProp = {
  collection: Collection;
};

const CollectionsItem = ({ collection }: CollectionsItemProp) => {
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);

  const handleDelete = () => {
    deleteCollection(collection._id).then((data) => {
      setCollections(collections.filter((c) => c._id !== collection._id));
      console.log(data);
    });
  };

  return (
    <Card maxW="md">
      <CardHeader>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Heading size="sm">{collection.name}</Heading>
            <Text fontWeight={"bold"} fontSize={"small"}>
              Created by: {collection.name}
            </Text>
            <Badge colorScheme="green" fontSize={"2xs"}>
              {collection.topic}
            </Badge>
          </Box>
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
                  <MenuItem onClick={() => alert("Kagebunshin")}>Edit</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{collection.description}</Text>
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

      <CardFooter padding={2}>
        <Button
          as={Link}
          to={`/collections/${collection._id}`}
          flex="1"
          variant="ghost"
        >
          Open
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollectionsItem;
