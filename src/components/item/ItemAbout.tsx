import {
  Box,
  Button,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { ItemType } from "../../types/types";
import LikeButton from "../LikeButton";

type ItemAboutProp = {
  item: ItemType;
  parentCollectionName: string;
};

const ItemAbout = ({ item, parentCollectionName }: ItemAboutProp) => {
  const tagsToArray = item?.tags.split(" ");
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
            <Text fontWeight={"bold"}>Collection: {parentCollectionName} </Text>
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
            Additional information:{" "}
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

      <VStack height={"200px"} justifyContent={"space-between"}>
        <Button
          variant={"outline"}
          colorScheme="white"
          as={Link}
          to={`/item/edit/${item._id}`}
          leftIcon={<FaEdit />}
        >
          Edit
        </Button>
        <LikeButton item={item} />
      </VStack>
      <Box
        border={"1px solid"}
        borderRadius={10}
        height={"200px"}
        width={"300px"}
      >
        <Text>Image</Text>
      </Box>
    </HStack>
  );
};

export default ItemAbout;
