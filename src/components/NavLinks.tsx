import { HStack, Link } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

const NavLinks = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  return (
    <HStack justifyContent={"space-between"} spacing={10}>
      {pathname === "/" ? null : (
        <Link as={NavLink} to={"/"} fontWeight={"bold"}>
          My Collections
        </Link>
      )}
      <Link as={NavLink} to={"/login"} fontWeight={"bold"}>
        Sign out
      </Link>
    </HStack>
  );
};

export default NavLinks;
