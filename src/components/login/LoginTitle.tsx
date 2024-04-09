import { Heading, Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type Props = {
  userError: string;
};

const LoginTitle = ({ userError }: Props) => {
  const { t } = useTranslation();
  return (
    <Box marginBottom={5}>
      <Heading as={"h2"}>{t("nav.logInTitle")}</Heading>
      <Text
        paddingX={1}
        color={"red.300"}
        mt={2}
        display={userError !== "" ? "block" : "none"}
      >
        {userError}
      </Text>
    </Box>
  );
};

export default LoginTitle;
