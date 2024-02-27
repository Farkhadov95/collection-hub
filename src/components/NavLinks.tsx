import { HStack, Link } from "@chakra-ui/react";

const NavLinks = () => {
  return (
    <HStack justifyContent={"space-between"} spacing={10}>
      <Link fontWeight={"bold"}>My Collections</Link>
      <Link fontWeight={"bold"}>Sign out</Link>
    </HStack>
  );
};

export default NavLinks;
