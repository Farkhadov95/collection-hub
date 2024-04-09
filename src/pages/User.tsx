import { Heading, Box, Badge, HStack, useColorMode } from "@chakra-ui/react";
import CollectionsContainer from "../components/collection-card/CollectionsContainer";
import { useUserStore } from "../store/store";
import { useTranslation } from "react-i18next";

const User = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  return (
    <Box padding={{ base: 0, md: 5 }} mt={{ base: 2, md: 0 }}>
      <HStack
        mb={5}
        boxSizing={"border-box"}
        padding={5}
        display={"flex"}
        bgColor={colorMode === "dark" ? "gray.700" : "gray.100"}
        borderRadius={10}
      >
        <Heading fontSize={{ base: "large", md: "xx-large" }}>
          {t("nav.hello")} {currentUser.username}
        </Heading>
        <Badge colorScheme="green" fontSize={"2xs"} height={"fit-content"}>
          {currentUser.isAdmin ? "Admin" : ""}
        </Badge>
      </HStack>
      <CollectionsContainer />
    </Box>
  );
};

export default User;
