import { Heading, Box, Badge, HStack } from "@chakra-ui/react";
import CollectionsContainer from "../components/collection-card/CollectionsContainer";
import { useCollectionStore } from "../store/store";

const User = () => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  return (
    <Box padding={5}>
      <HStack
        mb={5}
        boxSizing={"border-box"}
        padding={5}
        display={"flex"}
        bgColor={"gray.700"}
        borderRadius={10}
      >
        <Heading fontSize={"xx-large"}>Hello, {currentUser.username}</Heading>
        <Badge colorScheme="green" fontSize={"2xs"} height={"fit-content"}>
          {currentUser.isAdmin ? "Admin" : ""}
        </Badge>
      </HStack>
      <CollectionsContainer />
    </Box>
  );
};

export default User;
