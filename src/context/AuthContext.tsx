import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
} from "react";
import { useAppDispatch } from "@slices/store";
import { getUserInfo, refreshAccessToken } from "@slices/authSlice";
import { AxiosPrivateService, AxiosPublicService } from "@utils/apiService";
import PreLoader from "@components/PreLoader";
import { getInstituteById } from "@slices/instituteSlice";
import {
  Batch,
  getBatchesByInstituteId,
  selectBatch,
} from "@slices/batchSlice";
import { getSubjects } from "@/slices/subjectSlice";
import { getSemesters } from "@/slices/semesterSlice";

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
      }));
      new AxiosPrivateService(accessToken);

      const userInfoResponse = await dispatch(getUserInfo(userId));
      const instituteId = userInfoResponse?.payload?.data.instituteId;

      if (!instituteId) {
        console.error("Institute ID is missing in user info");
        return;
      }

      await dispatch(getInstituteById(instituteId));

      const batchesResponse = await dispatch(
        getBatchesByInstituteId(instituteId)
      );
      const batches = batchesResponse?.payload?.data as Batch[];

      if (batches?.length > 0) {
        dispatch(selectBatch(batches[0].id));
      } else {
        console.warn("No batches found for the institute");
      }

      dispatch(getSubjects({}));
      dispatch(getSemesters({ instituteId }));
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
