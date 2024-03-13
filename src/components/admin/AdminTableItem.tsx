import { Tr, Td, Checkbox } from "@chakra-ui/react";
import { userInfo } from "../../types/types";

type AdminTableItemProps = {
  user: userInfo;
};

const AdminTableItem = ({ user }: AdminTableItemProps) => {
  return (
    <Tr>
      <Td>
        <Checkbox />
      </Td>
      <Td>{user._id}</Td>
      <Td>{user.username}</Td>
      <Td>{user.email}</Td>
      <Td>{user.createdAt ? user.createdAt.toLocaleString() : "unknown"}</Td>
      <Td>{user.isAdmin.toString()}</Td>
    </Tr>
  );
};

export default AdminTableItem;
