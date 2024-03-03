import { HStack, Select, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useAppStore } from "../../../store/store";

const PropertiesForm = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const addFeature = useAppStore((state) => state.addFeature);

  const handleClick = () => {
    addFeature({ type: selectedType, name: name });
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <IconButton
        variant={"outline"}
        aria-label={"Add features"}
        icon={<IoMdAdd />}
        onClick={handleClick}
      >
        Add
      </IconButton>
    </HStack>
  );
};

export default PropertiesForm;
