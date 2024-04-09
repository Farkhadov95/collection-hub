import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/store";
import { routes } from "./Routes";

const PrivateRoutes = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  if (currentUser._id === "") return <Navigate to={`/${routes.login}`} />;
  return <Outlet />;
};

export default PrivateRoutes;
