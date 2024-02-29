import {
  Card,
  Stack,
  CardBody,
  HStack,
  Heading,
  Tag,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";

const MainCollectionItem = () => {
  return (
    <Box>
      <Card direction={"column"} overflow="hidden" variant="outline">
        <Image
          objectFit="cover"
          maxW={{ base: "100%" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <HStack justifyContent={"space-between"} alignItems={"none"}>
              <Box>
                <Heading size={{ base: "sm", md: "md" }}>Terminator 2</Heading>

                <HStack py={2}>
                  <Tag>Action</Tag>
                  <Tag>Sci-fi</Tag>
                </HStack>
              </Box>
            </HStack>
            <Text textAlign={"justify"} fontSize={{ base: "small" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              minus ullam molestiae quos perspiciatis veniam quibusdam
              perferendis ducimus inventore debitis culpa earum, cumque labore
              illo velit quisquam laudantium numquam ipsam.
            </Text>
          </CardBody>
        </Stack>
      </Card>
    </Box>
  );
};

export default MainCollectionItem;
