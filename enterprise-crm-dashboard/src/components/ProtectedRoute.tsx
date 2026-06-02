import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="login" replace />;
};

export default ProtectedRoute;
