import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const Toolbar = () => {
  return (
    <HStack spacing={2}>
      <Button variant="outline" colorScheme="green">
        <Icon as={IoMdAdd} />
        <Text paddingLeft={1}>Create</Text>
      </Button>
      <Button variant="outline" colorScheme="yellow">
        <Icon as={FiEdit} />
        <Text paddingLeft={1}>Edit</Text>
      </Button>
      <Button variant="outline" colorScheme="red">
        <Icon as={MdDeleteForever} />
        <Text paddingLeft={1}>Delete</Text>
      </Button>
    </HStack>
  );
};

export default Toolbar;
