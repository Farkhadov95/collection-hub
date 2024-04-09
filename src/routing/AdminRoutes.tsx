import { useUserStore } from "../store/userStore";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "./Routes";

const AdminRoutes = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  if (!currentUser.isAdmin) return <Navigate to={routes.main} />;
  return <Outlet />;
};

export default AdminRoutes;
