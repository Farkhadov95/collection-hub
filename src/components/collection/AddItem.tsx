import {
  Box,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Stack,
  Select,
  SimpleGrid,
  FormControl,
  Checkbox,
  VStack,
  Divider,
  HStack,
  Button,
} from "@chakra-ui/react";
import ImageUpload from "./ImageUpload";

const AddItem = () => {
  return (
    <Box padding={{ base: 2, md: 5 }} mt={{ base: 2, md: 0 }}>
      <HStack justifyContent={"space-between"}>
        <Heading size="lg">Add New Collectable</Heading>
        <Button type="submit" variant={"outline"} colorScheme="green">
          Save
        </Button>
      </HStack>
      <Box>
        <Stack spacing={5} mt={5}>
          <Heading fontSize={"large"}>Required fields:</Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <VStack spacing={2}>
              <FormControl isRequired>
                <FormLabel>Topic</FormLabel>
                <Select placeholder="Select topic">
                  <option value="option1">Books</option>
                  <option value="option2">Movies</option>
                  <option value="option3">Coins</option>
                  <option value="option3">Music</option>
                  <option value="option3">Games</option>
                </Select>
              </FormControl>

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
                  height={"200px"}
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
            <VStack spacing={2}>
              <Box width={"100%"} mb={10}>
                <ImageUpload />
              </Box>
              <FormControl>
                <FormLabel>Author:</FormLabel>
                <Input type="text" placeholder="Ivan Ivanov" />
              </FormControl>
              <FormControl>
                <FormLabel>Director:</FormLabel>
                <Input type="text" placeholder="Ivan Ivanov" />
              </FormControl>
              <FormControl>
                <FormLabel>Country of Origin:</FormLabel>
                <Input type="text" placeholder="Uzbekistan" />
              </FormControl>
            </VStack>

            <VStack spacing={2}>
              <FormControl>
                <FormLabel htmlFor="syn">Synopsis:</FormLabel>
                <Textarea id="syn" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="hist">Historical Background:</FormLabel>
                <Textarea id="hist" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="plot">Plot Summary:</FormLabel>
                <Textarea id="plot" />
              </FormControl>
            </VStack>

            <Box>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2}>
                <VStack>
                  <FormControl>
                    <FormLabel>Page Count:</FormLabel>
                    <Input type="number" placeholder="0" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Page Count:</FormLabel>
                    <Input type="number" placeholder="0" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Monetary Value:</FormLabel>
                    <Input type="number" placeholder="0" />
                  </FormControl>
                </VStack>

                <VStack spacing={2}>
                  <FormControl>
                    <FormLabel>Release Date:</FormLabel>
                    <Input type="date" placeholder="YYYY" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Publication Date:</FormLabel>
                    <Input type="date" placeholder="YYYY" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Acquisition Date:</FormLabel>
                    <Input type="date" placeholder="YYYY" />
                  </FormControl>
                </VStack>
              </SimpleGrid>

              <HStack
                mt={10}
                spacing={5}
                borderRadius={10}
                width={"fit-content"}
                alignItems={"start"}
                flexWrap={"wrap"}
              >
                <Checkbox fontWeight={"semi-bold"}>
                  Is Collector's Edition?
                </Checkbox>
                <Checkbox fontWeight={"semi-bold"}>Is Rare?</Checkbox>
                <Checkbox fontWeight={"semi-bold"}>In Good Condition?</Checkbox>
              </HStack>
            </Box>
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddItem;
