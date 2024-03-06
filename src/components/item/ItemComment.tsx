import {
  ListItem,
  ListIcon,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdCheckCircle } from "react-icons/md";

const ItemComment = () => {
  const [commentClose, setCommentClose] = useState(true);
  const { colorMode } = useColorMode();
  return (
    <ListItem
      boxSizing={"border-box"}
      backgroundColor={colorMode === "dark" ? "gray.700" : "gray.100"}
      borderRadius={10}
      height={commentClose ? "60px" : "auto"}
      padding={2}
      overflow={"hidden"}
      display={"flex"}
      gap={{ base: 1, md: 2 }}
    >
      <ListIcon as={MdCheckCircle} color="green.500" height={"40px"} />
      <Text fontSize={{ base: "smaller", sm: "medium" }} textAlign={"left"}>
        1Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum
        dolor sit amet, consectetur adipisicing elit 2Lorem ipsum dolor sit
        amet, consectetur adipisicing elit Lorem ipsum dolor sit amet,
        consectetur adipisicing elit 3Lorem ipsum dolor sit amet, consectetur
        adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing
        elit 4Lorem ipsum dolor sit amet, consectetur adipisicing elit 5Lorem
        ipsum dolor sit amet, consectetur adipisicing elit 1Lorem ipsum dolor
        sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet,
        consectetur adipisicing elit 2Lorem ipsum dolor sit amet, consectetur
        adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing
        elit 3Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem
        ipsum dolor sit amet, consectetur adipisicing elit 4Lorem ipsum dolor
        sit amet, consectetur adipisicing elit 5Lorem ipsum dolor sit amet,
        consectetur adipisicing elit
      </Text>
      <IconButton
        aria-label={"expand"}
        variant={"ghost"}
        icon={commentClose ? <IoIosArrowDown /> : <IoIosArrowUp />}
        onClick={() => setCommentClose(!commentClose)}
      />
    </ListItem>
  );
};

export default ItemComment;
