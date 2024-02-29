import { Divider, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box padding={5}>
      <Navbar />
      <Divider />
      <Outlet />
    </Box>
  );
};

export default Layout;
