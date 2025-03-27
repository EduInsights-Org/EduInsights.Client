import clsx from "clsx";

interface AppDividerProps {
  className?: string;
  label?: string;
  onClick?: () => void;
}

const AppDivider = ({ className, label, onClick }: AppDividerProps) => {
  const dividerClass = clsx(
    "h-[1px] bg-light-borderGray dark:bg-borderGray",
    onClick &&
      "border border-light-borderGray dark:border-borderGray rounded-full",
    onClick &&
      "hover:bg-light-hoverGray dark:hover:bg-hoverGray transition-colors",
    onClick && "cursor-pointer"
  );

  if (label) {
    return (
      <div className={clsx("flex items-center", className)}>
        <div className="flex-1 h-[1px] bg-light-borderGray dark:bg-borderGray" />
        <span
          className={clsx(
            "px-3 text-xs",
            onClick
              ? "text-light-font02 dark:text-font02 py-1 px-4 rounded-full border border-light-borderGray dark:border-borderGray cursor-pointer"
              : "text-light-font02 dark:text-font02"
          )}
          onClick={onClick}
        >
          {label}
        </span>
        <div className="flex-1 h-[1px] bg-light-borderGray dark:bg-borderGray" />
      </div>
    );
  }

  return <div className={clsx(dividerClass, className, "w-full")} />;
};

export default AppDivider;
