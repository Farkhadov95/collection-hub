import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import { useUserStore } from "../store/userStore";
import AdminButton from "./buttons/AdminButton";
import { useTranslation } from "react-i18next";
import LogOutButton from "./buttons/LogoutButton";
import LoginButton from "./buttons/LoginButton";
import MyCollectionsButton from "./buttons/MyCollectionsButton";

const NavbarDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const currentUser = useUserStore((state) => state.currentUser);
  const firstField = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const { pathname } = location;
  const token = localStorage.getItem("X-Auth-Token");

  return (
    <>
      <IconButton
        variant={"outline"}
        aria-label="Menu"
        icon={<GiHamburgerMenu />}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {t("nav.mainMenu")}
          </DrawerHeader>

          <DrawerBody
            display={"flex"}
            flex={1}
            flexDirection={"column"}
            justifyContent={"space-between"}
            my={5}
          >
            <VStack alignItems={"end"} spacing={5}>
              <SearchBar onClose={onClose} />
              {token &&
                pathname !== "/login" &&
                pathname !== "/signup" &&
                pathname !== "/user" && (
                  <MyCollectionsButton onClose={onClose} />
                )}
              {currentUser.isAdmin && <AdminButton />}
            </VStack>

            <HStack justifyContent={"end"} gap={3}>
              <LanguageSwitch />
              <ColorModeSwitch />
            </HStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" gap={3}>
            {token && pathname !== "/login" && pathname !== "/signup" && (
              <LogOutButton />
            )}

            {!token && pathname !== "/login" && pathname !== "/signup" && (
              <LoginButton onClose={onClose} />
            )}
            <Button variant="outline" onClick={onClose}>
              {t("tools.cancel")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
