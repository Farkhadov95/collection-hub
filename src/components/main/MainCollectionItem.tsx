import {
  Card,
  CardBody,
  Heading,
  Box,
  Image,
  Button,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

const MainCollectionItem = () => {
  //demo
  const collection = {
    _id: "65e6fb778112f0646144200a",
    userID: "1",
    name: "Terminator",
    description: "1,2,3",
    image: "",
    date: "2024-03-05T11:01:11.628Z",
    itemFields: [
      {
        fieldName: "Price",
        fieldType: "number",
        _id: "65e701108112f06461442031",
      },
      {
        fieldName: "Cast",
        fieldType: "text",
        _id: "65e7034c8112f06461442059",
      },
      {
        fieldName: "Oscars",
        fieldType: "text",
        _id: "65e708188112f06461442087",
      },
    ],
    __v: 0,
  };

  return (
    <Card maxW="md">
      <CardHeader>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Heading size="sm">{collection.name}</Heading>
            <Text>Created: {collection.name}</Text>
          </Box>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={IconButton}
                  size="sm"
                  isActive={isOpen}
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                />

                <MenuList>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Edit</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{collection.description}</Text>
      </CardBody>
      <Image
        objectFit="cover"
        src={
          collection.image === ""
            ? "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            : collection.image
        }
        alt="Chakra UI"
      />

      <CardFooter padding={2}>
        <Button
          as={Link}
          to={`/collections/${collection._id}`}
          flex="1"
          variant="ghost"
        >
          Open
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MainCollectionItem;
