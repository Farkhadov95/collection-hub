import { HStack, Select, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Collection, useCollectionStore } from "../../../store/store";
import { postUpdate } from "../../../service/service";

const PropertiesForm = () => {
  const URL = "http://localhost:3000/collection/";

  const [selectedType, setSelectedType] = useState<string>("");
  const [name, setName] = useState<string>("");

  const currentCollection = useCollectionStore(
    (state) => state.currentCollection
  );

  const setCollection = useCollectionStore(
    (state) => state.setCurrentCollection
  );

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

      try {
        const res = await postUpdate(URL, updatedCollection);
        setCollection(res);
        clearForm();
        console.log("Collection updated successfully");
      } catch (error) {
        console.error("Failed to update collection:", error);
      }
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

    console.log(availableTypes);
    return availableTypes;
  };

  availableTypes();

  return (
    availableTypes().length > 0 && (
      <HStack>
        <Select
          placeholder="Select type"
          required
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {availableTypes().map((type) => (
            <option key={type} value={type}>
              {type[0].toUpperCase() + type.slice(1)}
            </option>
          ))}
        </Select>
        <Input
          type="text"
          placeholder="Name"
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

export default PropertiesForm;
