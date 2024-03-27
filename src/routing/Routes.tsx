import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import User from "../pages/User";
import Collection from "../pages/Collection";
import AddItem from "../pages/AddItem";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Layout from "./Layout";
import Item from "../pages/Item";
import Admin from "../pages/Admin";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import EditItem from "../pages/EditItem";
import AllCollections from "../pages/AllCollections";
import AllItems from "../pages/AllItems";
import SearchResults from "../pages/SearchResults";

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
        path: "collections/:id",
        element: <Collection />,
      },
      {
        path: "collections/all",
        element: <AllCollections />,
      },
      {
        path: "items/all",
        element: <AllItems />,
      },
      {
        path: "item/:id",
        element: <Item />,
      },
      {
        path: "search",
        element: <SearchResults />,
      },
      {
        path: "collections/:id/create",
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
        element: <AdminRoutes />,
        children: [
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "user",
            element: <User />,
          },
          {
            path: "item/edit/:id",
            element: <EditItem />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
