import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { IoLogInOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type LoginButtonProp = {
  onClose?: () => void;
};

const LoginButton = ({ onClose }: LoginButtonProp) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Button
      variant={"outline"}
      leftIcon={<IoLogInOutline />}
      fontWeight={"bold"}
      onClick={() => {
        navigate("/login");
        if (onClose) onClose();
      }}
    >
      {t("nav.logIn")}
    </Button>
  );
};

export default LoginButton;
