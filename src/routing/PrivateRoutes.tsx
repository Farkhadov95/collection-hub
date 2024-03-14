import { Navigate, Outlet } from "react-router-dom";
import { useCollectionStore } from "../store/store";

const PrivateRoutes = () => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  if (currentUser._id === "") return <Navigate to={"/login"} />;
  return <Outlet />;
};

export default PrivateRoutes;
