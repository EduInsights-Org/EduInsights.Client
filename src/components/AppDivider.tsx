import clsx from "clsx";

interface AppDividerProps {
  className?: string;
}
const AppDivider = ({ className }: AppDividerProps) => {
  return (
    <div
      className={clsx(
        "h-[1px] bg-light-borderGray dark:bg-borderGray",
        className
      )}
    />
  );
};

export default AppDivider;
