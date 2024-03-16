import {
  Heading,
  Divider,
  Box,
  Badge,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useCollectionStore } from "../store/store";
import { IoIosArrowBack } from "react-icons/io";
import useErrorHandler from "../hooks/useError";
import { FieldExeType, ItemType } from "../types/types";
import { ChangeEvent, useState } from "react";
import { updateItem } from "../services/service";

const ItemEdit = () => {
  const itemID = useParams().id;
  const items = useCollectionStore((state) => state.items);
  const currentItem = items.find((item) => item._id === itemID);
  const currentUser = useCollectionStore((state) => state.currentUser);
  const setItems = useCollectionStore((state) => state.setItems);
  const collections = useCollectionStore((state) => state.collections);
  const currentCollection = collections.find(
    (c) => c._id === currentItem?.collectionID
  );

  const navigate = useNavigate();
  const { handleFail } = useErrorHandler();

  type AddItemForm = {
    name: string;
    tags: string;
    description: string;
    image: string;
    fields: FieldExeType[] | [];
  };

  const [formData, setFormData] = useState<AddItemForm>({
    name: currentItem?.name || "",
    tags: currentItem?.tags || "",
    description: currentItem?.description || "",
    image: currentItem?.image || "",
    fields: currentItem?.fields || [],
  });

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    if (
      name !== "name" &&
      name !== "tags" &&
      name !== "description" &&
      name !== "image"
    ) {
      setFormData((prevState) => {
        const existingFieldIndex = prevState.fields.findIndex(
          (field) => field.fieldName === name
        );

        if (existingFieldIndex !== -1) {
          const updatedFields = [...prevState.fields];
          updatedFields[existingFieldIndex].fieldValue = value;
          return {
            ...prevState,
            fields: updatedFields,
          };
        } else {
          return {
            ...prevState,
            fields: [
              ...prevState.fields,
              { fieldName: name, fieldValue: value },
            ],
          };
        }
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const createData = (data: AddItemForm) => {
    const result = {
      _id: currentItem?._id || "",
      collectionID: currentItem?.collectionID || "",
      userID: currentUser._id,
      name: data.name,
      description: data.description,
      tags: data.tags.trim(),
      image: data.image,
      fields: data.fields,
      likeIDs: currentItem?.likeIDs || [],
      commentIDs: currentItem?.commentIDs || [],
      createdAt: currentItem?.createdAt || new Date(),
    };

    return result;
  };

  const handleSubmit = () => {
    const result: ItemType = createData(formData);
    updateItem(result)
      .then((data) => {
        const itemsWithout = items.filter((item) => item._id !== data._id);
        setItems([...itemsWithout, data]);
        navigate(-1);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });

    setFormData({
      name: "",
      description: "",
      tags: "",
      image: "",
      fields: [],
    });
  };

  return (
    <Box padding={{ base: 2, md: 5 }} mt={{ base: 2, md: 0 }}>
      <HStack justifyContent={"space-between"}>
        <Heading size="lg">Edit Item</Heading>
        <HStack spacing={3}>
          <Button
            onClick={() => navigate(-1)}
            variant={"outline"}
            leftIcon={<IoIosArrowBack />}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            colorScheme="green"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </HStack>
      </HStack>
      <Box>
        <Stack spacing={5} mt={5}>
          <Heading fontSize={"large"}>Required fields:</Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <VStack spacing={2}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  required={true}
                  type={"text"}
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="tags">Tags</FormLabel>
                <Input
                  required={true}
                  type={"text"}
                  name="tags"
                  id="tags"
                  placeholder="Please enter your tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
              </FormControl>
            </VStack>

            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  id="desc"
                  required={true}
                  name="description"
                  display={"block"}
                  height={"120px"}
                  width={"100%"}
                  verticalAlign={"top"}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>
          </SimpleGrid>
        </Stack>

        <Divider my={5} />

        <Stack spacing={5}>
          <Heading fontSize={"large"}>Optional fields:</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            <FormControl>
              <FormLabel>
                <Badge colorScheme="green" fontSize={"2xs"} mr={1}>
                  link
                </Badge>
                Image URL
              </FormLabel>

              <Input
                name="image"
                type={"url"}
                placeholder="http://www.example.com/"
                value={formData.image}
                onChange={handleInputChange}
              />
            </FormControl>
            {currentCollection?.itemFields.map((item, index) => {
              return (
                <FormControl key={item._id}>
                  {item.fieldType === "checkbox" ? (
                    <Checkbox padding={2} width={"100%"} name={item.fieldName}>
                      {item.fieldName}
                    </Checkbox>
                  ) : (
                    <>
                      <FormLabel alignItems={"center"}>
                        <Badge colorScheme="green" fontSize={"2xs"} mr={1}>
                          {item.fieldType}
                        </Badge>
                        {item.fieldName}
                      </FormLabel>
                      <Input
                        name={item.fieldName}
                        type={item.fieldType}
                        placeholder={item.fieldName}
                        onChange={handleInputChange}
                        value={currentItem?.fields[index].fieldValue}
                      />
                    </>
                  )}
                </FormControl>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
};

export default ItemEdit;
