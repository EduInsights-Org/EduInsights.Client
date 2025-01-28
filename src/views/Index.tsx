import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const UserManagement = lazy(() => import("./userManagement/UserManagement"));
const ResultManagement = lazy(
  () => import("./resultManagement/ResultManagement")
);

export const View = {
  Dashboard,
  UserManagement,
  ResultManagement,
};
