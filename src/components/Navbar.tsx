import { Flex, HStack } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Flex justifyContent={"space-between"}>
      <Logo />
      <HStack spacing={5}>
        <ColorModeSwitch />
        <SearchBar />
      </HStack>
    </Flex>
  );
};

export default Navbar;
