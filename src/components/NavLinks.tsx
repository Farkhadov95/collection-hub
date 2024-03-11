import { Button, HStack, Text } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";

const NavLinks = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  console.log(pathname);

  const token = localStorage.getItem("X-Auth-Token");
  return (
    <HStack justifyContent={"space-between"} spacing={10}>
      {token && pathname !== "/login" && pathname !== "/signup" ? (
        <Text as={Link} to={"/user"} fontWeight={"bold"}>
          My Collections
        </Text>
      ) : null}

      {token && pathname !== "/login" && pathname !== "/signup" ? (
        <Button
          variant={"outline"}
          leftIcon={<IoLogOutOutline />}
          fontWeight={"bold"}
          onClick={() => {
            localStorage.removeItem("X-Auth-Token");
          }}
        >
          Log out
        </Button>
      ) : null}

      {!token && pathname !== "/login" && pathname !== "/signup" ? (
        <Button
          variant={"outline"}
          leftIcon={<IoLogInOutline />}
          fontWeight={"bold"}
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </Button>
      ) : null}
    </HStack>
  );
};

export default NavLinks;
