import { HStack, Heading, VStack } from "@chakra-ui/react";
import PropertiesForm from "../features/FeaturesForm";
import { Collection } from "../../../types/types";
import FeaturesItem from "../features/FeaturesItem";

type FeaturesProp = {
  currentCollection: Collection;
};

const Features = ({ currentCollection }: FeaturesProp) => {
  if (!currentCollection) {
    return <Heading>Empty collection</Heading>;
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
        <Heading fontSize={"medium"}>Custom Fields: </Heading>
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
