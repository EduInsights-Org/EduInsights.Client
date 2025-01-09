// ToastContainer.tsx
import React from "react";
import { useToast } from "../context/ToastContext";
import Toast from "./Toast";

const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </>
  );
};

export default ToastContainer;
