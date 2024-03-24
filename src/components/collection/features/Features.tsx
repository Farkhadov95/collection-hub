import { HStack, Heading, VStack } from "@chakra-ui/react";
import PropertiesForm from "../features/FeaturesForm";
import { Collection } from "../../../types/types";
import FeaturesItem from "../features/FeaturesItem";
import { useTranslation } from "react-i18next";

type FeaturesProp = {
  currentCollection: Collection;
};

const Features = ({ currentCollection }: FeaturesProp) => {
  const { t } = useTranslation();
  if (!currentCollection) {
    return <Heading>{t("collection.noCollection")}</Heading>;
  }

  const features = currentCollection?.itemFields;

  return (
    <VStack justifyContent={"space-between"}>
      <HStack
        justifyContent={"space-between"}
        width={"100%"}
        flexDirection={{ base: "column", sm: "row" }}
        alignItems={{ base: "flex-start", md: "center" }}
      >
        <Heading fontSize={"medium"}>{t("collection.customFields")} </Heading>
        <PropertiesForm currentCollection={currentCollection} />
      </HStack>
      {features && (
        <HStack wrap={"wrap"} marginTop={2} width={"100%"}>
          {features.map((feature, index) => (
            <FeaturesItem key={index} feature={feature} />
          ))}
        </HStack>
      )}
    </VStack>
  );
};

export default Features;
