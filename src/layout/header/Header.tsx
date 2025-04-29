import AppButton from "@/components/AppButton";
import useDrawerDetails from "@/hooks/useDrawerDetails";

const Header = () => {
  const { path, component, drawerTitle, handleOpenDrawer } = useDrawerDetails();

  return (
    <div className="flex w-full items-center justify-between px-3 h-14 gap-x-2">
      <div className="flex items-center gap-x-3">
        <span className="text-sm font-semibold text-light-font01 dark:text-font01">
          {path}
        </span>
      </div>
      {component && (
        <AppButton
          title={drawerTitle}
          variant="fill"
          onClick={() => handleOpenDrawer()}
        />
      )}
      {component}
    </div>
  );
};

export default Header;
