import { HStack, IconButton, Input } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <HStack spacing={2}>
      <Input placeholder="Search" width={{ md: "300px", lg: "500px" }} />
      <IconButton variant="outline" aria-label="search" icon={<IoSearch />} />
    </HStack>
  );
};

export default SearchBar;
