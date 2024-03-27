import { Divider, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useNonPersistStore } from "../store/store";
import Footer from "../components/Footer";

const Layout = () => {
  const error = useNonPersistStore((state) => state.error);
  const location = useLocation();
  const { pathname } = location;

  return (
    <Box padding={5} width={{ base: "100%", xl: "80%" }} margin={"auto"}>
      <Navbar />
      <Divider />
      {error && <ErrorMessage />}
      <Outlet />
      {pathname !== "/login" && pathname !== "/signup" && (
        <>
          <Divider mt={5} />
          <Footer />
        </>
      )}
    </Box>
  );
};

export default Layout;
