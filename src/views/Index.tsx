import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const UserManagement = lazy(() => import("./userManagement/UserManagement"));

export const View = {
  Dashboard,
  UserManagement,
};
