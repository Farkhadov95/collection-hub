import { Box, Collapse, Text } from "@chakra-ui/react";
import { useNonPersistStore } from "../store/store";

const ErrorMessage = () => {
  const errorMessage = useNonPersistStore((state) => state.error);

  return (
    <Collapse
      in={errorMessage.length > 0}
      transition={{ enter: { duration: 0.5 } }}
    >
      <Box bgColor={"red.400"} textAlign={"center"} py={2}>
        <Text fontWeight={"bold"}>{errorMessage}</Text>
      </Box>
    </Collapse>
  );
};

export default ErrorMessage;
