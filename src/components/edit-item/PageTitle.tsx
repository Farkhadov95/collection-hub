import { HStack, Heading, Button } from "@chakra-ui/react";
import { t } from "i18next";
import BackButton from "../buttons/BackButton";

type Props = {
  isLoading: boolean;
};

const PageTitle = ({ isLoading }: Props) => {
  return (
    <HStack justifyContent={"space-between"}>
      <Heading size={{ base: "md", md: "lg" }}>{t("item.editItem")}</Heading>
      <HStack spacing={3}>
        <BackButton />
        <Button
          isLoading={isLoading}
          type="submit"
          variant={"outline"}
          colorScheme="green"
        >
          {t("tools.save")}
        </Button>
      </HStack>
    </HStack>
  );
};

export default PageTitle;
