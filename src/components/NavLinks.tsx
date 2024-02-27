import { HStack, Link } from "@chakra-ui/react";

const NavLinks = () => {
  return (
    <HStack justifyContent={"space-between"} spacing={10}>
      <Link fontWeight={"bold"}>My Collection</Link>
      <Link fontWeight={"bold"}>Sign out</Link>
    </HStack>
  );
};

export default NavLinks;
