import { HStack, Box, Badge, IconButton, Text } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { Collection, Feature, useCollectionStore } from "../../../store/store";
import { postUpdate } from "../../../service/service";

type PropertiesItemProp = {
  feature: Feature;
};

const PropertiesItem = ({ feature }: PropertiesItemProp) => {
  const URL = "http://localhost:3000/collection/";
  const currentCollection = useCollectionStore(
    (state) => state.currentCollection
  );

  const setCollection = useCollectionStore(
    (state) => state.setCurrentCollection
  );

  const handleDelete = async (id: string) => {
    if (currentCollection && id !== "") {
      const updatedCollection: Collection = {
        ...currentCollection,
        itemFields: currentCollection.itemFields.filter(
          (field) => field._id !== id
        ),
      };

      try {
        const res = await postUpdate(URL, updatedCollection);
        setCollection(res);
        console.log("Collection updated successfully");
      } catch (error) {
        console.error("Failed to update collection:", error);
      }
    }
  };

  return (
    <Box
      border={"1px solid"}
      boxSizing={"border-box"}
      borderRadius={10}
      padding={{ base: 1, md: 2 }}
    >
      <HStack position={"relative"}>
        <Badge colorScheme="green" fontSize={"2xs"}>
          {feature.fieldType}
        </Badge>
        <Text fontWeight={"bold"}>{feature.fieldName}</Text>
        <IconButton
          size={"xs"}
          variant={"ghost"}
          aria-label="delete"
          icon={<IoMdClose />}
          onClick={() => {
            handleDelete(feature._id || "");
          }}
        />
      </HStack>
    </Box>
  );
};

export default PropertiesItem;
