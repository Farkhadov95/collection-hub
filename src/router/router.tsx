import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Error from "../pages/Error";
import User from "../pages/User";
import Admin from "../pages/Admin";
import Collection from "../pages/Collection";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <User />,
    errorElement: <Error />,
  },
  {
    path: "/collection",
    element: <Collection />,
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <Error />,
  },
]);

export default router;
