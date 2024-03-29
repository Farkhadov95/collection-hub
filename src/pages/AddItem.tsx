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
  Text,
} from "@chakra-ui/react";
import { useCollectionStore } from "../store/store";
import { useParams, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, useEffect } from "react";
import { createItem } from "../services/service";
import { OptItemData, ReqItemData, newItem } from "../types/types";
import useErrorHandler from "../hooks/useError";
import { useForm } from "react-hook-form";
import { convertToBase64 } from "../utils";
import BackButton from "../components/buttons/BackButton";
import { useTranslation } from "react-i18next";

const AddItem = () => {
  const collectionID = useParams().id || "";
  const collections = useCollectionStore((state) => state.collections);
  const currentCollection = collections.find((c) => c._id === collectionID);
  const currentUser = useCollectionStore((state) => state.currentUser);

  const items = useCollectionStore((state) => state.items);
  const setItems = useCollectionStore((state) => state.setItems);
  const { handleFail } = useErrorHandler();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<ReqItemData>({
    defaultValues: {
      name: "",
      tags: "",
      description: "",
    },
  });

  const [postImage, setPostImage] = useState({ myFile: "" });
  const [optFormData, setOptFormData] = useState<OptItemData>({
    fields: [],
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, id, type } = event.target;

    if (name !== "image") {
      setOptFormData((prevState) => {
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
              { fieldName: name, fieldType: type, fieldValue: value, _id: id },
            ],
          };
        }
      });
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 500000; // 500kb
      if (fileSize > maxSize) {
        handleFail("File size should NOT exceed 500kb");
        return;
      }
      const base64 = await convertToBase64(file);
      setPostImage({ myFile: base64 as string });
    }
  };

  const createData = (reqData: ReqItemData, optData: OptItemData) => {
    const result = {
      collectionID,
      userID: currentUser._id,
      name: reqData.name,
      description: reqData.description,
      tags: reqData.tags.trim(),
      image: postImage.myFile,
      fields: optData.fields,
    };

    return result;
  };

  const onSubmit = (reqData: ReqItemData) => {
    const result: newItem = createData(reqData, optFormData);
    createItem(result)
      .then((data) => {
        setItems([...items, data]);
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
          <Heading size={{ base: "md", md: "lg" }}>Add New Item</Heading>
          <HStack spacing={3}>
            <BackButton />
            <Button type="submit" variant={"outline"} colorScheme="green">
              {t("tools.save")}
            </Button>
          </HStack>
        </HStack>
        <Box>
          <Stack spacing={5} mt={5}>
            <Heading fontSize={"large"}>{t("item.requiredFields")}:</Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <VStack spacing={2} flexGrow={1} mr={5}>
                <FormControl isRequired>
                  <HStack justify={"space-between"}>
                    <FormLabel>{t("nav.name")}</FormLabel>
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
                    <FormLabel htmlFor="tags">{t("item.tags")}</FormLabel>
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
                    <FormLabel htmlFor="desc">
                      {t("collection.description")}
                    </FormLabel>
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
                      maxLength: {
                        value: 500,
                        message: "Maximum length - 500 characters",
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
            <Heading fontSize={"large"}>{t("item.optionalFields")}:</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
              <FormControl
                display={"flex"}
                border={"1px solid"}
                padding={2}
                borderRadius={10}
                alignItems={"center"}
              >
                <FormLabel
                  display={"flex"}
                  height={"fit-content"}
                  fontWeight={"bold"}
                  alignItems={"center"}
                  marginBottom={0}
                >
                  <Badge
                    colorScheme="green"
                    fontSize={"2xs"}
                    marginRight={1}
                    height={"fit-content"}
                  >
                    {t("types.file")}
                  </Badge>
                  {t("item.image")}
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
              </FormControl>
              {currentCollection?.itemFields.map((item) => {
                return (
                  <FormControl key={item._id}>
                    {item.fieldType === "checkbox" ? (
                      <Checkbox
                        id={item._id}
                        padding={2}
                        width={"100%"}
                        name={item.fieldName}
                      >
                        {item.fieldName}
                      </Checkbox>
                    ) : (
                      <>
                        <FormLabel alignItems={"center"}>
                          <Badge colorScheme="green" fontSize={"2xs"} mr={1}>
                            {t(`types.${item.fieldType}`)}
                          </Badge>
                          {item.fieldName}
                        </FormLabel>
                        <Input
                          id={item._id}
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
      </form>
    </Box>
  );
};

export default AddItem;
