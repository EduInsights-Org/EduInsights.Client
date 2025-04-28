import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
} from "react";
import { useAppDispatch } from "@slices/store";
import { refreshAccessToken } from "@slices/authSlice";
import { AxiosPrivateService, AxiosPublicService } from "@utils/apiService";
import PreLoader from "@components/PreLoader";

interface AuthType {
  user: string | null;
  accessToken: string | null;
}

export interface AuthContextType {
  auth: AuthType | null;
  setAuth: React.Dispatch<SetStateAction<AuthType | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AppAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthType | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const load = async () => {
    try {
      new AxiosPublicService();

      const refreshResponse = await dispatch(refreshAccessToken());
      const { accessToken, userId } = refreshResponse?.payload?.data;

      if (!accessToken) {
        console.error("Access token is missing");
        return;
      }

      setAuth((prev: any) => ({
        ...prev,
        accessToken,
        user: userId,
      }));
      new AxiosPrivateService(accessToken);
    } catch (error) {
      console.error(
        "An error occurred during the authentication process",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [dispatch]);

  if (isLoading) return <PreLoader />;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
