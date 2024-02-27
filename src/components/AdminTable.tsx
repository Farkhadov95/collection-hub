import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Heading,
  Box,
  HStack,
} from "@chakra-ui/react";
import AdminTableItem from "./AdminTableItem";
import AdminTools from "./AdminTools";

const AdminsTable = () => {
  return (
    <Box padding={5}>
      <HStack marginBottom={5} justifyContent={"space-between"}>
        <Heading fontSize="2xl">All Admins</Heading>
        <AdminTools />
      </HStack>
      <TableContainer>
        <Table variant="striped" colorScheme={"teal.200"}>
          <Thead>
            <Tr>
              <Th>Select</Th>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Last Login Time</Th>
              <Th>Registration Time</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <AdminTableItem />
            <AdminTableItem />
            <AdminTableItem />
            <AdminTableItem />
            <AdminTableItem />
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminsTable;
