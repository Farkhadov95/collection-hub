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
import { useTranslation } from "react-i18next";

const AddCollectionCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const collections = useCollectionStore((state) => state.collections);
  const userCollections = useCollectionStore((state) => state.userCollections);

  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();
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
        <Text paddingLeft={1}>{t("tools.create")}</Text>
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              {t("collection.createNew")}
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
                    placeholder="Select topic"
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
                {t("tools.submit")}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
};

export default AddCollectionCard;
