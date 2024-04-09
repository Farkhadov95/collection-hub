import { HStack, Box, Badge, Text } from "@chakra-ui/react";
import { useCollectionStore, useNonPersistStore } from "../../../store/store";
import { useItemStore } from "../../../store/itemStore";
import { deleteCollectionFeature } from "../../../services/collection";
import { useParams } from "react-router-dom";
import { FieldType } from "../../../types/collections";
import useErrorHandler from "../../../hooks/useError";
import { useTranslation } from "react-i18next";
import FeatureDelete from "./FeatureDelete";

type PropertiesItemProp = {
  feature: FieldType;
};

const FeaturesItem = ({ feature }: PropertiesItemProp) => {
  const collectionID = useParams().id;
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);
  const setFeaturesLoading = useNonPersistStore(
    (state) => state.setFeaturesLoading
  );

  const currentCollection = collections.find((c) => c._id === collectionID);
  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();

  const items = useItemStore((state) => state.items);
  const setItems = useItemStore((state) => state.setItems);

  const handleDelete = async (id: string) => {
    if (id !== "" && collectionID && feature._id && currentCollection) {
      setFeaturesLoading(true);
      deleteCollectionFeature(collectionID, feature._id)
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

          const updatedItems = items.map((item) => ({
            ...item,
            fields: item.fields.filter((field) => field._id !== feature._id),
          }));

          setFeaturesLoading(false);
          setCollections(updatedCollections);
          setItems(updatedItems);
        })
        .catch((err) => {
          const errorMessage = err.message.toString();
          handleFail(errorMessage);
          setFeaturesLoading(false);
        });
    }
  };

  return (
    <Box
      border={"1px solid"}
      boxSizing={"border-box"}
      borderRadius={10}
      paddingX={{ base: 2 }}
      paddingY={{ base: 1, md: 2 }}
    >
      <HStack position={"relative"}>
        <Badge colorScheme="green" fontSize={"2xs"}>
          {t(`types.${feature.fieldType}`)}
        </Badge>
        <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "medium" }}>
          {feature.fieldName}
        </Text>
        <FeatureDelete feature={feature} handleDelete={handleDelete} />
      </HStack>
    </Box>
  );
};

export default FeaturesItem;
