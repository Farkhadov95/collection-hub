import { HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <HStack>
      <Text
        as={Link}
        to={"/"}
        fontSize={20}
        fontWeight={"bold"}
        bgGradient="linear(to-r, green.300, yellow.300)"
        bgClip="text"
      >
        CollectionHub
      </Text>
    </HStack>
  );
};

export default Logo;
