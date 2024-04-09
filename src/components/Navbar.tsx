import { Flex, HStack } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import NavbarDrawer from "./NavbarDrawer";
import { useUserStore } from "../store/store";
import LanguageSwitch from "./LanguageSwitch";
import AdminButton from "./buttons/AdminButton";

const Navbar = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  return (
    <>
      <Flex justifyContent={"space-between"} marginBottom={{ base: 2, md: 5 }}>
        <Logo />
        <HStack
          spacing={2}
          display={{ base: "none", lg: "flex" }}
          width={"50%"}
        >
          <LanguageSwitch />
          <ColorModeSwitch />
          <SearchBar />
          {currentUser.isAdmin && <AdminButton />}
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
