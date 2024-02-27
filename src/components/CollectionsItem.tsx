import { Card, CardBody, Heading, Button, Image } from "@chakra-ui/react";

const CollectionsItem = () => {
  return (
    <Card width={"100%"}>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Heading size="md" paddingY={5}>
          Movies
        </Heading>
        <Button size="sm" variant="solid" colorScheme="blue">
          Open
        </Button>
      </CardBody>
    </Card>
  );
};

export default CollectionsItem;
