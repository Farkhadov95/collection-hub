import { HStack, Button, Icon, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdBlockFlipped } from "react-icons/md";
import { userInfo } from "../../types/types";
import { deleteUsers, updateUsers } from "../../services/user";
import { useCollectionStore } from "../../store/store";
import useErrorHandler from "../../hooks/useError";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <HStack
      spacing={2}
      width={{ base: "100%", sm: "fit-content" }}
      flexDirection={{ base: "column", sm: "row" }}
      alignItems={{ base: "start", sm: "center" }}
    >
      {selectedMajority() ? (
        <Button
          variant="outline"
          colorScheme="yellow"
          onClick={() => handleStatusUpdate(false)}
          boxSizing="border-box"
          padding={2}
        >
          <Icon as={MdBlockFlipped} />
          <Text paddingLeft={1} fontSize={{ base: "sm", md: "medium" }}>
            {t("admin.unmakeAdmin")}
          </Text>
        </Button>
      ) : (
        <Button
          variant="outline"
          colorScheme="green"
          onClick={() => handleStatusUpdate(true)}
          boxSizing="border-box"
          padding={2}
        >
          <Icon as={IoMdAdd} />
          <Text paddingLeft={1} fontSize={{ base: "sm", md: "medium" }}>
            {t("admin.makeAdmin")}
          </Text>
        </Button>
      )}
      <Button
        variant="outline"
        colorScheme="red"
        onClick={handleUserDelete}
        boxSizing="border-box"
        padding={2}
      >
        <Icon as={MdDeleteForever} />
        <Text paddingLeft={1} fontSize={{ base: "sm", md: "medium" }}>
          {t("admin.deleteUser")}
        </Text>
      </Button>
    </HStack>
  );
};

export default AdminTools;
