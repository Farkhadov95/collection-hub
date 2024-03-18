import {
  Text,
  HStack,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import moment from "moment";
import { Comment } from "../../services/comment";

type ItemCommentProp = {
  comment: Comment;
};

const ItemComment = ({ comment }: ItemCommentProp) => {
  const createdTime = comment.createdAt;
  const formattedTime = moment(createdTime).format("LL");

  console.log(comment);

  return (
    <AccordionItem>
      <AccordionButton>
        <HStack
          as="span"
          flex="1"
          textAlign="left"
          fontSize={"small"}
          fontWeight={"bold"}
          justifyContent={"space-between"}
          paddingEnd={5}
        >
          <Text>{comment.username}</Text>
          <Text fontSize={"smaller"}>{formattedTime}</Text>
        </HStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>{comment.comment}</AccordionPanel>
    </AccordionItem>
  );
};

export default ItemComment;
