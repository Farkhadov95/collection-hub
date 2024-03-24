import { Button, HStack } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useCollectionStore } from "../store/store";
import { useTranslation } from "react-i18next";

const NavLinks = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setCurrentUser = useCollectionStore((state) => state.setCurrentUser);
  const token = localStorage.getItem("X-Auth-Token");

  return (
    <HStack justifyContent={"space-between"} spacing={10}>
      {token && pathname !== "/login" && pathname !== "/signup" && (
        <Button variant={"ghost"} as={Link} to={"/user"} fontWeight={"bold"}>
          {t("nav.myCollections")}
        </Button>
      )}

      {token && pathname !== "/login" && pathname !== "/signup" && (
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
      )}

      {!token && pathname !== "/login" && pathname !== "/signup" && (
        <Button
          variant={"outline"}
          leftIcon={<IoLogInOutline />}
          fontWeight={"bold"}
          onClick={() => {
            navigate("/login");
          }}
        >
          {t("nav.logIn")}
        </Button>
      )}
    </HStack>
  );
};

export default NavLinks;
