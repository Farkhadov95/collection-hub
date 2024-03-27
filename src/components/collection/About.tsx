import { Heading, Image, Box, Flex } from "@chakra-ui/react";
import { Collection } from "../../types/types";
import placeholderImage from "../../assets/placeholder.jpg";
import Markdown from "react-markdown";

type AboutProp = {
  currentCollection: Collection;
};

const About = ({ currentCollection }: AboutProp) => {
  return (
    <Flex
      mt={{ base: 3, md: 0 }}
      height={"fit-content"}
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={{ base: "center", md: "space-between" }}
      alignItems={{ base: "center", md: "normal" }}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        width={"100%"}
        boxSizing={"border-box"}
        paddingRight={{ md: 10 }}
      >
        <Heading size={"lg"}>{currentCollection.name}</Heading>
        <Box
          width={"100%"}
          textAlign={"justify"}
          marginTop={{ base: 2, md: "none" }}
          marginBottom={{ base: 5, md: "none" }}
        >
          <Markdown>{currentCollection.description}</Markdown>
        </Box>
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
