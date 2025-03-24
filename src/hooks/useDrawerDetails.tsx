import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { Role } from "@utils/enums";
import UserDrawer from "@/views/userManagement/components/UserDrawer";
import ResultDrawer from "@/views/resultManagement/components/ResultDrawer";
import { getActiveRouteDetails } from "@/route";

const roles: Role[] = [Role.SuperAdmin];

interface RouteDetail {
  path: string;
  component: JSX.Element;
  drawerTitle: string;
  handleOpenDrawer: () => void;
}

const useDrawerDetails = (): RouteDetail => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const drawerComponentList = [
    {
      name: "/user-management",
      drawerTitle: "Add User",
      component: <UserDrawer open={open} setOpen={setOpen} />,
    },
    {
      name: "/result-management",
      drawerTitle: "Add Result",
      component: <ResultDrawer open={open} setOpen={setOpen} />,
    },
  ];

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const { path, component, drawerTitle } = useMemo(() => {
    const path = getActiveRouteDetails(roles).find((p) => p.path === pathname);

    const drawer = drawerComponentList.find((d) => d.name == path?.path);

    return {
      path: path.text,
      component: drawer?.component,
      drawerTitle: drawer?.drawerTitle,
    };
  }, [pathname, open]);

  return { path, component, drawerTitle, handleOpenDrawer };
};

export default useDrawerDetails;
