import clsx from "clsx";
import PreLoader from "@components/PreLoader";

interface AppButtonProps {
  title: string;
  variant: "fill" | "outline";
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

const AppButton = ({
  title,
  variant,
  onClick,
  isLoading = false,
  className,
}: AppButtonProps) => {
  return (
    <button
      className={clsx(
        "p-2 rounded-sm px-3 py-3 w-28 h-8 flex items-center justify-center text-xs font-medium leading-none transition",
        {
          "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black hover:dark:bg-white/90":
            variant === "fill",
          "border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white hover:dark:bg-white hover:dark:text-black":
            variant === "outline",
          "opacity-50 cursor-not-allowed": isLoading,
        },
        className
      )}
      onClick={!isLoading ? onClick : undefined}
      disabled={isLoading}
    >
      {isLoading ? <PreLoader size="small" isFullScreen={false} /> : title}
    </button>
  );
};

export default AppButton;
