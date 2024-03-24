import {
  Box,
  Button,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { ItemType } from "../../types/types";
import LikeButton from "../LikeButton";
import placeholderImage from "../../assets/placeholder.jpg";
import { useTranslation } from "react-i18next";

type ItemAboutProp = {
  item: ItemType;
  parentCollectionName: string;
};

const ItemAbout = ({ item, parentCollectionName }: ItemAboutProp) => {
  const tagsToArray = item?.tags.split(" ");
  const { t } = useTranslation();
  return (
    <HStack
      justifyContent={"space-between"}
      flexDirection={{ base: "column", md: "row" }}
      gap={10}
    >
      <VStack alignItems={"start"} spacing={5} width={{ base: "100%" }}>
        <HStack justifyContent={"space-between"} width={"100%"}>
          <Box>
            <Heading fontSize={"x-large"}>{item?.name}</Heading>
            <Text fontWeight={"bold"}>
              {t("item.collection")} {parentCollectionName}{" "}
            </Text>
          </Box>
        </HStack>
        <Text>{item?.description}</Text>
        <HStack>
          {tagsToArray?.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </HStack>
        <Box>
          <Text fontWeight={"bold"} mb={1}>
            {t("item.additionalInfo")}{" "}
          </Text>
          {item.fields.map((field, index) => {
            return (
              <HStack key={index}>
                <Text fontWeight={"bold"}>{field.fieldName}:</Text>
                <Text>{field.fieldValue}</Text>
              </HStack>
            );
          })}
        </Box>
      </VStack>

      <VStack height={"300px"} justifyContent={"space-between"}>
        <Button
          variant={"outline"}
          colorScheme="white"
          as={Link}
          to={`/item/edit/${item._id}`}
          leftIcon={<FaEdit />}
        >
          {t("tools.edit")}
        </Button>
        <LikeButton item={item} />
      </VStack>
      <Box width={"300px"}>
        <Image
          height={"300px"}
          width={"100%"}
          alt={item.name}
          objectFit="cover"
          objectPosition={item.image ? "0 0" : "center"}
          src={item.image !== "" ? item.image : placeholderImage}
        />
      </Box>
    </HStack>
  );
};

export default ItemAbout;
