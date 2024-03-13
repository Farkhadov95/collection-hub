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
import { BiLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ItemType } from "../../types/types";
import { Link } from "react-router-dom";
import { useCollectionStore } from "../../store/store";

type ItemProps = {
  item: ItemType;
};

const ItemCard = ({ item }: ItemProps) => {
  const collections = useCollectionStore((state) => state.collections);
  const collection = collections.find(
    (collection) => collection._id === item.collectionID
  );

  if (!item) {
    return <div>Loading...</div>;
  }

  const tagsToArray = (item.tags ?? "").split(" ");

  return (
    <Box>
      <Card maxW="md">
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Heading size="sm">{item.name}</Heading>
              <Text fontWeight={"bold"} fontSize={"small"}>
                Collection: {collection?.name}
              </Text>
              <HStack mt={2} spacing={1} flexWrap={"wrap"}>
                {tagsToArray[0] !== ""
                  ? tagsToArray
                      .slice(0, 3)
                      .map((tag: string, index) => <Tag key={index}>{tag}</Tag>)
                  : null}
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
        <CardBody paddingTop={0}>
          <Text maxHeight={"50px"} overflow={"hidden"}>
            {item.description.length > 50
              ? item.description.slice(0, 50).concat("  ...")
              : item.description}
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
          <Button
            as={Link}
            to={`/item/${item._id}`}
            flex="1"
            variant="outline"
            colorScheme="green"
          >
            Open
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default ItemCard;
