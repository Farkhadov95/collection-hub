import { HStack, Heading, VStack } from "@chakra-ui/react";
import PropertiesForm from "./PropertiesForm";
import { useCollectionStore } from "../../../store/store";
import { useEffect } from "react";
import PropertiesItem from "./PropertiesItem";

const Properties = () => {
  const collectionID = "65e5829097d965a2bcb2e328";
  const URL = "http://localhost:3000/collection/";
  const setCollection = useCollectionStore(
    (state) => state.setCurrentCollection
  );

  useEffect(() => {
    const fetchFeatures = async () => {
      const res = await fetch(URL + collectionID);
      const data = await res.json();
      setCollection(data);
    };
    fetchFeatures();
  }, [setCollection]);

  const features = useCollectionStore(
    (state) => state.currentCollection?.itemFields
  );

  console.log(features);

  return (
    <VStack justifyContent={"space-between"}>
      <HStack
        justifyContent={"space-between"}
        width={"100%"}
        flexDirection={{ base: "column", sm: "row" }}
        alignItems={"flex-start"}
      >
        <Heading fontSize={"medium"}>Custom Fields: </Heading>
        <PropertiesForm />
      </HStack>
      {features && (
        <HStack wrap={"wrap"} marginTop={2} width={"100%"}>
          {features.map((feature, index) => (
            <PropertiesItem key={index} feature={feature} />
          ))}
        </HStack>
      )}
    </VStack>
  );
};

export default Properties;
