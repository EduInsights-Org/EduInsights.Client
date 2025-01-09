import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  useDebugValue(context?.auth, (auth) =>
    auth?.user ? "Logged In" : "Logged Out"
  );

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default useAuth;
