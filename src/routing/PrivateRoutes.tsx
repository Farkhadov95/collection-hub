import { Navigate, Outlet } from "react-router-dom";
import { useCollectionStore } from "../store/store";
import { routes } from "./Routes";

const PrivateRoutes = () => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  if (currentUser._id === "") return <Navigate to={`/${routes.login}`} />;
  return <Outlet />;
};

export default PrivateRoutes;
