import { lazy } from "react";

const Dashboard = lazy(() => import("@views/dashboard/Dashboard"));
const UserManagement = lazy(
  () => import("@views/userManagement/UserManagement")
);
const ResultManagement = lazy(
  () => import("@views/resultManagement/ResultManagement")
);

export const View = {
  Dashboard,
  UserManagement,
  ResultManagement,
};
