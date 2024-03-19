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
  Textarea,
  DrawerFooter,
  Text,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { useRef } from "react";
import { updateCollection } from "../../services/service";
import { useCollectionStore } from "../../store/store";
import useErrorHandler from "../../hooks/useError";
import { Collection, collectionFormData } from "../../types/types";
import { useForm } from "react-hook-form";

type EditCollectionCard = {
  collection: Collection;
};

const EditCollectionCard = ({ collection }: EditCollectionCard) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);
  const collections = useCollectionStore((state) => state.collections);
  const setCollections = useCollectionStore((state) => state.setCollections);

  const { handleFail } = useErrorHandler();

  const form = useForm<collectionFormData>({
    defaultValues: {
      topic: collection.topic,
      name: collection.name,
      description: collection.description,
      image: collection.image,
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

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

  const onSubmit = (data: collectionFormData) => {
    const result = createData(data);
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
      <Text display={"block"} width={"100%"} onClick={onOpen}>
        Edit
      </Text>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Edit collection</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <FormControl isRequired>
                  <FormLabel>Topic</FormLabel>
                  <Select
                    {...register("topic", {
                      required: {
                        value: true,
                        message: "Please select topic",
                      },
                    })}
                    placeholder="Select topic"
                  >
                    <option value="books">Books</option>
                    <option value="movies">Movies</option>
                    <option value="coins">Coins</option>
                    <option value="music">Music</option>
                    <option value="games">Games</option>
                    <option value="furniture">Furniture</option>
                    <option value="other">Other</option>
                  </Select>
                  <Text ml={"auto"} fontSize={"small"} color={"red.300"} px="2">
                    {errors.topic?.message}
                  </Text>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="username">Name</FormLabel>
                  <Input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Please enter user name",
                      },
                    })}
                    id="username"
                    placeholder="Please enter user name"
                  />
                  <Text ml={"auto"} fontSize={"small"} color={"red.300"} px="2">
                    {errors.name?.message}
                  </Text>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="desc">Description</FormLabel>
                  <Textarea
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Please enter description",
                      },
                    })}
                    id="desc"
                  />
                  <Text ml={"auto"} fontSize={"small"} color={"red.300"} px="2">
                    {errors.description?.message}
                  </Text>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="image">Image</FormLabel>
                  <Input
                    {...register("image")}
                    type="file"
                    id="imageUrl"
                    border={"none"}
                    padding={0}
                  />
                </FormControl>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="green">
                Update
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
};

export default EditCollectionCard;
