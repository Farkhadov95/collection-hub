import { Flex, HStack } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <>
      <Flex justifyContent={"space-between"} marginBottom={5}>
        <Logo />
        <HStack spacing={5}>
          <ColorModeSwitch />
          <SearchBar />
        </HStack>
        <NavLinks />
      </Flex>
    </>
  );
};

export default Navbar;
