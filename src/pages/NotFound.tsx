import { HStack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <HStack padding={5} justify={"center"} height={"30vh"}>
      <Text fontSize={"x-large"} fontWeight={"bold"}>
        {t("tools.pageNotFound")}
      </Text>
    </HStack>
  );
};

export default NotFound;
