import { useCollectionStore } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  if (!currentUser._id) return <Navigate to={"/login"} />;
  return <Outlet />;
};

export default PrivateRoutes;
