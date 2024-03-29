import {
  Heading,
  Box,
  HStack,
  Checkbox,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import AdminTableItem from "./AdminTableItem";
import AdminTools from "./AdminTools";
import { getAllUsers } from "../../services/user";
import { useCollectionStore } from "../../store/store";
import { useEffect, useState } from "react";
import { userInfo } from "../../types/types";
import { useTranslation } from "react-i18next";
import useErrorHandler from "../../hooks/useError";

const AdminsTable = () => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  const users = useCollectionStore((state) => state.users);
  const setUsers = useCollectionStore((state) => state.setUsers);
  const { handleFail } = useErrorHandler();

  useEffect(() => {
    getAllUsers(currentUser._id)
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
  }, [currentUser._id, handleFail, setUsers]);

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
  const { t } = useTranslation();

  return (
    <Box paddingX={{ base: 0, md: 5 }} paddingY={{ base: 2, md: 5 }}>
      <HStack
        flexDirection={{ base: "column", md: "row" }}
        alignItems={{ base: "start", md: "center" }}
        justifyContent={"space-between"}
      >
        <Heading fontSize={{ base: "large", lg: "2xl" }} paddingY={2}>
          {t("admin.allAdmins")}
        </Heading>
        <AdminTools selected={selected} setSelected={setSelected} />
      </HStack>
      <HStack mt={5} mb={3} justifyContent={"space-between"}>
        <Checkbox
          onChange={(e) => handleSelectAll(!e.target.checked)}
          isChecked={isAllSelected()}
        >
          <Text fontSize={{ base: "small", sm: "medium" }} fontWeight={"bold"}>
            {t("admin.selectAll")}
          </Text>
        </Checkbox>
        <Text fontSize={{ base: "small", sm: "medium" }} fontWeight={"bold"}>
          {t("admin.totalUsers")}: {users.length}
        </Text>
      </HStack>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, "2xl": 4 }} gap={2}>
        {users &&
          users.map((user) => (
            <AdminTableItem
              user={user}
              key={user._id}
              handleSelect={handleSelect}
              selected={selected.includes(user)}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdminsTable;
