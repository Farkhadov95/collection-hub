import { Divider } from "@chakra-ui/react";
import AdminTable from "../components/admin/AdminTable";
import Navbar from "../components/Navbar";

const Admin = () => {
  return (
    <>
      <Navbar />
      <Divider />
      <AdminTable />
    </>
  );
};

export default Admin;
