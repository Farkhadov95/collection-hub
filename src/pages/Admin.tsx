import { useEffect } from "react";
import AdminTable from "../components/admin/AdminTable";

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <AdminTable />;
};

export default Admin;
