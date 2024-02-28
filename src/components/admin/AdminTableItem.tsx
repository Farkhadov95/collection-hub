import { Tr, Td, Checkbox } from "@chakra-ui/react";

const AdminTableItem = () => {
  return (
    <Tr>
      <Td>
        <Checkbox />
      </Td>
      <Td>ID</Td>
      <Td>Name</Td>
      <Td>Email</Td>
      <Td>Date</Td>
      <Td>Date</Td>
      <Td>isActive</Td>
    </Tr>
  );
};

export default AdminTableItem;
