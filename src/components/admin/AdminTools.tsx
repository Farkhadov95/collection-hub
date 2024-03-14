import { HStack, Button, Icon, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdBlockFlipped } from "react-icons/md";
import { userInfo } from "../../types/types";
import { deleteUsers, updateUsers } from "../../services/user";
import { useCollectionStore } from "../../store/store";
import useErrorHandler from "../../hooks/useError";

type AdminToolsProp = {
  selected: userInfo[];
  setSelected: (selected: userInfo[]) => void;
};

const AdminTools = ({ selected, setSelected }: AdminToolsProp) => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  const users = useCollectionStore((state) => state.users);
  const setUsers = useCollectionStore((state) => state.setUsers);

  const { handleFail } = useErrorHandler();

  const handleStatusUpdate = (status: boolean) => {
    updateUsers(selected, status, currentUser._id)
      .then((res) => {
        const newUsers = users.map((user) => {
          const matchingUser = res.find((u: userInfo) => u._id === user._id);
          return matchingUser ? matchingUser : user;
        });
        setUsers(newUsers);
        setSelected([]);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
  };

  const removeDeletedUsers = () => {
    const newUsers = users.filter((user) => !selected.includes(user));
    setUsers(newUsers);
    setSelected([]);
  };

  const handleUserDelete = () => {
    deleteUsers(selected, currentUser._id)
      .then(() => {
        removeDeletedUsers();
      })
      .catch((err) => console.log(err));
  };

  const selectedMajority = () => {
    const isAdminCount = selected.filter((user) => user.isAdmin).length;
    return isAdminCount > selected.length / 2;
  };

  return (
    <>
      <HStack spacing={2}>
        {selectedMajority() ? (
          <Button
            variant="outline"
            colorScheme="yellow"
            onClick={() => handleStatusUpdate(false)}
          >
            <Icon as={MdBlockFlipped} />
            <Text paddingLeft={1}>Remove Admin</Text>
          </Button>
        ) : (
          <Button
            variant="outline"
            colorScheme="green"
            onClick={() => handleStatusUpdate(true)}
          >
            <Icon as={IoMdAdd} />
            <Text paddingLeft={1}>Make Admin</Text>
          </Button>
        )}
        <Button variant="outline" colorScheme="red" onClick={handleUserDelete}>
          <Icon as={MdDeleteForever} />
          <Text paddingLeft={1}>Delete User</Text>
        </Button>
      </HStack>
    </>
  );
};

export default AdminTools;
