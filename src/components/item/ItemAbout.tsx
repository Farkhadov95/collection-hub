import {
  Box,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ItemType } from "../../types/types";
import LikeButton from "../LikeButton";
import placeholderImage from "../../assets/placeholder.jpg";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import { useCollectionStore } from "../../store/store";
import EditButton from "../buttons/EditButton";

type ItemAboutProp = {
  item: ItemType;
  parentCollectionName: string;
};

const ItemAbout = ({ item, parentCollectionName }: ItemAboutProp) => {
  const tagsToArray = item?.tags.split(" ");
  const { t } = useTranslation();
  const itemID = useParams().id;
  const items = useCollectionStore((state) => state.items);
  const currentItem = items?.find((c) => c._id === itemID);
  const currentUser = useCollectionStore((state) => state.currentUser);

  const isAuth = currentUser._id === currentItem?.userID || currentUser.isAdmin;

  return (
    <HStack
      width={"100%"}
      justifyContent={"space-between"}
      flexDirection={{ base: "column", md: "row" }}
      gap={10}
    >
      <VStack>
        <VStack alignItems={"start"} spacing={5}>
          <Box>
            <Heading fontSize={"x-large"}>{item?.name}</Heading>
            <Text fontWeight={"bold"}>
              {t("item.collection")} {parentCollectionName}{" "}
            </Text>
          </Box>
          <Box width={{ base: "250px", sm: "300px", lg: "600px", xl: "800px" }}>
            <Markdown>{item?.description}</Markdown>
          </Box>

          <HStack>
            {tagsToArray?.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </HStack>
          <Box>
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
      </VStack>

      <VStack width={"250px"} alignItems={"end"}>
        <Image
          height={"300px"}
          width={"100%"}
          alt={item.name}
          objectFit="cover"
          objectPosition={item.image ? "0 0" : "center"}
          src={item.image !== "" ? item.image : placeholderImage}
        />
        {isAuth && (
          <HStack
            justifyContent={"end"}
            border={"1px solid"}
            width={"100%"}
            boxSizing="border-box"
            paddingX={3}
            borderRadius={10}
          >
            <EditButton itemID={item._id} />
            <LikeButton item={item} />
          </HStack>
        )}
      </VStack>
    </HStack>
  );
};

export default ItemAbout;
