import { useAppSelector } from "../slices/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = useAppSelector((state) => state.auth);

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
