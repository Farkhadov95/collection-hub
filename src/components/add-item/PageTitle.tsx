import { Button, Heading, HStack } from "@chakra-ui/react";
import BackButton from "../buttons/BackButton";
import { useTranslation } from "react-i18next";

type AddItemTitleProps = {
  isLoading: boolean;
};

const PageTitle = ({ isLoading }: AddItemTitleProps) => {
  const { t } = useTranslation();
  return (
    <HStack justifyContent={"space-between"}>
      <Heading size={{ base: "md", md: "lg" }}>Add New Item</Heading>
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
