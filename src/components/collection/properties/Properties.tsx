import { HStack, Heading, VStack } from "@chakra-ui/react";
import PropertiesForm from "./PropertiesForm";
import { useCollectionStore } from "../../../store/store";
import PropertiesItem from "./PropertiesItem";
import { useParams } from "react-router-dom";

const Properties = () => {
  const collectionID = useParams().id;
  const collections = useCollectionStore((state) => state.collections);

  const currentCollection = collections.find((c) => c._id === collectionID);
  if (!currentCollection) {
    return <Heading>Empty collection</Heading>;
  }
  console.log(currentCollection);
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
            <PropertiesItem key={index} feature={feature} />
          ))}
        </HStack>
      )}
    </VStack>
  );
};

export default Properties;
