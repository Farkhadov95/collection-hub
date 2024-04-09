import {
  Box,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { ItemType } from "../../types/item";
import LikeButton from "../LikeButton";
import placeholderImage from "../../assets/placeholder.jpg";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import { useCollectionStore } from "../../store/collectionStore";
import { useItemStore } from "../../store/itemStore";
import { useUserStore } from "../../store/userStore";
import EditButton from "../buttons/EditButton";

type ItemAboutProp = {
  item: ItemType;
  parentCollectionName: string;
};

const ItemAbout = ({ item, parentCollectionName }: ItemAboutProp) => {
  const tagsToArray = item?.tags.split(" ");
  const { t } = useTranslation();
  const itemID = useParams().id;
  const items = useItemStore((state) => state.items);
  const collections = useCollectionStore((state) => state.collections);
  const currentItem = items?.find((c) => c._id === itemID);
  const currentUser = useUserStore((state) => state.currentUser);

  const isAuth = currentUser._id === currentItem?.userID || currentUser.isAdmin;
  const collection = collections.find(
    (collection) => collection._id === item.collectionID
  );

  return (
    <>
      <Flex
        mt={{ base: 3, md: 0 }}
        height={"fit-content"}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems={{ base: "center", md: "normal" }}
      >
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          width={"100%"}
          boxSizing={"border-box"}
          paddingRight={{ md: 10 }}
        >
          <Box>
            <HStack
              justifyContent={"space-between"}
              alignItems={{ base: "flex-start", sm: "center" }}
            >
              <Box>
                <Heading fontSize={"x-large"} mb={1}>
                  {item?.name}
                </Heading>
              </Box>
              {isAuth && (
                <HStack
                  width={"fit-content"}
                  justifyContent={"end"}
                  boxSizing="border-box"
                  paddingX={3}
                  borderRadius={10}
                >
                  <EditButton itemID={item._id} />
                  <LikeButton item={item} />
                </HStack>
              )}
            </HStack>
            <Text
              as={Link}
              to={`/collections/${collection?._id}`}
              fontWeight={"bold"}
              mb={1}
              _hover={{
                color: "green.200",
              }}
            >
              {t("item.collection")} {parentCollectionName}{" "}
            </Text>
          </Box>
          <VStack alignItems={"start"} spacing={5}>
            <Box
              width={"100%"}
              textAlign={"justify"}
              marginTop={{ base: 2, md: "none" }}
              marginBottom={{ base: 5, md: "none" }}
            >
              <Markdown>{item?.description}</Markdown>
            </Box>
            <HStack>
              {tagsToArray?.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </HStack>
            <Box mb={{ base: 5, md: 0 }}>
              <Text fontWeight={"bold"} mb={1}>
                {t("item.additionalInfo")}{" "}
              </Text>
              {item.fields.map((field, index) => (
                <HStack key={index}>
                  <Text fontWeight={"bold"}>{field.fieldName}:</Text>
                  <Text>{field.fieldValue}</Text>
                </HStack>
              ))}
            </Box>
          </VStack>
        </Flex>
        <Box width={"250px"}>
          <Image
            height={"300px"}
            width={"100%"}
            alt={item.name}
            objectFit="cover"
            objectPosition={item.image ? "0 0" : "center"}
            src={item.image !== "" ? item.image : placeholderImage}
          />
        </Box>
      </Flex>
    </>
  );
};

export default ItemAbout;
