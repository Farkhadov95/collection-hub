import {
  Box,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Stack,
  SimpleGrid,
  FormControl,
  VStack,
  Divider,
  HStack,
  Button,
  Badge,
  Checkbox,
} from "@chakra-ui/react";
import { FieldExeType, newItem, useCollectionStore } from "../store/store";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createItem } from "../service/service";

const AddItem = () => {
  const collectionID = useParams().id || "";
  const collections = useCollectionStore((state) => state.collections);
  const collection = collections.find((c) => c._id === collectionID);
  const navigate = useNavigate();

  type AddItemForm = {
    name: string;
    tags: string;
    description: string;
    image: string;
    fields: FieldExeType[] | [];
  };

  const [formData, setFormData] = useState<AddItemForm>({
    name: "",
    tags: "",
    description: "",
    image: "",
    fields: [],
  });

  const handleInputChange = (
    event: React.ChangeEvent<
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

  console.log(formData);

  const createData = (data: AddItemForm) => {
    const result = {
      collectionID,
      name: data.name,
      description: data.description,
      tags: data.tags,
      image: data.image,
      fields: data.fields,
    };

    return result;
  };

  const handleSubmit = () => {
    const result: newItem = createData(formData);
    createItem(result).then((data) => {
      console.log(data);
    });
    // console.log(result);

    setFormData({
      ...formData,
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
        <Heading size="lg">Add New Item</Heading>
        <HStack spacing={3}>
          <Button onClick={() => navigate(-1)} variant={"outline"}>
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
                  name="name"
                  placeholder="First name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="tags">Tags</FormLabel>
                <Input
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
            {collection?.itemFields.map((item) => {
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

export default AddItem;
