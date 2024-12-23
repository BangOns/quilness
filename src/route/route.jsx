import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import Results from "../Pages/Result";
import Question from "../Pages/Question";
import Login from "../Pages/Login";
import Navbar from "../Components/Navbar";
import { ThisQuestions } from "../../Quest";
import { localStorageUser } from "../Utils/LocalStorage";

const route = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Navbar />,
        children: [
          {
            path: "/home/:id",
            element: <Home />,
          },
          {
            element: <PrivateRouteResult />,
            children: [
              {
                path: "/home/:id/results",
                element: <Results />,
              },
            ],
          },
        ],
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
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default function RootRouting() {
  return <RouterProvider router={route} />;
}
function PrivateRoute() {
  const user = localStorage.getItem("user");

  return user ? <Outlet /> : <Navigate to="/" />;
}
function PrivateRouteResult() {
  const UserLevelSuccess = localStorageUser();
  console.log(UserLevelSuccess);

  const LengthLevelSuccessUser = UserLevelSuccess.Level.filter(
    (items) => items.success
  )?.length;
  const isQuestionsCompleted = LengthLevelSuccessUser === ThisQuestions.length;

  return isQuestionsCompleted ? (
    <Outlet />
  ) : (
    <Navigate to={`/home/${UserLevelSuccess.name}`} />
  );
}
