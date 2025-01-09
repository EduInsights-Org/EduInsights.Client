import { useLocation } from "react-router-dom";
import { getActiveRouteDetails } from "../../route";
import { Role } from "../../utils/types";
import { useMemo, useState } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import UserDrawer from "../../components/UserDrawer";
import ResultDrawer from "../../components/ResultDrawer";

const roles: Role[] = [Role.SUPER_ADMIN];

const Header = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const drawerComponentList = [
    {
      name: "/user-management",
      component: <UserDrawer open={open} setOpen={setOpen} />,
    },
    {
      name: "/result-management",
      component: <ResultDrawer open={open} setOpen={setOpen} />,
    },
  ];

  const { path, drawer } = useMemo(() => {
    const path = getActiveRouteDetails(roles).find((p) => p.path === pathname);

    const drawer = drawerComponentList.find(
      (d) => d.name == path?.path
    )?.component;

    return { path, drawer };
  }, [open, pathname]);

  return (
    <div className="flex w-full items-center justify-between px-5 h-16 gap-x-2">
      <div className="flex items-center gap-x-3">
        <span className="text-sm font-semibold text-light-font01 dark:text-font01">
          {path?.text}
        </span>
      </div>
      {drawer && (
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-1 text-xs font-medium text-white bg-primaryLight rounded-sm hover:bg-primaryDark"
        >
          {/* <PlusIcon className="h-5 w-5 text-white" /> */}
          Add User
        </button>
      )}
      {drawer}
    </div>
  );
};

export default Header;
