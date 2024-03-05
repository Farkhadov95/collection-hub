import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import User from "../pages/User";
import Collection from "../pages/Collection";
import AddItem from "../pages/AddItem";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "collection/:id",
        element: <Collection />,
      },
      {
        path: "collection/:id/create",
        element: <AddItem />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
