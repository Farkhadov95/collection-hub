import {
  Heading,
  Divider,
  Box,
  SimpleGrid,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useCollectionStore } from "../store/collectionStore";
import { useItemStore } from "../store/itemStore";
import { useUserStore } from "../store/userStore";
import useErrorHandler from "../hooks/useError";
import { ItemType, ReqItemData, OptItemData } from "../types/item";
import { useEffect, useState } from "react";
import { updateItem } from "../services/item";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PageTitle from "../components/edit-item/PageTitle";
import NameInput from "../components/add-item/NameInput";
import TagInput from "../components/add-item/TagInput";
import DescInput from "../components/add-item/DescInput";
import ImageInput from "../components/add-item/ImageInput";
import { updateInitialFieldsValue } from "../components/edit-item/utils";
import { Collection } from "../types/collections";
import OptionalInputs from "../components/edit-item/OptionalInputs";

const EditItem = () => {
  const itemID = useParams().id;
  const items = useItemStore((state) => state.items);
  const currentItem = items.find((item) => item._id === itemID) as ItemType;
  const currentUser = useUserStore((state) => state.currentUser);
  const setItems = useItemStore((state) => state.setItems);
  const collections = useCollectionStore((state) => state.collections);
  const currentCollection = collections.find(
    (c) => c._id === currentItem?.collectionID
  ) as Collection;

  const { handleFail } = useErrorHandler();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [optFormData, setOptFormData] = useState<OptItemData>({
    fields: updateInitialFieldsValue(currentItem, currentCollection) || [],
  });

  const form = useForm<ReqItemData>({
    defaultValues: {
      name: currentItem?.name || "",
      tags: currentItem?.tags || "",
      description: currentItem?.description || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const [postImage, setPostImage] = useState({
    myFile: currentItem?.image || "",
  });

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
    const result: ItemType = createData(reqData, optFormData);
    setIsLoading(true);
    updateItem(result)
      .then((data) => {
        const itemsWithout = items.filter((item) => item._id !== data._id);
        setItems([...itemsWithout, data]);
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
              <OptionalInputs
                optFormData={optFormData}
                setOptFormData={setOptFormData}
              />
            </SimpleGrid>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default EditItem;
