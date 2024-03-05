import {
  Box,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Stack,
  SimpleGrid,
  FormControl,
  VStack,
  Divider,
  HStack,
  Button,
  Badge,
  Checkbox,
} from "@chakra-ui/react";
import ImageUpload from "../components/collection/ImageUpload";
import { useCollectionStore } from "../store/store";
import { useParams, useNavigate } from "react-router-dom";

const AddItem = () => {
  const collectionID = useParams().id;
  const collections = useCollectionStore((state) => state.collections);
  const collection = collections.find((c) => c._id === collectionID);
  const navigate = useNavigate();

  return (
    <Box padding={{ base: 2, md: 5 }} mt={{ base: 2, md: 0 }}>
      <HStack justifyContent={"space-between"}>
        <Heading size="lg">Add New Item</Heading>
        <HStack spacing={3}>
          <Button onClick={() => navigate(-1)} variant={"outline"}>
            Back
          </Button>
          <Button type="submit" variant={"outline"} colorScheme="green">
            Save
          </Button>
        </HStack>
      </HStack>
      <Box>
        <Stack spacing={5} mt={5}>
          <Heading fontSize={"large"}>Required fields:</Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <VStack spacing={2}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder="First name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="tags">Tags</FormLabel>
                <Input id="tags" placeholder="Please enter your tags" />
              </FormControl>
            </VStack>

            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  display={"block"}
                  height={"120px"}
                  width={"100%"}
                  verticalAlign={"top"}
                  id="desc"
                />
              </FormControl>
            </Box>
          </SimpleGrid>
        </Stack>

        <Divider my={5} />

        <Stack spacing={5}>
          <Heading fontSize={"large"}>Optional fields:</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            <ImageUpload />
            {collection?.itemFields.map((item) => {
              return (
                <FormControl key={item._id}>
                  {item.fieldType === "checkbox" ? (
                    <Checkbox padding={2} width={"100%"}>
                      {item.fieldName}
                    </Checkbox>
                  ) : (
                    <>
                      <FormLabel alignItems={"center"}>
                        <Badge colorScheme="green" fontSize={"2xs"} mr={1}>
                          {item.fieldType}
                        </Badge>
                        {item.fieldName}
                      </FormLabel>
                      <Input
                        type={item.fieldType}
                        placeholder={item.fieldName}
                      />
                    </>
                  )}
                </FormControl>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddItem;
