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
  Text,
  Checkbox,
} from "@chakra-ui/react";
import AdminTableItem from "./AdminTableItem";
import AdminTools from "./AdminTools";
import { getAllUsers } from "../../services/user";
import { useCollectionStore } from "../../store/store";
import { useEffect } from "react";

const AdminsTable = () => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  const users = useCollectionStore((state) => state.users);
  const setUsers = useCollectionStore((state) => state.setUsers);

  useEffect(() => {
    getAllUsers(currentUser._id)
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser._id, setUsers]);

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
              <Th>
                <Checkbox>
                  <Text fontSize={"12px"}>Select all</Text>
                </Checkbox>
              </Th>
              <Th>User ID</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Registration Time</Th>
              <Th>Admin</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users &&
              users.map((user) => (
                <AdminTableItem user={user} key={user._id} />
              ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminsTable;
