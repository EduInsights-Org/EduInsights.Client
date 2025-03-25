import clsx from "clsx";
import PreLoader from "@components/PreLoader";

interface AppButtonProps {
  title: string;
  variant: "fill" | "outline";
  color?: "primary" | "error" | "transparent";
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

const AppButton = ({
  title,
  variant,
  color = "primary",
  onClick,
  isLoading = false,
  className,
}: AppButtonProps) => {
  return (
    <button
      className={clsx(
        "p-3 rounded-sm min-w-24 h-8 flex items-center justify-center text-xs font-medium leading-none transition",
        {
          "border-[0.5px] border-light-borderGray dark:border-borderGray text-black bg-transparent dark:text-white":
            variant === "outline",

          "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black hover:dark:bg-white/90":
            color === "primary" && variant === "fill",

          "bg-red-600 text-white hover:bg-red-600/90":
            color === "error" && variant === "fill",

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
