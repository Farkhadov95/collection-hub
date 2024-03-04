import { HStack, Select, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Collection, useCollectionStore } from "../../../store/store";

const PropertiesForm = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const currentCollection = useCollectionStore((state) => state.collection);

  const URL = "http://localhost:3000/collection/";

  const postUpdate = async (collection: Collection) => {
    const res = await fetch(`${URL}${collection._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleAdd = async () => {
    if (currentCollection) {
      const updatedCollection: Collection = {
        ...currentCollection,
        itemFields: [
          ...currentCollection.itemFields,
          { fieldName: name, fieldType: selectedType },
        ],
      };

      try {
        await postUpdate(updatedCollection);

        // Optionally, update the local state with the updated collection
        useCollectionStore.setState({ collection: updatedCollection });

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
      >
        Add
      </IconButton>
    </HStack>
  );
};

export default PropertiesForm;
