import { useAppSelector } from "@slices/store";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const auth = useAppSelector((state) => state.auth);

  return auth.isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
