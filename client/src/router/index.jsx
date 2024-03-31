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
      },
      {
        path: "/:id",
        element: <SinglePage />,
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
      },
      {
        path: "/profile/update",
        element: <ProfileUpdatePage />,
      },
    ],
  },
]);

export default router;
