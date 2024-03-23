import { Button, HStack, Icon, Select, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";
import { useCollectionStore } from "../../store/store";

const CollectionTools = () => {
  const collectionID = useParams().id;
  const collections = useCollectionStore((state) => state.collections);
  const currentCollection = collections.find((c) => c._id === collectionID);
  const currentUser = useCollectionStore((state) => state.currentUser);

  const isAuth =
    currentUser._id === currentCollection?.userID || currentUser.isAdmin;

  return (
    <HStack justifyContent={"space-between"}>
      <HStack>
        <Select placeholder="Sort by:">
          <option value="option1">Date: Old First</option>
          <option value="option2">Date: New First</option>
          <option value="option3">Name: A-Z</option>
          <option value="option3">Name: Z-A</option>
        </Select>
        <Select placeholder="Filter by:">
          <option value="option1">with Image</option>
          <option value="option2">Most Likes</option>
          <option value="option3">Most Comments</option>
        </Select>
      </HStack>
      {isAuth && (
        <Button
          as={NavLink}
          to={`/collections/${collectionID}/create`}
          variant="outline"
        >
          <Icon as={IoMdAdd} />
          <Text paddingLeft={1}>Create</Text>
        </Button>
      )}
    </HStack>
  );
};

export default CollectionTools;
