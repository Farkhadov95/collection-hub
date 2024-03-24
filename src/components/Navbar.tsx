import { Button, Flex, HStack } from "@chakra-ui/react";
import { GrUserAdmin } from "react-icons/gr";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import NavbarDrawer from "./NavbarDrawer";
import { Link } from "react-router-dom";
import { useCollectionStore } from "../store/store";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  const { t } = useTranslation();
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
          {currentUser.isAdmin && (
            <Button
              variant={"ghost"}
              colorScheme="green"
              fontWeight={"bold"}
              as={Link}
              to={"/admin"}
              leftIcon={<GrUserAdmin />}
            >
              {t("nav.admin")}
            </Button>
          )}
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
