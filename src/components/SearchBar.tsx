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
  Tag,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import useErrorHandler from "../hooks/useError";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  searchComments,
  searchItems,
  searchCollections,
} from "../services/search";
import { IoMdClose } from "react-icons/io";
import { useOutsideClick } from "@chakra-ui/react";
import { useSearchStore } from "../store/searchStore";
import { useTranslation } from "react-i18next";

type SearchBarProps = {
  onClose?: () => void;
};

const SearchBar = ({ onClose }: SearchBarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const [formData, setFormData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const searchedItems = useSearchStore((state) => state.searchedItems);
  const setSearchedItems = useSearchStore((state) => state.setSearchedItems);
  const searchedComments = useSearchStore((state) => state.searchedComments);
  const setSearchedComments = useSearchStore(
    (state) => state.setSearchedComments
  );
  const searchedCollections = useSearchStore(
    (state) => state.searchedCollections
  );
  const setSearchedCollections = useSearchStore(
    (state) => state.setSearchedCollections
  );
  const { handleFail } = useErrorHandler();
  const navigate = useNavigate();
  const resultRef = useRef(null);
  const { colorMode } = useColorMode();

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
      Promise.all([
        searchCollections(formData),
        searchItems(formData),
        searchComments(formData),
      ])
        .then(([collections, items, comments]) => {
          setSearchedCollections(collections);
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
    setSearchedCollections([]);
    if (onClose) onClose();
  };

  const handleRedirect = (id: string, category: "item" | "collections") => {
    navigate(`/${category}/${id}`);
    handleClear();
  };

  const getPercent = (num: number) => {
    return (Math.round((num + Number.EPSILON) * 100) / 100) * 100;
  };

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
          {formData.length > 0 && (
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
          )}
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
                {t("item.collections")} ({searchedCollections.length})
              </Text>
              <Divider />

              {pathname !== "/search" && (
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
              {searchedCollections.slice(0, 3).map((collection) => (
                <HStack
                  key={collection._id}
                  width={"100%"}
                  justifyContent={"space-between"}
                >
                  <Text
                    onClick={() =>
                      handleRedirect(collection._id, "collections")
                    }
                  >
                    {collection.name}
                  </Text>
                  <Tag colorScheme="green" size={"sm"}>
                    {`${getPercent(collection.normalizedScore)}%`}
                  </Tag>
                </HStack>
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
                {t("item.items")} ({searchedItems.length})
              </Text>
              <Divider />
            </HStack>
            <VStack
              width={"100%"}
              alignItems={"start"}
              divider={<StackDivider />}
            >
              {searchedItems.slice(0, 3).map((item) => (
                <HStack
                  key={item._id}
                  width={"100%"}
                  justifyContent={"space-between"}
                >
                  <Text
                    onClick={() => handleRedirect(item._id, "item")}
                    width={"100%"}
                  >
                    {item.name}
                  </Text>
                  <Tag colorScheme="green" size={"sm"}>
                    {`${getPercent(item.normalizedScore)}%`}
                  </Tag>
                </HStack>
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
                {t("item.comments")} ({searchedComments.length})
              </Text>
              <Divider />
            </HStack>
            <VStack
              width={"100%"}
              alignItems={"start"}
              divider={<StackDivider />}
            >
              {searchedComments.slice(0, 3).map((comment) => (
                <HStack
                  key={comment._id}
                  width={"100%"}
                  justifyContent={"space-between"}
                >
                  <Text
                    onClick={() => handleRedirect(comment.itemID, "item")}
                    width={"100%"}
                  >
                    {comment.comment}
                  </Text>
                  <Tag colorScheme="green" size={"sm"}>
                    {`${getPercent(comment.normalizedScore)}%`}
                  </Tag>
                </HStack>
              ))}
            </VStack>
          </Box>
        </VStack>
      )}
    </form>
  );
};

export default SearchBar;
