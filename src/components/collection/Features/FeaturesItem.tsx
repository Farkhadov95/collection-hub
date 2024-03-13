import { HStack, Box, Badge, IconButton, Text } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { useCollectionStore } from "../../../store/store";
import { deleteCollectionFeature } from "../../../services/service";
import { useParams } from "react-router-dom";
import { FieldType } from "../../../types/types";

type PropertiesItemProp = {
  feature: FieldType;
};

const FeaturesItem = ({ feature }: PropertiesItemProp) => {
  const collectionID = useParams().id;
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);

  const currentCollection = collections.find((c) => c._id === collectionID);
  const currentUser = useCollectionStore((state) => state.currentUser);

  const handleDelete = async (id: string) => {
    if (id !== "" && collectionID && feature._id && currentCollection) {
      deleteCollectionFeature(collectionID, feature._id, currentUser._id)
        .then(() => {
          const updatedItemFields = currentCollection.itemFields.filter(
            (item) => item._id !== id
          );

          const updatedCollection = {
            ...currentCollection,
            itemFields: updatedItemFields,
          };

          const updatedCollections = collections.map((collection) => {
            if (collection._id === collectionID) {
              return updatedCollection;
            }
            return collection;
          });
          setCollections(updatedCollections);
        })
        .catch((err) => {
          console.error(
            "Failed to delete collection item field (feature):",
            err
          );
        });
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

export default FeaturesItem;
