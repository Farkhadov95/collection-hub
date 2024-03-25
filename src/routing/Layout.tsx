import { Divider, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useNonPersistStore } from "../store/store";

const Layout = () => {
  const error = useNonPersistStore((state) => state.error);

  return (
    <Box padding={5} width={{ base: "100%", xl: "80%" }} margin={"auto"}>
      <Navbar />
      <Divider />
      {error && <ErrorMessage />}
      <Outlet />
    </Box>
  );
};

export default Layout;
