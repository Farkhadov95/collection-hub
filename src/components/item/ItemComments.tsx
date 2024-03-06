import { Box, Button, Heading, List, Textarea, VStack } from "@chakra-ui/react";
import ItemComment from "./ItemComment";

const ItemComments = () => {
  return (
    <Box>
      <Heading fontSize={"large"}>Comments:</Heading>
      <List marginY={5} spacing={2}>
        <ItemComment />
        <ItemComment />
        <ItemComment />
      </List>
      <VStack boxSizing={"border-box"} alignItems={"start"}>
        <Textarea name="comment" border={"1px solid"} />
        <Button variant={"outline"} colorScheme={"green"}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default ItemComments;
