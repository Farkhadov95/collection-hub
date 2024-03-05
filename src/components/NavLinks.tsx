import { HStack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  return (
    <HStack justifyContent={"space-between"} spacing={10}>
      {pathname === "/login" ? null : (
        <Text as={Link} to={"/user"} fontWeight={"bold"}>
          My Collections
        </Text>
      )}
      <Text as={Link} to={"/login"} fontWeight={"bold"}>
        Sign out
      </Text>
    </HStack>
  );
};

export default NavLinks;
