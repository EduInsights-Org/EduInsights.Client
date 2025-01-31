import React, { createContext, useContext, useState, ReactNode } from "react";
import DefaultPopUp from "@components/DefaultPopUp";

interface PopUpOptions {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  render?: (
    message: string,
    onConfirm: () => void,
    onCancel: () => void
  ) => ReactNode;
}

interface PopUpContextProps {
  showPopUp: (options: PopUpOptions) => void;
  hidePopUp: () => void;
}

const PopUpContext = createContext<PopUpContextProps | undefined>(undefined);

export const usePopUp = () => {
  const context = useContext(PopUpContext);
  if (!context) {
    throw new Error("usePopUp must be used within a PopUpProvider");
  }
  return context;
};

export const PopUpProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState<PopUpOptions | null>(null);

  const showPopUp = (options: PopUpOptions) => {
    setOptions(options);
    setIsVisible(true);
  };

  const hidePopUp = () => {
    setIsVisible(false);
    setOptions(null);
  };

  return (
    <PopUpContext.Provider value={{ showPopUp, hidePopUp }}>
      {children}
      {isVisible && options && (
        <>
          {options.render ? (
            options.render(options.message, options.onConfirm, options.onCancel)
          ) : (
            <DefaultPopUp
              message={options.message}
              onConfirm={options.onConfirm}
              onCancel={options.onCancel}
            />
          )}
        </>
      )}
    </PopUpContext.Provider>
  );
};
