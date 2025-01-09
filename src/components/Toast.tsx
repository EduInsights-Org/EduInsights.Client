import React, { useEffect, useState } from "react";
import { Toast as ToastType, useToast } from "../context/ToastContext";
import clsx from "clsx";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

type ToastProps = ToastType;

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = "info",
  duration = 3000,
  swipeDirection = "right",
}) => {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => setIsVisible(true), 10); // Delay for animation to work

    const timer = setTimeout(() => {
      setIsVisible(false); // Trigger close animation
      setTimeout(() => removeToast(id), 500); // Remove from DOM after animation
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(visibilityTimeout);
    };
  }, [id, duration, removeToast]);

  const handleClose = () => {
    setIsVisible(false); // Trigger close animation
    setTimeout(() => removeToast(id), 300); // Remove from DOM after animation
  };

  return (
    <div
      className={clsx(
        "fixed px-4 py-3 rounded shadow-md text-white transition-all duration-250 transform z-[2000]",
        {
          "bg-[#e9f6eb] dark:bg-[#192d23]": type === "success",
          "bg-red-500": type === "error",
          "bg-blue-500": type === "info",
          "bg-[#fdf0d9] dark:bg-[#301f13]": type === "warning",

          // Animation states
          "opacity-0 transform translate-x-1/2":
            !isVisible && swipeDirection === "right",
          "opacity-0 transform -translate-x-1/2":
            !isVisible && swipeDirection === "left",
          "opacity-0 transform -translate-y-1/2":
            !isVisible && swipeDirection === "top",
          "opacity-0 transform translate-y-1/2":
            !isVisible && swipeDirection === "bottom",
          "opacity-100 scale-100 translate-0": isVisible, // Visible state

          // Positioning
          "top-4 left-1/2 transform -translate-x-1/2": swipeDirection === "top",
          "bottom-4 left-1/2 transform -translate-x-1/2":
            swipeDirection === "bottom",
          "-top-4 left-2 transform translate-y-1/2": swipeDirection === "left",
          "top-10 right-2 transform -translate-y-1/2":
            swipeDirection === "right",
        }
      )}
    >
      <div
        className={clsx("flex min-w-60 items-center gap-x-2", {
          "text-[#45855f] dark:text-[#8af0af]": type === "success",
          //   "text-[#45855f] dark:text-[#8af0af]": type === "error",
          "text-[#bd5622] dark:text-[#f8b57e]": type === "warning",
        })}
      >
        {type === "warning" && <ExclamationCircleIcon className="h-5" />}
        {type === "success" && <CheckCircleIcon className="h-5" />}

        <span className="text-xs leading-none mr-3">{message}</span>

        <XMarkIcon
          onClick={handleClose}
          className="h-4 ml-auto hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Toast;
