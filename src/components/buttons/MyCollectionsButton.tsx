import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type MyCollectionsButtonProp = {
  onClose?: () => void;
};

const MyCollectionsButton = ({ onClose }: MyCollectionsButtonProp) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        navigate("/user");
        if (onClose) onClose();
      }}
      fontWeight={"bold"}
    >
      {t("nav.myCollections")}
    </Button>
  );
};

export default MyCollectionsButton;
