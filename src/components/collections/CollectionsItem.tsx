import {
  Card,
  CardBody,
  Heading,
  Button,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CollectionsItem = () => {
  return (
    <Card width={"100%"}>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <HStack justifyContent={"space-between"} marginTop={5}>
          <Heading size="md">Movies</Heading>
          <Button
            as={Link}
            to={"/collection"}
            size="sm"
            variant="outline"
            colorScheme="teal"
          >
            Open
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CollectionsItem;
