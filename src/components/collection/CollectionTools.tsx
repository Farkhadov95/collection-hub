import { Button, HStack, Icon, Select, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";
import { useCollectionStore } from "../../store/store";

const CollectionTools = () => {
  const collectionID = useParams().id;
  const collections = useCollectionStore((state) => state.collections);
  const currentCollection = collections.find((c) => c._id === collectionID);
  const currentUser = useCollectionStore((state) => state.currentUser);

  return (
    <HStack justifyContent={"space-between"}>
      <HStack>
        <Select placeholder="Sort by:">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select placeholder="Filter by:">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </HStack>
      {currentUser._id === currentCollection?.userID && (
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
