import {
  Text,
  HStack,
  Box,
  Card,
  CardBody,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import moment from "moment";
import { Comment } from "../../types/comment";

type ItemCommentProp = {
  comment: Comment;
};

const ItemComment = ({ comment }: ItemCommentProp) => {
  const createdTime = comment.createdAt;
  const formattedTime = moment(createdTime).fromNow();
  const { colorMode } = useColorMode();

  return (
    <Card bgColor={colorMode === "dark" ? "gray.600" : "gray.300"}>
      <CardBody>
        <Box>
          <HStack spacing={3} alignItems={"baseline"}>
            <Heading size="s" textTransform="uppercase">
              {comment.username}
            </Heading>
            <Text fontWeight={"bold"} fontSize={"x-small"} color={"gray.300"}>
              {formattedTime}
            </Text>
          </HStack>
          <Text pt="2" fontSize="sm">
            {comment.comment}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ItemComment;
