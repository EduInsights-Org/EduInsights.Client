import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "../pages/404";
import { getActiveRoutesV2, routes } from "../route";
import { RequestState, Role } from "@utils/enums";
import Layout from "../layout/Layout";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { RootState, useAppSelector } from "../slices/store";
import PreLoader from "../components/PreLoader";
import useOnlineStatus from "@/hooks/useOnlineStatus";

const roles: Role[] = [Role.SuperAdmin];

const AppHandler: React.FC = () => {
  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  const instituteStatus = useAppSelector(
    (state: RootState) => state.institute.status
  );

  useOnlineStatus();

  const router = createBrowserRouter([
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/",
          element: <Layout />,
          errorElement: <Error />,
          children: getActiveRoutesV2(routes, roles),
        },
      ],
    },
    {
      element: <PublicRoute />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  const isLoading = (): boolean => {
    return (
      authStatus === RequestState.LOADING ||
      instituteStatus === RequestState.LOADING
    );
  };

  if (isLoading()) return <PreLoader />;

  return <RouterProvider router={router} />;
};

export default AppHandler;
