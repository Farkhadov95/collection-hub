import { HStack, IconButton, Input } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <HStack spacing={2} flexGrow={"1"}>
      <Input placeholder="Search" width={"100%"} />
      <IconButton variant="outline" aria-label="search" icon={<IoSearch />} />
    </HStack>
  );
};

export default SearchBar;
