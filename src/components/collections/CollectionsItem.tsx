import {
  Card,
  CardBody,
  Heading,
  Button,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Collection } from "../../store/store";

type CollectionsItemProp = {
  collection: Collection;
};

const CollectionsItem = ({ collection }: CollectionsItemProp) => {
  return (
    <Card width={"100%"}>
      <CardBody padding={"0"}>
        <Image
          src={
            collection.image === ""
              ? "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              : collection.image
          }
          alt={collection.name}
          borderTopRadius={"lg"}
        />
        <HStack justifyContent={"space-between"} padding={5}>
          <Heading size={{ base: "sm", md: "md" }}>{collection.name}</Heading>
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
