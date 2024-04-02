import { createBrowserRouter } from "react-router-dom";

// layout
import { Layout, RequireAuth } from "../pages/layout/layout";

// pages
import HomePage from "../pages/home/home-page";
import ListPage from "../pages/list/list-page";
import SinglePage from "../pages/single/single-page";
import ProfilePage from "../pages/profile/profile-page";
import LoginPage from "../pages/login/login-page";
import RegisterPage from "../pages/register/register-page";
import ProfileUpdatePage from "../pages/update/profile-update";
import NewPostPage from "../pages/newpost/newpost-page";

// loaders

import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "../lib/loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/list",
        element: <ListPage />,
        loader: listPageLoader,
      },
      {
        path: "/:id",
        element: <SinglePage />,
        loader: singlePageLoader,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: profilePageLoader,
      },
      {
        path: "/profile/update",
        element: <ProfileUpdatePage />,
      },
      {
        path: "/add",
        element: <NewPostPage />,
      },
    ],
  },
]);

export default router;
