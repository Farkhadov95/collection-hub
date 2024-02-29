import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import User from "../pages/User";
import Collection from "../pages/Collection";
import CreateCollectable from "../components/collection/CreateCollectable";
import Layout from "./layout";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

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
        path: "collection",
        element: <Collection />,
      },
      {
        path: "create",
        element: <CreateCollectable />,
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
