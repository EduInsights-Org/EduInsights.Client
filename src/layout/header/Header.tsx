import useDrawerDetails from "@/hooks/useDrawerDetails";

const Header = () => {
  const { path, component, drawerTitle, handleOpenDrawer } = useDrawerDetails();

  return (
    <div className="flex w-full items-center justify-between px-5 h-16 gap-x-2">
      <div className="flex items-center gap-x-3">
        <span className="text-sm font-semibold text-light-font01 dark:text-font01">
          {path}
        </span>
      </div>
      {component && (
        <button
          onClick={() => handleOpenDrawer()}
          className="p-2 bg-black dark:bg-white hover:dark:bg-white/90 rounded-sm px-3 py-3 w-24 h-8 flex items-center justify-center hover:bg-black/90 text-xs font-medium leading-none text-white dark:text-black"
        >
          {drawerTitle}
        </button>
      )}
      {component}
    </div>
  );
};

export default Header;
