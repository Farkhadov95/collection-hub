import { Heading, Text, Image, Box, Flex } from "@chakra-ui/react";
import { Collection } from "../../types/types";
import placeholderImage from "../../assets/placeholder.jpg";

type AboutProp = {
  currentCollection: Collection;
};

const About = ({ currentCollection }: AboutProp) => {
  return (
    <Flex
      height={{ base: "400px", sm: "350px", md: "300px" }}
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
      <Box width={"300px"}>
        <Image
          height={"300px"}
          width={"100%"}
          alt={currentCollection.name}
          objectFit="cover"
          objectPosition={currentCollection.image ? "0 0" : "center"}
          src={
            currentCollection.image !== ""
              ? currentCollection.image
              : placeholderImage
          }
        />
      </Box>
    </Flex>
  );
};

export default About;
