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
  Text,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { updateCollection } from "../../services/service";
import { useCollectionStore } from "../../store/store";
import useErrorHandler from "../../hooks/useError";
import { Collection, collectionFormData } from "../../types/types";

type EditCollectionCard = {
  collection: Collection;
};

const EditCollectionCard = ({ collection }: EditCollectionCard) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);

  const { handleFail } = useErrorHandler();

  const [formData, setFormData] = useState<collectionFormData>({
    topic: collection.topic,
    name: collection.name,
    description: collection.description,
    image: collection.image,
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

  const createData = (data: collectionFormData) => {
    const result = {
      userID: collection.userID,
      _id: collection._id,
      topic: data.topic,
      userName: collection.userName,
      name: data.name,
      description: data.description,
      image: data.image,
      itemFields: collection.itemFields,
      date: collection.date,
    };
    return result;
  };

  const handleSubmit = () => {
    const result = createData(formData);
    updateCollection(result)
      .then((data) => {
        const cleanCollections = collections.filter((c) => c._id !== data._id);
        setCollections([...cleanCollections, data]);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
    onClose();
  };

  return (
    <>
      <Text onClick={onOpen} display={"block"}>
        Edit
      </Text>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Edit collection</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <FormControl isRequired>
                <FormLabel>Topic</FormLabel>
                <Select
                  placeholder="Select topic"
                  name="topic"
                  onChange={handleInputChange}
                  value={formData.topic}
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
              Update
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EditCollectionCard;
