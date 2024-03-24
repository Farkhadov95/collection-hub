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
  Icon,
  Text,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { createCollection } from "../../services/service";
import { useCollectionStore } from "../../store/store";
import useErrorHandler from "../../hooks/useError";
import { collectionFormData } from "../../types/types";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { convertToBase64 } from "../../utils";

const AddCollectionCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const collections = useCollectionStore((state) => state.collections);
  const userCollections = useCollectionStore((state) => state.userCollections);

  const { handleFail } = useErrorHandler();
  const setCollections = useCollectionStore((state) => state.setCollections);
  const setUserCollections = useCollectionStore(
    (state) => state.setUserCollections
  );

  const form = useForm<collectionFormData>({
    defaultValues: {
      topic: "",
      name: "",
      description: "",
    },
  });

  const [postImage, setPostImage] = useState({ myFile: "" });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const createData = (data: collectionFormData) => {
    const result = {
      topic: data.topic,
      name: data.name,
      description: data.description,
      image: postImage.myFile || "",
    };

    return result;
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setPostImage({ ...postImage, myFile: base64 as string });
    }
  };

  const onSubmit = (data: collectionFormData) => {
    const result = createData(data);
    createCollection(result)
      .then((data) => {
        setCollections([...collections, data]);
        setUserCollections([...userCollections, data]);
        form.reset();
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
    onClose();
  };

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        <Icon as={IoMdAdd} />
        <Text paddingLeft={1}>Create</Text>
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    name="myFile"
                    type="file"
                    id="imageUrl"
                    border={"none"}
                    paddingX={0}
                    accept=".jpeg, .png, .jpg, .webp"
                    onChange={(e) => {
                      handleFileUpload(e);
                    }}
                  />
                </FormControl>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="green">
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
};

export default AddCollectionCard;
