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
  IconButton,
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { updateCollection } from "../../services/collection";
import { useCollectionStore } from "../../store/store";
import useErrorHandler from "../../hooks/useError";
import { Collection, collectionFormData } from "../../types/types";
import { useForm } from "react-hook-form";
import { convertToBase64 } from "../../utils";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";

type EditCollectionCard = {
  collection: Collection;
  isCard?: boolean;
};

const EditCollectionCard = ({
  collection,
  isCard = true,
}: EditCollectionCard) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);
  const collections = useCollectionStore((state) => state.collections);
  const userCollections = useCollectionStore((state) => state.userCollections);
  const setCollections = useCollectionStore((state) => state.setCollections);
  const setUserCollections = useCollectionStore(
    (state) => state.setUserCollections
  );
  const biggestCollections = useCollectionStore(
    (state) => state.biggestCollections
  );
  const setBiggestCollections = useCollectionStore(
    (state) => state.setBiggestCollections
  );

  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();
  const [postImage, setPostImage] = useState({ myFile: collection?.image });

  const form = useForm<collectionFormData>({
    defaultValues: {
      topic: collection.topic,
      name: collection.name,
      description: collection.description,
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
      image: postImage.myFile,
      itemFields: collection.itemFields,
      createdAt: collection.createdAt,
    };
    return result;
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setPostImage({ myFile: base64 as string });
    }
  };

  const onSubmit = (data: collectionFormData) => {
    const result = createData(data);
    updateCollection(result)
      .then((data) => {
        const cleanCollections = collections.filter((c) => c._id !== data._id);
        const cleanUserCollections = userCollections.filter(
          (c) => c._id !== data._id
        );
        const cleanBiggestCollections = biggestCollections.filter(
          (c) => c._id !== data._id
        );
        setCollections([...cleanCollections, data]);
        setUserCollections([...cleanUserCollections, data]);
        setBiggestCollections([...cleanBiggestCollections, data]);
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
    onClose();
  };

  return (
    <>
      {isCard ? (
        <Text display={"block"} width={"100%"} onClick={onOpen}>
          {t("tools.edit")}
        </Text>
      ) : (
        <IconButton
          aria-label="Edit"
          variant={"ghost"}
          colorScheme="white"
          icon={<FaEdit />}
          onClick={onOpen}
        />
      )}

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
            <DrawerHeader borderBottomWidth="1px">
              {t("collection.editCollectionTitle")}
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <FormControl isRequired>
                  <FormLabel>{t("collectionTopic.topic")}</FormLabel>
                  <Select
                    {...register("topic", {
                      required: {
                        value: true,
                        message: "Please select topic",
                      },
                    })}
                    placeholder={t("collectionTopic.selectTopic")}
                  >
                    <option value="books">{t("collectionTopic.books")}</option>
                    <option value="movies">
                      {t("collectionTopic.movies")}
                    </option>
                    <option value="music">{t("collectionTopic.music")}</option>
                    <option value="games">{t("collectionTopic.games")}</option>
                    <option value="sport">{t("collectionTopic.sport")}</option>
                    <option value="science">
                      {t("collectionTopic.science")}
                    </option>
                    <option value="art">{t("collectionTopic.art")}</option>
                    <option value="history">
                      {t("collectionTopic.history")}
                    </option>
                    <option value="other">{t("collectionTopic.other")}</option>
                  </Select>
                  <Text ml={"auto"} fontSize={"small"} color={"red.300"} px="2">
                    {errors.topic?.message}
                  </Text>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="username">
                    {t("collection.selectName")}
                  </FormLabel>
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
                  <FormLabel htmlFor="desc">
                    {t("collection.description")}
                  </FormLabel>
                  <Textarea
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Please enter description",
                      },
                      maxLength: {
                        value: 500,
                        message: "Maximum length - 500 characters",
                      },
                    })}
                    id="desc"
                  />
                  <Text ml={"auto"} fontSize={"small"} color={"red.300"} px="2">
                    {errors.description?.message}
                  </Text>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="image">{t("collection.image")}</FormLabel>
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
                {t("tools.cancel")}
              </Button>
              <Button type="submit" colorScheme="green">
                {t("tools.update")}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
};

export default EditCollectionCard;
