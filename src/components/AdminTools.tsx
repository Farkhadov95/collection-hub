import { HStack, Button, Icon, Text, Select } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import {
  MdDeleteForever,
  MdBlockFlipped,
  MdOutlineSelectAll,
} from "react-icons/md";

const AdminTools = () => {
  return (
    <>
      <HStack spacing={2}>
        <Button variant="outline" width={"250px"}>
          <Icon as={MdOutlineSelectAll} />
          <Text paddingLeft={1}>Select All</Text>
        </Button>
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
      <HStack spacing={2}>
        <Button variant="outline" colorScheme="green">
          <Icon as={IoMdAdd} />
          <Text paddingLeft={1}>Add</Text>
        </Button>
        <Button variant="outline" colorScheme="yellow">
          <Icon as={MdBlockFlipped} />
          <Text paddingLeft={1}>Block</Text>
        </Button>
        <Button variant="outline" colorScheme="red">
          <Icon as={MdDeleteForever} />
          <Text paddingLeft={1}>Delete</Text>
        </Button>
      </HStack>
    </>
  );
};

export default AdminTools;
