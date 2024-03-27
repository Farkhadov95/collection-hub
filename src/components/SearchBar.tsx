import {
  HStack,
  IconButton,
  Input,
  VStack,
  Text,
  Divider,
  Box,
  StackDivider,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import useErrorHandler from "../hooks/useError";
import { Link, useNavigate } from "react-router-dom";
import { searchComments, searchItems } from "../services/service";
import { IoMdClose } from "react-icons/io";
import { useOutsideClick } from "@chakra-ui/react";
import { useNonPersistStore } from "../store/store";

const SearchBar = () => {
  const [formData, setFormData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchedItems = useNonPersistStore((state) => state.searchedItems);
  const setSearchedItems = useNonPersistStore(
    (state) => state.setSearchedItems
  );
  const searchedComments = useNonPersistStore(
    (state) => state.searchedComments
  );
  const setSearchedComments = useNonPersistStore(
    (state) => state.setSearchedComments
  );
  const { handleFail } = useErrorHandler();
  const navigate = useNavigate();
  const resultRef = useRef(null);

  useOutsideClick({
    ref: resultRef,
    handler: () => setIsOpen(false),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      setIsLoading(true);
      Promise.all([searchItems(formData), searchComments(formData)])
        .then(([items, comments]) => {
          setSearchedItems(items);
          setSearchedComments(comments);
          setIsOpen(true);
          setIsLoading(false);
        })
        .catch((err) => {
          const errorMessage = err.message.toString();
          handleFail(errorMessage);
          setIsLoading(false);
        });
    }
  };

  const handleClear = () => {
    setFormData("");
    setIsOpen(false);
    setSearchedComments([]);
    setSearchedItems([]);
  };

  const handleRedirect = (itemID: string) => {
    navigate(`/item/${itemID}`);
    handleClear();
  };

  const { colorMode } = useColorMode();

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{ flexGrow: "1", position: "relative" }}
    >
      <HStack spacing={2} flexGrow={"1"} position={"relative"}>
        <InputGroup>
          <Input
            name="search"
            placeholder="Search"
            width={"100%"}
            value={formData}
            onChange={handleChange}
          />
          <InputRightElement>
            <IconButton
              icon={<IoMdClose />}
              variant={"ghost"}
              colorScheme="green"
              size="18rem"
              aria-label={"clear"}
              onClick={handleClear}
            />
          </InputRightElement>
        </InputGroup>
        <IconButton
          isLoading={isLoading}
          type="submit"
          variant="outline"
          aria-label="search"
          icon={<IoSearch />}
        />
      </HStack>
      {isOpen && (
        <VStack
          ref={resultRef}
          bgColor={colorMode === "dark" ? "gray.600" : "gray.300"}
          mt={1}
          borderRadius={"0 0 10px 10px"}
          padding={2}
          alignItems={"start"}
          position={"absolute"}
          width={"100%"}
          boxShadow="dark-lg"
          zIndex={1000}
        >
          <Box width={"100%"}>
            <HStack mb={1}>
              <Text
                fontSize={"small"}
                whiteSpace={"nowrap"}
                color={colorMode === "dark" ? "green.200" : "green.500"}
              >
                Items ({searchedItems.length})
              </Text>
              <Divider />
              {searchedItems.length > 3 && (
                <Text
                  as={Link}
                  to={`/search`}
                  fontSize={"small"}
                  color={colorMode === "dark" ? "green.200" : "green.500"}
                  whiteSpace={"nowrap"}
                >
                  See all
                </Text>
              )}
            </HStack>
            <VStack
              width={"100%"}
              alignItems={"start"}
              divider={<StackDivider />}
            >
              {searchedItems.slice(0, 3).map((item) => (
                <Box key={item._id} width={"100%"}>
                  <Text onClick={() => handleRedirect(item._id)} width={"100%"}>
                    {item.name}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>

          <Box width={"100%"}>
            <HStack mb={1}>
              <Text
                fontSize={"small"}
                whiteSpace={"nowrap"}
                color={colorMode === "dark" ? "green.200" : "green.500"}
              >
                Comments ({searchedComments.length})
              </Text>
              <Divider />
            </HStack>
            {searchedComments.slice(0, 3).map((comment) => (
              <Box key={comment._id} width={"100%"}>
                <Text
                  onClick={() => handleRedirect(comment.itemID)}
                  width={"100%"}
                >
                  {comment.comment}
                </Text>
              </Box>
            ))}
          </Box>
        </VStack>
      )}
    </form>
  );
};

export default SearchBar;
