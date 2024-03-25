import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { GrUserAdmin } from "react-icons/gr";
import { Link } from "react-router-dom";

const AdminButton = () => {
  const { t } = useTranslation();
  return (
    <Button
      variant={"ghost"}
      colorScheme="green"
      fontWeight={"bold"}
      as={Link}
      to={"/admin"}
      leftIcon={<GrUserAdmin />}
    >
      {t("nav.admin")}
    </Button>
  );
};

export default AdminButton;
