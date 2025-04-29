import { matchPath, useLocation, useMatches } from "react-router-dom";
import { getActiveRouteDetails } from "../../route";
import { Role } from "@utils/enums";
import LinkItem from "../LinkItem";
import { RootState, useAppDispatch, useAppSelector } from "@slices/store";
import { logout, resetAuth } from "@slices/authSlice";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  BellAlertIcon,
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
  ArrowLeftStartOnRectangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/16/solid";
import { usePopUp } from "@context/PopUpContext";
import { useTheme } from "@context/ThemeContext";
import { resetBatchStore, selectBatch } from "@slices/batchSlice";
import { Avatar } from "@radix-ui/themes";
import BatchForm from "@components/BatchForm";
import { getStudentByBatch } from "@/slices/studentSlice";
import {
  ArrowPathIcon,
  BellIcon,
  CheckBadgeIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import AppDivider from "@/components/AppDivider";
const roles: Role[] = [Role.SuperAdmin];

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  let matches = useMatches();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return patterns.indexOf(possibleMatch.pattern.path);
    }
  }
  for (let i = 0; i < matches.length; i += 1) {
    if (patterns.indexOf(matches[i].pathname) !== -1) {
      return patterns.indexOf(matches[i].pathname);
    }
  }

  return null;
}

const SideBar = () => {
  const { showPopUp, hidePopUp } = usePopUp();
  const { isDarkMode, toggleTheme } = useTheme();
  const user = useAppSelector((state: RootState) => state.auth.userInfo);
  const instituteName = useAppSelector(
    (state: RootState) => state.institute.institute?.name
  );
  const batches = useAppSelector((state: RootState) => state.batch.batches);
  const selectedBatchId = useAppSelector(
    (state: RootState) => state.batch.selectedBatchId
  );

  const dispatch = useAppDispatch();
  const currentIndex = useRouteMatch([
    ...getActiveRouteDetails(roles).map((r) => r.path),
  ]);

  const handleLogout = async () => {
    const result = await dispatch(logout());
    if (logout.fulfilled.match(result)) {
      dispatch(resetAuth());
      dispatch(resetBatchStore());
    }
  };

  const handleDelete = () => {
    hidePopUp();
  };

  const handleCancel = () => {
    hidePopUp();
  };

  const showCustomPopup = () => {
    showPopUp({
      message: "Create a New Batch",
      onConfirm: handleDelete,
      onCancel: handleCancel,
      render: (message, onConfirm, onCancel) => (
        <BatchForm
          message={message}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ),
    });
  };

  const handleSelectBatch = (batchId: string) => {
    dispatch(selectBatch(batchId));
    dispatch(getStudentByBatch(batchId));
  };

  return (
    <aside className="flex h-screen min-w-60 px-3 py-3 flex-col overflow-y-hidden dark:bg-subBg bg-light-subBg border-r-[1px] border-light-borderGray  dark:border-borderGray">
      {/* Batch selector */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md px-3 py-2 ring-1 ring-inset ring-light-borderGray dark:ring-borderGray">
            <div className="flex flex-col items-start">
              <span className="text-xs dark:text-font01 text-light-font01 font-semibold">
                {instituteName}
              </span>
              <span className="text-xs text-light-font02 dark:text-font02">
                {batches && batches.length > 0 ? (
                  batches.find((b) => b.id === selectedBatchId)?.name
                ) : (
                  <span className="italic">No selected batch</span>
                )}
              </span>
            </div>
            <ChevronUpDownIcon className="size-4 fill-light-font02 dark:fill-light-font02" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md shadow-2xl bg-light-mainBg dark:bg-mainBg ring-1 ring-light-borderGray dark:ring-borderGray transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-0 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="flex flex-col p-1 gap-y-1 font-light">
            {batches?.map((b) => (
              <MenuItem key={b.id}>
                <button
                  className={`flex w-full px-2 py-2 text-xs dark:text-grayfont text-light-black rounded-md hover:bg-light-hoverBg dark:hover:bg-hoverBg
                    ${
                      selectedBatchId === b.id
                        ? "bg-light-hoverBg dark:bg-hoverBg"
                        : "bg-transparent dark:bg-transparent"
                    }
                    `}
                  onClick={() => handleSelectBatch(b.id)}
                >
                  {b.name}
                </button>
              </MenuItem>
            ))}

            <MenuItem>
              <button
                onClick={showCustomPopup}
                className="flex w-full justify-between px-2 py-2 text-xs dark:text-font01 text-light-font01 rounded-md hover:bg-light-hoverBg dark:hover:bg-hoverBg"
              >
                Create a Batch
                <PlusIcon className="size-4 dark:fill-font01 fill-light-font01" />
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

      <div className="h-[2px] bg-light-borderGray dark:bg-borderGray mt-3 mb-3" />

      {/* link items */}
      <ul>
        {getActiveRouteDetails(roles).map((r, idx) => (
          <div key={idx}>
            {!r.bottomNav && (
              <LinkItem
                key={idx}
                to={r.path}
                icons={r.icons}
                title={r.text}
                isActive={currentIndex === idx}
              />
            )}
          </div>
        ))}
      </ul>
      <div className="flex h-full" />

      <button
        onClick={handleLogout}
        className={
          "flex items-center px-3 py-2 gap-x-2 text-sm text-light-font02 dark:text-font02 font-medium mb-1 hover:bg-light-hoverBg dark:hover:bg-hoverBg rounded-md"
        }
      >
        <ArrowLeftStartOnRectangleIcon className="size-4 fill-light-font02 dark:fill-font02" />
        Log out
      </button>

      <Menu as="div">
        <MenuButton className="flex w-full items-center px-3 py-2 gap-x-2 text-sm text-light-font02 dark:text-font02 font-medium mb-1 hover:bg-light-hoverBg dark:hover:bg-hoverBg rounded-md">
          <BellAlertIcon className="size-3 mr-1 fill-light-font02 dark:fill-font02" />
          Notification
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom"
          className="w-96 h-[620px] ml-6 px-4 py-2 rounded-md shadow-2xl bg-light-mainBg dark:bg-mainBg ring-1 ring-light-borderGray dark:ring-borderGray transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-0 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="flex items-center gap-x-2">
            <span className="text-lg text-light-font01 dark:text-font01 font-bold">
              Notifications
            </span>

            <button className="ml-auto text-xs text-light-font02 dark:text-font02 flex justify-center items-center gap-x-1">
              <CheckBadgeIcon className="size-3" />
              Mark all as read
            </button>
          </div>

          <AppDivider />

          {/* notification list card */}

          <div className="flex flex-col gap-y-3 mt-4">
            <div className="flex items-start gap-x-2 flex-col">
              <span className="text-sm font-semibold dark:text-font01 text-light-font01 leading-none">
                New Student Added
              </span>
              <span className="text-xs text-light-font02 dark:text-font02">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem.
              </span>
              <span className="text-xs text-light-font02 dark:text-font02 mt-1 font-extralight">
                2 days ago
              </span>
            </div>
            <div className="flex items-start gap-x-2 flex-col">
              <span className="text-sm font-semibold dark:text-font01 text-light-font01 leading-none">
                New Student Added
              </span>
              <span className="text-xs text-light-font02 dark:text-font02">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem.
              </span>
              <span className="text-xs text-light-font02 dark:text-font02 mt-1 font-extralight">
                2 days ago
              </span>
            </div>
          </div>
        </MenuItems>
      </Menu>

      <button
        className={
          "flex items-center px-3 py-2 gap-x-2 text-sm text-light-font02 dark:text-font02 font-medium mb-1 hover:bg-light-hoverBg dark:hover:bg-hoverBg rounded-md"
        }
        onClick={toggleTheme}
      >
        {isDarkMode ? (
          <>
            <MoonIcon className="size-4 fill-light-font02 dark:fill-font02" />
            <span>Dark Theme</span>
          </>
        ) : (
          <>
            <SunIcon className="size-4 fill-light-font02 dark:fill-font02" />
            <span>Light Theme</span>
          </>
        )}
      </button>

      <div className="h-[2px] bg-light-borderGray dark:bg-borderGray mb-4" />

      <div className="flex items-center gap-x-2">
        <Avatar
          highContrast
          color="gray"
          fallback={user!.firstName[0] + user!.lastName[0]}
        />
        <div className="flex flex-col mr-auto">
          <span className="text-sm font-medium dark:text-font01 text-light-font01 leading-none">{`${user?.firstName} ${user?.lastName}`}</span>
          <span className="text-xs text-light-font02 dark:text-font02">
            {user?.email}
          </span>
        </div>
        <button>
          <EllipsisVerticalIcon className="size-4 fill-light-font02 dark:fill-font02" />
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
