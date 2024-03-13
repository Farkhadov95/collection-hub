import { Button, Flex, HStack } from "@chakra-ui/react";
import { GrUserAdmin } from "react-icons/gr";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import NavbarDrawer from "./NavbarDrawer";
import { Link } from "react-router-dom";

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
          <Button
            variant={"ghost"}
            colorScheme="green"
            fontWeight={"bold"}
            as={Link}
            to={"/admin"}
            leftIcon={<GrUserAdmin />}
          >
            Admin
          </Button>
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
