import { Badge, Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import PropertiesForm from "./PropertiesForm";
import { useAppStore } from "../../../store/store";

const Properties = () => {
  const features = useAppStore((state) => state.features);

  return (
    <VStack justifyContent={"space-between"}>
      <HStack justifyContent={"space-between"} width={"100%"} paddingBottom={2}>
        <Heading fontSize={"medium"}>Add Item features: </Heading>
        <PropertiesForm />
      </HStack>
      <HStack wrap={"wrap"}>
        {features.map((feature, index) => (
          <Box
            border={"1px solid"}
            boxSizing={"border-box"}
            borderRadius={10}
            padding={2}
          >
            <HStack>
              <Badge colorScheme="green" fontSize={"2xs"}>
                {feature.type}
              </Badge>
              <Text key={index} fontWeight={"bold"}>
                {feature.name}
              </Text>
            </HStack>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};

export default Properties;
