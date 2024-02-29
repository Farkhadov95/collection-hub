import { Box, Divider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import MainContent from "../components/main/MainContent";

const Main = () => {
  return (
    <Box padding={5}>
      <Navbar />
      <Divider />
      <MainContent />
    </Box>
  );
};

export default Main;
