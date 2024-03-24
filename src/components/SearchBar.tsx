import {
  HStack,
  IconButton,
  Input,
  VStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoSearch } from "react-icons/io5";
import useErrorHandler from "../hooks/useError";
import { searchData } from "../services/service";
import { commentSearch } from "../types/types";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [formData, setFormData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchComments, setSearchComments] = useState<commentSearch[]>([]);
  const { handleFail } = useErrorHandler();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      searchData(formData)
        .then((data) => {
          console.log(data);
          setSearchComments(data);
          setIsOpen(true);
        })
        .catch((err) => {
          const errorMessage = err.message.toString();
          console.log(errorMessage);
          handleFail(errorMessage);
        });
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{ flexGrow: "1", position: "relative" }}
    >
      <HStack spacing={2} flexGrow={"1"}>
        <Input
          name="search"
          placeholder="Search"
          width={"100%"}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          variant="outline"
          aria-label="search"
          icon={<IoSearch />}
        />
      </HStack>
      {isOpen && (
        <VStack
          bgColor={"gray.600"}
          mt={1}
          divider={<Divider />}
          borderRadius={"0 0 10px 10px"}
          padding={2}
          alignItems={"start"}
          position={"absolute"}
          width={"100%"}
          zIndex={1}
        >
          <Text fontSize={"small"}>Comments ({searchComments.length})</Text>
          {searchComments.slice(0, 2).map((comment) => (
            <HStack
              key={comment._id}
              overflow={"hidden"}
              height={"20px"}
              mb={1}
              alignItems={"start"}
            >
              <Text as={Link} to={`/item/${comment.itemID}`} width={"100%"}>
                {comment.comment}
              </Text>
            </HStack>
          ))}
        </VStack>
      )}
    </form>
  );
};

export default SearchBar;
