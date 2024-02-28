import {
  Card,
  Stack,
  CardBody,
  Heading,
  Image,
  Text,
  HStack,
  Tag,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
const CollectionContentItem = () => {
  return (
    <Box>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <HStack justifyContent={"space-between"} alignItems={"none"}>
              <Box>
                <Heading size="md">Terminator 2</Heading>

                <HStack py={2}>
                  <Tag>Action</Tag>
                  <Tag>Sci-fi</Tag>
                </HStack>
              </Box>

              <Box display={"flex"} justifyContent={"right"}>
                <IconButton
                  variant="ghost"
                  aria-label="Edit"
                  fontSize="20px"
                  icon={<FiEdit />}
                />
                <IconButton
                  variant="ghost"
                  aria-label="Delete"
                  fontSize="20px"
                  icon={<MdDeleteForever />}
                />
              </Box>
            </HStack>
            <Text py="2" textAlign={"justify"}>
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

export default CollectionContentItem;
