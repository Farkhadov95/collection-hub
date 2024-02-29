import { HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <HStack>
      <Text as={Link} to={"/"} fontSize={20} fontWeight={"bold"}>
        CollectionHub
      </Text>
    </HStack>
  );
};

export default Logo;
