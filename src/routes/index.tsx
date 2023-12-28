import { createBrowserRouter } from "react-router-dom";
import Home from "./App";
import Layout from "./Layout";
import ProtectedPage from "./ProtectedPage";
import Profile from "./Profile";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        element: <ProtectedPage />,
        path: "profile",
        children: [{ path: "/profile", element: <Profile /> }],
      },
    ],
  },
]);
