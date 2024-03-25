import { HStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import MyCollectionsButton from "./buttons/MyCollectionsButton";
import LogoutButton from "./buttons/LogoutButton";
import LoginButton from "./buttons/LoginButton";

const NavLinks = () => {
  const location = useLocation();
  const { pathname } = location;
  const token = localStorage.getItem("X-Auth-Token");

  return (
    <HStack justifyContent={"space-between"} spacing={10}>
      {token &&
        pathname !== "/login" &&
        pathname !== "/signup" &&
        pathname !== "/user" && <MyCollectionsButton />}

      {token && pathname !== "/login" && pathname !== "/signup" && (
        <LogoutButton />
      )}

      {!token && pathname !== "/login" && pathname !== "/signup" && (
        <LoginButton />
      )}
    </HStack>
  );
};

export default NavLinks;
