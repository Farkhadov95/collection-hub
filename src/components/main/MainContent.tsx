import { Stack, Box, Heading, Tag, SimpleGrid, HStack } from "@chakra-ui/react";
import MainCollectionItem from "./MainCollectionItem";

const MainContent = () => {
  return (
    <Stack
      borderRadius={10}
      boxSizing={"border-box"}
      padding={{ base: 0, md: 5 }}
      marginTop={5}
    >
      <HStack mb={{ base: 2, md: 5 }}>
        <Heading fontSize={{ base: "medium", md: "large" }}>
          Popular tags:{" "}
        </Heading>
        <HStack flexWrap={"wrap"}>
          <Tag fontSize={{ base: "small", md: "medium" }}>Sample Tag</Tag>
          <Tag fontSize={{ base: "small", md: "medium" }}>Sample Tag</Tag>
          <Tag fontSize={{ base: "small", md: "medium" }}>Sample Tag</Tag>
          <Tag fontSize={{ base: "small", md: "medium" }}>Sample Tag</Tag>
          <Tag fontSize={{ base: "small", md: "medium" }}>Sample Tag</Tag>
        </HStack>
      </HStack>
      <Box>
        <Heading fontSize={{ base: "medium", md: "large" }}>
          Top 5 largest Collections:{" "}
        </Heading>
        <SimpleGrid
          marginY={{ base: 2, md: 5 }}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={5}
        >
          <MainCollectionItem />
          <MainCollectionItem />
          <MainCollectionItem />
          <MainCollectionItem />
          <MainCollectionItem />
        </SimpleGrid>
      </Box>
      <Box>
        <Heading fontSize={{ base: "medium", md: "large" }}>
          Latest Collections:
        </Heading>
        <SimpleGrid
          marginY={{ base: 2, md: 5 }}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={5}
        >
          <MainCollectionItem />
          <MainCollectionItem />
          <MainCollectionItem />
          <MainCollectionItem />
          <MainCollectionItem />
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default MainContent;
