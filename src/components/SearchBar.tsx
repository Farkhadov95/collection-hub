import { HStack, IconButton, Input } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <HStack spacing={2}>
      <Input
        placeholder="Search"
        width={{ md: "200px", lg: "300px", xl: "400px" }}
      />
      <IconButton variant="outline" aria-label="search" icon={<IoSearch />} />
    </HStack>
  );
};

export default SearchBar;
