import React, { createContext, useContext, useState, ReactNode } from "react";
import ToastContainer from "../components/ToastContainer";

export type Toast = {
  id: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number; // in ms
  swipeDirection?: "left" | "right" | "top" | "bottom";
};

type ToastContextType = {
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Toast) => {
    setToasts((prev) => [...prev, { ...toast, id: crypto.randomUUID() }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};
