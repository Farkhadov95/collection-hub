import { useCollectionStore } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  if (!currentUser.isAdmin) return <Navigate to={"/"} />;
  return <Outlet />;
};

export default AdminRoutes;
