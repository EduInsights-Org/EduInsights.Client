import { useToast } from "@/context/ToastContext";
import { useEffect, useState } from "react";

const useOnlineStatus = (): void => {
  const { addToast } = useToast();
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    const storedStatus = localStorage.getItem("lastInternetConnectionStatus");
    return storedStatus !== null ? storedStatus === "1" : navigator.onLine;
  });

  useEffect(() => {
    const handleStatusChange = () => {
      const newStatus = navigator.onLine;
      if (newStatus !== isOnline) {
        setIsOnline(newStatus);
        addToast({
          id: `connection-status-${Date.now()}`,
          message: newStatus ? "You are online" : "You are offline",
          type: newStatus ? "success" : "warning",
          duration: 5000,
          swipeDirection: "top",
        });
        localStorage.setItem(
          "lastInternetConnectionStatus",
          newStatus ? "1" : "0"
        );
      }
    };

    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline, addToast]);
};

export default useOnlineStatus;
