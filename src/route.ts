import * as React from "react";
import { NonIndexRouteObject } from "react-router-dom";
import { View } from "@views/Index";
import { isIncludedRole } from "@utils/utils";
import { Role } from "@utils/types";
import {
  DashboardIcon,
  AnalyticsIcon,
  AuditLogsIcon,
  ResultManagementIcon,
  SettingsIcon,
  UserManagementIcon,
} from "@components/icons";

export interface RouteObjectWithRole extends NonIndexRouteObject {
  allowRoles: Role[];
  icons:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
    | undefined;
  text: string;
  children?: RouteObjectWithRole[];
  bottomNav?: boolean;
}

interface RouteDetail {
  path: string;
  allowRoles: Role[];
  icons:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
    | undefined;
  text: string;
  bottomNav?: boolean;
}

export const routes: RouteObjectWithRole[] = [
  {
    path: "/",
    text: "Dashboard",
    icons: [
      React.createElement(DashboardIcon, { isActive: false }),
      React.createElement(DashboardIcon, { isActive: true }),
    ],
    element: React.createElement(View.Dashboard),
    allowRoles: [Role.SuperAdmin],
  },
  {
    path: "/user-management",
    text: "User Management",
    icons: [
      React.createElement(UserManagementIcon, { isActive: false }),
      React.createElement(UserManagementIcon, { isActive: true }),
    ],
    element: React.createElement(View.UserManagement),
    allowRoles: [Role.SuperAdmin],
  },
  {
    path: "/result-management",
    text: "Result Management",
    icons: [
      React.createElement(ResultManagementIcon, { isActive: false }),
      React.createElement(ResultManagementIcon, { isActive: true }),
    ],
    element: React.createElement(View.ResultManagement),
    allowRoles: [Role.SuperAdmin],
  },
  {
    path: "/analytics",
    text: "Analytics",
    icons: [
      React.createElement(AnalyticsIcon, { isActive: false }),
      React.createElement(AnalyticsIcon, { isActive: true }),
    ],
    element: React.createElement(View.UserManagement),
    allowRoles: [Role.SuperAdmin],
  },
  {
    path: "/audit-logs",
    text: "Audit Logs",
    icons: [
      React.createElement(AuditLogsIcon, { isActive: false }),
      React.createElement(AuditLogsIcon, { isActive: true }),
    ],
    element: React.createElement(View.UserManagement),
    allowRoles: [Role.SuperAdmin],
  },
  {
    path: "/settings",
    text: "Settings",
    icons: [
      React.createElement(SettingsIcon, { isActive: false }),
      React.createElement(SettingsIcon, { isActive: true }),
    ],
    element: React.createElement(View.UserManagement),
    allowRoles: [Role.SuperAdmin],
  },
];

export const getActiveRoutesV2 = (
  routes: RouteObjectWithRole[] | undefined,
  roles: Role[]
): RouteObjectWithRole[] => {
  if (!routes) return [];
  var routesObj: RouteObjectWithRole[] = [];
  routes.forEach((routeObj) => {
    if (isIncludedRole(roles, routeObj.allowRoles)) {
      routesObj.push({
        ...routeObj,
        children: getActiveRoutesV2(routeObj.children, roles),
      });
    }
  });

  return routesObj;
};

export const getActiveRouteDetails = (roles: Role[]): RouteDetail[] => {
  var routesObj: RouteDetail[] = [];
  routes.forEach((routeObj) => {
    if (isIncludedRole(roles, routeObj.allowRoles)) {
      routesObj.push({
        path: routeObj.path ? routeObj.path : "",
        ...routeObj,
      });
    }
  });
  return routesObj;
};
