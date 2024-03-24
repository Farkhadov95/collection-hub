import { Box, Text } from "@chakra-ui/react";
import { useNonPersistStore } from "../store/store";

const ErrorMessage = () => {
  const errorMessage = useNonPersistStore((state) => state.error);
  return (
    <Box bgColor={"red.300"} textAlign={"center"} py={2}>
      <Text fontWeight={"bold"}>{errorMessage}</Text>
    </Box>
  );
};

export default ErrorMessage;
