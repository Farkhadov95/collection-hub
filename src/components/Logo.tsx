import { HStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <HStack>
      <Text as={NavLink} to={"/"} fontSize={20} fontWeight={"bold"}>
        CollectionHub
      </Text>
    </HStack>
  );
};

export default Logo;
