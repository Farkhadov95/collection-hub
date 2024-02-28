import { Divider, Box } from "@chakra-ui/react";
import AdminTable from "../components/admin/AdminTable";
import Navbar from "../components/Navbar";

const Admin = () => {
  return (
    <Box padding={5}>
      <Navbar />
      <Divider />
      <AdminTable />
    </Box>
  );
};

export default Admin;
