import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Text,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";

const NavbarDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);
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
          <DrawerHeader borderBottomWidth="1px">Main Menu</DrawerHeader>

          <DrawerBody position={"relative"}>
            <Stack spacing="24px" marginTop={5}>
              <Box>
                <SearchBar />
              </Box>

              <Box display={"flex"} justifyContent={"end"}>
                <Text as={NavLink} to={"/user"} fontWeight={"bold"}>
                  My Collections
                </Text>
              </Box>
              <Box position={"absolute"} bottom={5} right={5}>
                <ColorModeSwitch />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant={"outline"} colorScheme="red" mr={3}>
              Sign Out
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
