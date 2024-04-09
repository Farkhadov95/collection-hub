import {
  Box,
  Heading,
  Stack,
  SimpleGrid,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useItemStore } from "../store/itemStore";
import { useUserStore } from "../store/userStore";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createItem } from "../services/item";
import { OptItemData, ReqItemData, newItem } from "../types/item";
import useErrorHandler from "../hooks/useError";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PageTitle from "../components/add-item/PageTitle";
import NameInput from "../components/add-item/NameInput";
import TagInput from "../components/add-item/TagInput";
import DescInput from "../components/add-item/DescInput";
import ImageInput from "../components/add-item/ImageInput";
import OptionalInputs from "../components/add-item/OptionalInputs";

const AddItem = () => {
  const collectionID = useParams().id || "";

  const currentUser = useUserStore((state) => state.currentUser);
  const items = useItemStore((state) => state.items);
  const setItems = useItemStore((state) => state.setItems);

  const [isLoading, setIsLoading] = useState(false);
  const [postImage, setPostImage] = useState({ myFile: "" });
  const [optFormData, setOptFormData] = useState<OptItemData>({
    fields: [],
  });

  const { handleFail } = useErrorHandler();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm<ReqItemData>({
    defaultValues: {
      name: "",
      tags: "",
      description: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

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
    setIsLoading(true);
    createItem(result)
      .then((data) => {
        setItems([...items, data]);
        navigate(-1);
        setIsLoading(false);
        setOptFormData({
          fields: [],
        });
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box padding={{ base: 2, md: 5 }} mt={{ base: 2, md: 0 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <PageTitle isLoading={isLoading} />
        <Box>
          <Stack spacing={5} mt={5}>
            <Heading fontSize={"large"}>{t("item.requiredFields")}:</Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <VStack spacing={2} flexGrow={1} mr={5}>
                <NameInput register={register} errors={errors} />
                <TagInput register={register} errors={errors} />
              </VStack>

              <Box flexGrow={1}>
                <DescInput register={register} errors={errors} />
              </Box>
            </SimpleGrid>
          </Stack>

          <Divider my={5} />

          <Stack spacing={5}>
            <Heading fontSize={"large"}>{t("item.optionalFields")}:</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
              <ImageInput setPostImage={setPostImage} />
              <OptionalInputs setOptFormData={setOptFormData} />
            </SimpleGrid>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default AddItem;
