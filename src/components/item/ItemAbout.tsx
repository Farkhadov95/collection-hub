import { Box, Heading, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import { ItemType } from "../../types/types";

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
    >
      <VStack
        alignItems={"start"}
        spacing={5}
        width={{ base: "100%", md: "70%" }}
      >
        <Box>
          <Heading fontSize={"x-large"}>{item?.name}</Heading>
          <Text fontWeight={"bold"}>Collection: {parentCollectionName} </Text>
        </Box>
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
