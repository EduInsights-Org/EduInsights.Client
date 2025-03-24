import clsx from "clsx";

interface AppSkeletonProps {
  height?: string;
  width?: string;
}
const AppSkeleton = ({ height, width }: AppSkeletonProps) => {
  return (
    <div
      className={clsx(
        "animate-pulse h-3 w-10 rounded-sm bg-light-borderGray dark:bg-borderGray",
        height,
        width
      )}
    />
  );
};

export default AppSkeleton;
