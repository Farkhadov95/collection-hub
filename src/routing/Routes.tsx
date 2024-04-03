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

export const routes = {
  main: "/",
  collection: "collections/:id",
  AllCollections: "collections/all",
  AllItems: "items/all",
  item: "item/:id",
  search: "search",
  addItem: "collections/:id/create",
  login: "login",
  signup: "signup",
  admin: "admin",
  user: "user",
  editItem: "item/edit/:id",
};

const router = createBrowserRouter([
  {
    path: routes.main,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: routes.collection,
        element: <Collection />,
      },
      {
        path: routes.AllCollections,
        element: <AllCollections />,
      },
      {
        path: routes.AllItems,
        element: <AllItems />,
      },
      {
        path: routes.item,
        element: <Item />,
      },
      {
        path: routes.search,
        element: <SearchResults />,
      },
      {
        path: routes.addItem,
        element: <AddItem />,
      },
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: routes.signup,
        element: <SignUp />,
      },
      {
        element: <AdminRoutes />,
        children: [
          {
            path: routes.admin,
            element: <Admin />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: routes.user,
            element: <User />,
          },
          {
            path: routes.editItem,
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
