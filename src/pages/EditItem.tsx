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
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useCollectionStore } from "../store/store";
import { IoIosArrowBack } from "react-icons/io";
import useErrorHandler from "../hooks/useError";
import {
  ItemType,
  ReqItemData,
  OptItemData,
  FieldRenderType,
} from "../types/types";
import { ChangeEvent, useEffect, useState } from "react";
import { updateItem } from "../services/service";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { convertToBase64 } from "../utils";

const EditItem = () => {
  const itemID = useParams().id;
  const items = useCollectionStore((state) => state.items);
  const currentItem = items.find((item) => item._id === itemID);
  const currentUser = useCollectionStore((state) => state.currentUser);
  const setItems = useCollectionStore((state) => state.setItems);
  const collections = useCollectionStore((state) => state.collections);
  const currentCollection = collections.find(
    (c) => c._id === currentItem?.collectionID
  );

  const { handleFail } = useErrorHandler();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<ReqItemData>({
    defaultValues: {
      name: currentItem?.name || "",
      tags: currentItem?.tags || "",
      description: currentItem?.description || "",
    },
  });

  const getInputValue = (collectionFieldID: string) => {
    const item = currentItem?.fields.find(
      (field) => field._id === collectionFieldID
    );
    return item?.fieldValue || "";
  };

  const updateInitialFieldsValue = () => {
    console.log(currentCollection?.itemFields);
    const fields: FieldRenderType[] = [];
    currentCollection?.itemFields.map((field) => {
      if (field._id) {
        fields.push({
          _id: field._id,
          fieldName: field.fieldName,
          fieldType: field.fieldType,
          fieldValue: getInputValue(field._id),
        });
      }
    });
    return fields;
  };

  const [postImage, setPostImage] = useState({ myFile: currentItem?.image });
  const [postImageError, setPostImageError] = useState("");
  const [optFormData, setOptFormData] = useState<OptItemData>({
    fields: updateInitialFieldsValue() || [],
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, id, type } = event.target;
    console.log(event.target);

    console.log(optFormData);

    setOptFormData((prevState) => {
      const existingFieldIndex = prevState.fields.findIndex(
        (field) => field._id === id
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
            { fieldName: name, fieldType: type, fieldValue: value, _id: id },
          ],
        };
      }
    });
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 500000; // 500kb
      if (fileSize > maxSize) {
        setPostImageError("Image exeeds 500kb");
        setPostImage({ myFile: "" });
        return;
      } else {
        setPostImageError("");
      }
      const base64 = await convertToBase64(file);
      setPostImage({ myFile: base64 as string });
    }
  };

  const createData = (reqData: ReqItemData, OptData: OptItemData) => {
    return {
      _id: currentItem?._id || "",
      collectionID: currentItem?.collectionID || "",
      userID: currentUser._id,
      name: reqData.name,
      description: reqData.description,
      tags: reqData.tags.trim(),
      image: postImage.myFile || "",
      fields: OptData.fields || [],
      likeIDs: currentItem?.likeIDs || [],
      commentIDs: currentItem?.commentIDs || [],
      createdAt: currentItem?.createdAt || new Date(),
    };
  };

  const onSubmit = (reqData: ReqItemData) => {
    console.log("Form ", reqData);
    const result: ItemType = createData(reqData, optFormData);
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

    setOptFormData({
      fields: [],
    });
  };

  return (
    <Box padding={{ base: 2, md: 5 }} mt={{ base: 2, md: 0 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <Button type="submit" variant={"outline"} colorScheme="green">
              Save
            </Button>
          </HStack>
        </HStack>
        <Box>
          <Stack spacing={5} mt={5}>
            <Heading fontSize={"large"}>Required fields:</Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <VStack spacing={2} flexGrow={1} mr={5}>
                <FormControl isRequired>
                  <HStack justify={"space-between"}>
                    <FormLabel>Name</FormLabel>
                    <Text fontSize={"small"} paddingX={1} color={"red.300"}>
                      {errors.name?.message}
                    </Text>
                  </HStack>
                  <Input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                    required={true}
                    type={"text"}
                    placeholder="Name"
                    borderColor={errors.name ? "red.300" : "gray.300"}
                  />
                </FormControl>
                <FormControl isRequired>
                  <HStack justify={"space-between"}>
                    <FormLabel htmlFor="tags">Tags</FormLabel>
                    <Text fontSize={"small"} paddingX={1} color={"red.300"}>
                      {errors.tags?.message}
                    </Text>
                  </HStack>
                  <Input
                    {...register("tags", {
                      required: {
                        value: true,
                        message: "Tags are required",
                      },
                      pattern: {
                        value: /^[\w\s-]+$/,
                        message:
                          "Tags can only contain letters, numbers, spaces, and hyphens",
                      },
                    })}
                    required={true}
                    type={"text"}
                    id="tags"
                    placeholder="One Two Three"
                    borderColor={errors.tags ? "red.300" : "gray.300"}
                  />
                </FormControl>
              </VStack>

              <Box flexGrow={1}>
                <FormControl isRequired>
                  <HStack justify={"space-between"}>
                    <FormLabel htmlFor="desc">Description</FormLabel>
                    <Text fontSize={"small"} paddingX={1} color={"red.300"}>
                      {errors.description?.message}
                    </Text>
                  </HStack>
                  <Textarea
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Description is required",
                      },
                    })}
                    id="desc"
                    required={true}
                    display={"block"}
                    height={"120px"}
                    width={"100%"}
                    verticalAlign={"top"}
                    borderColor={errors.description ? "red.300" : "gray.300"}
                  />
                </FormControl>
              </Box>
            </SimpleGrid>
          </Stack>

          <Divider my={5} />

          <Stack spacing={5}>
            <Heading fontSize={"large"}>Optional fields:</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
              <FormControl
                border={"1px solid"}
                padding={2}
                paddingTop={"5px"}
                borderRadius={10}
                alignItems={"center"}
              >
                <FormLabel
                  display={"flex"}
                  height={"fit-content"}
                  fontWeight={"bold"}
                  alignItems={"center"}
                  marginBottom={1}
                >
                  <Badge
                    colorScheme="green"
                    fontSize={"2xs"}
                    marginRight={1}
                    height={"fit-content"}
                  >
                    File
                  </Badge>
                  Image
                </FormLabel>

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
                  height={"fit-content"}
                />

                {postImageError && (
                  <Text fontSize={"xs"} color={"red.300"}>
                    {postImageError}
                  </Text>
                )}
              </FormControl>

              {optFormData.fields.map((field) => {
                return (
                  <FormControl key={field._id}>
                    {field.fieldType === "checkbox" ? (
                      <Checkbox
                        id={field._id}
                        name={field.fieldName}
                        padding={2}
                        width={"100%"}
                      >
                        {field.fieldName}
                      </Checkbox>
                    ) : (
                      <>
                        <FormLabel alignItems={"center"}>
                          <Badge colorScheme="green" fontSize={"2xs"} mr={1}>
                            {field.fieldType}
                          </Badge>
                          {field.fieldName}
                        </FormLabel>
                        <Input
                          id={field._id}
                          name={field.fieldName}
                          type={field.fieldType}
                          placeholder={field.fieldName}
                          value={field.fieldValue}
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
        <DevTool control={control} />
      </form>
    </Box>
  );
};

export default EditItem;
