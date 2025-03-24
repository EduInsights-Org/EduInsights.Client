import { lazy } from "react";

const Dashboard = lazy(() => import("@views/dashboard/Dashboard"));
const UserManagement = lazy(
  () => import("@views/userManagement/UserManagement")
);
const ResultManagement = lazy(
  () => import("@views/resultManagement/ResultManagement")
);
const SubjectsAndSemestersManagement = lazy(
  () =>
    import(
      "@views/subjectsAndSemestersManagement/SubjectsAndSemestersManagement"
    )
);

export const View = {
  Dashboard,
  UserManagement,
  ResultManagement,
  SubjectsAndSemestersManagement,
};
