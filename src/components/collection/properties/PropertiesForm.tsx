import { HStack, Select, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Collection, useCollectionStore } from "../../../store/store";
import { postUpdate } from "../../../service/service";

const PropertiesForm = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [name, setName] = useState<string>("");

  const currentCollection = useCollectionStore(
    (state) => state.currentCollection
  );

  const setCollection = useCollectionStore(
    (state) => state.setCurrentCollection
  );

  const URL = "http://localhost:3000/collection/";

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

  return (
    <HStack>
      <Select
        placeholder="Select type"
        required
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="checkbox">Checkbox</option>
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
  );
};

export default PropertiesForm;
