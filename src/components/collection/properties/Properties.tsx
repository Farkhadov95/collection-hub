import { Badge, Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import PropertiesForm from "./PropertiesForm";
import { useCollectionStore } from "../../../store/store";
import { useEffect } from "react";

const Properties = () => {
  const collectionID = "65e5829097d965a2bcb2e328";
  const URL = "http://localhost:3000/collection/";
  const setCollection = useCollectionStore((state) => state.setCollection);

  useEffect(() => {
    const fetchFeatures = async () => {
      const res = await fetch(URL + collectionID);
      const data = await res.json();
      setCollection(data);
    };
    fetchFeatures();
  }, [setCollection]);

  const features = useCollectionStore((state) => state.collection?.itemFields);
  console.log(features);

  return (
    <VStack justifyContent={"space-between"}>
      <HStack justifyContent={"space-between"} width={"100%"}>
        <Heading fontSize={"medium"}>Add Item features: </Heading>
        <PropertiesForm />
      </HStack>
      {features && (
        <HStack wrap={"wrap"} marginTop={2} width={"100%"}>
          {features.map((feature, index) => (
            <Box
              key={index}
              border={"1px solid"}
              boxSizing={"border-box"}
              borderRadius={10}
              padding={2}
            >
              <HStack>
                <Badge colorScheme="green" fontSize={"2xs"}>
                  {feature.fieldType}
                </Badge>
                <Text fontWeight={"bold"}>{feature.fieldName}</Text>
              </HStack>
            </Box>
          ))}
        </HStack>
      )}
    </VStack>
  );
};

export default Properties;
