import { createBrowserRouter } from "react-router-dom";

// layout
import Layout from "../pages/layout/layout";
// pages
import HomePage from "../pages/home/home-page";
import ListPage from "../pages/list/list-page";
import SinglePage from "../pages/single/single-page";
import ProfilePage from "../pages/profile/profile-page";

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
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
