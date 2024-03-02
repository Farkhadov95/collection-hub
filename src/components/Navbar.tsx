import { Flex, HStack } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import NavbarDrawer from "./NavbarDrawer";

const Navbar = () => {
  return (
    <>
      <Flex justifyContent={"space-between"} marginBottom={{ base: 2, md: 5 }}>
        <Logo />
        <HStack
          spacing={5}
          display={{ base: "none", lg: "flex" }}
          width={"50%"}
        >
          <ColorModeSwitch />
          <SearchBar />
        </HStack>
        <HStack display={{ base: "none", lg: "flex" }}>
          <NavLinks />
        </HStack>
        <HStack display={{ base: "flex", lg: "none" }}>
          <NavbarDrawer />
        </HStack>
      </Flex>
    </>
  );
};

export default Navbar;
