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
import { useEffect, useState } from "react";
import { userInfo } from "../../types/types";

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

  const [selected, setSelected] = useState<userInfo[]>([]);

  const handleSelect = (user: userInfo) => {
    if (selected.includes(user)) {
      setSelected(selected.filter((u) => u._id !== user._id));
    } else {
      setSelected([...selected, user]);
    }
  };

  const handleSelectAll = (isSelectedAll: boolean) => {
    if (isSelectedAll) {
      setSelected([]);
      return;
    }
    setSelected(users);
  };

  const isAllSelected = () => selected.length === users.length;

  console.log(selected);

  return (
    <Box padding={5}>
      <HStack marginBottom={5} justifyContent={"space-between"}>
        <Heading fontSize="2xl">All Admins</Heading>
        <AdminTools selected={selected} setSelected={setSelected} />
      </HStack>
      <TableContainer>
        <Table variant="striped" colorScheme={"teal.200"}>
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  onChange={(e) => handleSelectAll(!e.target.checked)}
                  isChecked={isAllSelected()}
                >
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
                <AdminTableItem
                  user={user}
                  key={user._id}
                  handleSelect={handleSelect}
                  selected={selected.includes(user)}
                />
              ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminsTable;
