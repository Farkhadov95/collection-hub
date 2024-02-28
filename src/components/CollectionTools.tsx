import { Button, HStack, Icon, Select, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";

const CollectionTools = () => {
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
      <Button variant="outline">
        <Icon as={IoMdAdd} />
        <Text paddingLeft={1}>Create</Text>
      </Button>
    </HStack>
  );
};

export default CollectionTools;
