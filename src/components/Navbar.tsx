import { Flex } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <Flex justifyContent={"space-between"}>
      <Logo />
      <ColorModeSwitch />
    </Flex>
  );
};

export default Navbar;
