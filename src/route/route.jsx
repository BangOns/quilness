import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import Ranked from "../Pages/Ranked";
import Question from "../Pages/Question";
import Login from "../Pages/Login";

const route = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/home/:id",
        element: <Home />,
      },
      {
        path: "/home/:id/rank",
        element: <Ranked />,
      },
      {
        path: "/quest/:id/:questid",
        element: <Question />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
]);

export default function RootRouting() {
  return <RouterProvider router={route} />;
}
function PrivateRoute() {
  const user = localStorage.getItem("user");

  return user ? <Outlet /> : <Navigate to="/" />;
}
