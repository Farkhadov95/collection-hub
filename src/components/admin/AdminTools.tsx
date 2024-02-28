import { HStack, Button, Icon, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdBlockFlipped } from "react-icons/md";

const AdminTools = () => {
  return (
    <>
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
