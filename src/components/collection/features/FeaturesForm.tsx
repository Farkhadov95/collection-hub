import { HStack, Select, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useCollectionStore, useNonPersistStore } from "../../../store/store";
import { updateCollection } from "../../../services/service";
import { Collection } from "../../../types/types";
import useErrorHandler from "../../../hooks/useError";
import { useTranslation } from "react-i18next";

type PropertiesFormProps = {
  currentCollection: Collection;
};

const FeaturesForm = ({ currentCollection }: PropertiesFormProps) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { handleFail } = useErrorHandler();
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);
  const setFeaturesLoading = useNonPersistStore(
    (state) => state.setFeaturesLoading
  );
  const { t } = useTranslation();

  const clearForm = () => {
    setSelectedType("");
    setName("");
  };

  const handleAdd = async () => {
    if (currentCollection && selectedType !== "" && name !== "") {
      const updatedCollection: Collection = {
        ...currentCollection,
        itemFields: [
          ...currentCollection.itemFields,
          { fieldName: name, fieldType: selectedType },
        ],
      };

      setFeaturesLoading(true);
      await updateCollection(updatedCollection)
        .then((data) => {
          clearForm();
          console.log("Collection updated successfully");
          setCollections(
            collections.map((c) => (c._id === data._id ? data : c))
          );
          setFeaturesLoading(false);
        })
        .catch((err) => {
          const errorMessage = err.message.toString();
          handleFail(errorMessage);
          setFeaturesLoading(false);
        });
    }
  };

  const availableTypes = () => {
    const MAX_COUNT = 3;
    const typeCounts: { [key: string]: number } = {
      text: 0,
      number: 0,
      date: 0,
      checkbox: 0,
    };

    if (currentCollection) {
      currentCollection.itemFields.forEach((field) => {
        typeCounts[field.fieldType]++;
      });
    }

    const availableTypes = Object.keys(typeCounts).filter(
      (type) => typeCounts[type] < MAX_COUNT
    );

    return availableTypes;
  };

  return (
    availableTypes().length > 0 && (
      <HStack>
        <Select
          placeholder={t("collection.selectType")}
          required
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {availableTypes().map((type) => (
            <option key={type} value={type}>
              {t(`types.${type}`)}
            </option>
          ))}
        </Select>
        <Input
          type="text"
          placeholder={t("collection.selectName")}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <IconButton
          variant={"outline"}
          aria-label={"Add features"}
          icon={<IoMdAdd />}
          onClick={handleAdd}
          disabled={!selectedType || !name}
        />
      </HStack>
    )
  );
};

export default FeaturesForm;
