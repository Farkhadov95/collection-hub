import {
  Checkbox,
  Card,
  CardBody,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { userInfo } from "../../types/user";
import moment from "moment";
import { useTranslation } from "react-i18next";

type AdminTableItemProps = {
  user: userInfo;
  handleSelect: (user: userInfo) => void;
  selected: boolean;
};

const AdminTableItem = ({
  user,
  handleSelect,
  selected,
}: AdminTableItemProps) => {
  const { t } = useTranslation();
  return (
    <Card width={"100%"} fontSize={{ base: "small", sm: "medium" }}>
      <CardBody>
        <VStack gap={{ base: 1, lg: 2 }} alignItems={{ base: "start" }}>
          <Checkbox
            mb={2}
            onChange={() => handleSelect(user)}
            isChecked={selected}
          />
          <Text>
            <b>{t("admin.userID")}: </b> {user._id}
          </Text>
          <Text>
            <b>{t("admin.username")}: </b> {user.username}
          </Text>
          <Text>
            <b>Email: </b> {user.email}
          </Text>
          <Text>
            <b>{t("admin.regTime")}: </b> <br />
            {user.createdAt
              ? moment(user.createdAt).format("DD/MM/YYYY HH:mm:ss")
              : "unknown"}
          </Text>
          <HStack>
            <b>{t("admin.admin")}: </b>
            {user.isAdmin ? (
              <Text color={"green.200"}>{t("admin.active")}</Text>
            ) : (
              <Text color={"red.200"}>{t("admin.inactive")}</Text>
            )}
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AdminTableItem;
