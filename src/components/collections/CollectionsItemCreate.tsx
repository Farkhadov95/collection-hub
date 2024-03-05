import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  DrawerFooter,
  Icon,
  Text,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { createCollection } from "../../service/service";

const CollectionsItemCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);

  type formData = {
    topic: string;
    name: string;
    description: string;
    image: string;
  };

  const [formData, setFormData] = useState({
    topic: "",
    name: "",
    description: "",
    image: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createData = (data: formData) => {
    const result = {
      userID: "1",
      topic: data.topic,
      name: data.name,
      description: data.description,
      image: data.image,
    };

    return result;
  };

  const handleSubmit = () => {
    console.log(formData);
    const result = createData(formData);
    createCollection(result);

    setFormData({
      ...formData,
      topic: "",
      name: "",
      description: "",
      image: "",
    });
    onClose();
  };

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        <Icon as={IoMdAdd} />
        <Text paddingLeft={1}>Create</Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new collection
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <FormControl isRequired>
                <FormLabel>Topic</FormLabel>
                <Select
                  placeholder="Select topic"
                  name="topic"
                  onChange={handleInputChange}
                >
                  <option value="books">Books</option>
                  <option value="movies">Movies</option>
                  <option value="coins">Coins</option>
                  <option value="music">Music</option>
                  <option value="games">Games</option>
                  <option value="furniture">Furniture</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  name="name"
                  placeholder="Please enter user name"
                  onChange={handleInputChange}
                  value={formData.name}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  id="desc"
                  name="description"
                  onChange={handleInputChange}
                  value={formData.description}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="image">Image URL</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    type="url"
                    id="imageUrl"
                    name="image"
                    placeholder="example.com/img"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CollectionsItemCreate;
