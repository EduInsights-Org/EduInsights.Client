// AppInitializer.tsx
import { useEffect, useState, ReactNode } from "react";
import { useAppDispatch } from "@slices/store";
import { getUserInfo } from "@slices/authSlice";
import PreLoader from "@components/PreLoader";
import { getInstituteById } from "@/slices/instituteSlice";
import {
  Batch,
  getBatchesByInstituteId,
  selectBatch,
} from "@/slices/batchSlice";
import { getStudentByBatch } from "@/slices/studentSlice";
import { getSubjects } from "@/slices/subjectSlice";
import { getSemesters } from "@/slices/semesterSlice";
import { getRoleDistribution } from "@/slices/userSlice";
import useAuth from "@/hooks/useAuth";

export const AppInitializer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { auth } = useAuth();

  useEffect(() => {
    const loadAppData = async () => {
      if (!auth?.user) return;

      try {
        const userInfoResponse = await dispatch(getUserInfo(auth.user));
        const instituteId = userInfoResponse?.payload?.data.instituteId;

        if (!instituteId) return console.error("Institute ID is missing");

        await dispatch(getInstituteById(instituteId));

        const batchesResponse = await dispatch(
          getBatchesByInstituteId(instituteId)
        );
        const batches = batchesResponse?.payload?.data as Batch[];

        if (batches?.length > 0) {
          dispatch(selectBatch(batches[0].id));
          dispatch(getStudentByBatch(batches[0].id));
        }

        dispatch(getSubjects({ instituteId }));
        dispatch(getSemesters({ instituteId }));
        dispatch(getRoleDistribution({ instituteId }));
      } catch (err) {
        console.error("App data loading failed", err);
      } finally {
        setIsAppLoading(false);
      }
    };

    loadAppData();
  }, [auth?.user, dispatch]);

  if (isAppLoading) return <PreLoader />;

  return <>{children}</>;
};
