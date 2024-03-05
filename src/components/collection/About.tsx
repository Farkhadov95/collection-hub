import { Heading, Text, Image, Box, Flex } from "@chakra-ui/react";
import { Collection } from "../../store/store";

type AboutProp = {
  currentCollection: Collection;
};

const About = ({ currentCollection }: AboutProp) => {
  return (
    <Flex
      height={{ base: "400px", sm: "350px", md: "200px" }}
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={{ base: "center", md: "space-between" }}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"space-around"}
        width={"100%"}
        boxSizing={"border-box"}
        paddingRight={{ md: 10 }}
      >
        <Heading size={"lg"}>{currentCollection.name}</Heading>
        <Text
          width={"100%"}
          textAlign={"justify"}
          marginTop={{ base: 2, md: "none" }}
          marginBottom={{ base: 5, md: "none" }}
        >
          {currentCollection.description}
        </Text>
      </Flex>
      <Box>
        <Image
          margin={"auto"}
          width={"300px"}
          height={"200px"}
          overflow={"hidden"}
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
      </Box>
    </Flex>
  );
};

export default About;
