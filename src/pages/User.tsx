import { Divider, Box } from "@chakra-ui/react";
import Collections from "../components/collections/Collections";
import Navbar from "../components/Navbar";

const User = () => {
  return (
    <Box padding={5}>
      <Navbar />
      <Divider />
      <Collections />
    </Box>
  );
};

export default User;
