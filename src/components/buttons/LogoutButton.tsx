import { Button } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  return (
    <Button
      variant={"outline"}
      leftIcon={<IoLogOutOutline />}
      fontWeight={"bold"}
      onClick={() => {
        setCurrentUser({
          _id: "",
          username: "",
          email: "",
          isAdmin: false,
        });
        navigate("/");
        localStorage.removeItem("X-Auth-Token");
      }}
    >
      {t("nav.logOut")}
    </Button>
  );
};

export default LogoutButton;
