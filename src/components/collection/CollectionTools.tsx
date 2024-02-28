import { HStack, Select } from "@chakra-ui/react";
import CollectionItemCreate from "./CollectionItemCreate";

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
      <CollectionItemCreate />
    </HStack>
  );
};

export default CollectionTools;
