import {
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  Box,
  IconButton,
  Button,
  CardFooter,
  CardHeader,
  Flex,
  Tag,
  HStack,
} from "@chakra-ui/react";
import { BiLike, BiChat } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const Item = () => {
  return (
    <Box>
      <Card maxW="md">
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Heading size="sm">Terminator 2</Heading>
              <HStack mt={2} spacing={1}>
                <Tag>Sci-fi</Tag>
                <Tag>Action</Tag>
              </HStack>
            </Box>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            With Chakra UI, I wanted to sync the speed of development with the
            speed of design. I wanted the developer to be just as excited as the
            designer to create a screen.
          </Text>
        </CardBody>
        <Image
          objectFit="cover"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Chakra UI"
        />

        <CardFooter justify="space-between">
          <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
            Like
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
            Comment
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default Item;