import { useToast } from "@context/ToastContext";
import Toast from "@components/Toast";

const ToastContainer = () => {
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
